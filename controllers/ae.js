var request =require('request');
var axios = require('axios');
var https  = require('https');
const { Http2ServerRequest } = require('http2');
var jsforce = require('jsforce');
const helper = require('../services/helper');
let xmlParser = require('xml2json');
let fs = require('fs');
const { Console } = require('console');
var moment = require('moment');

const processAEData = async (req, res, next) => {
    try
    {
        axios.defaults.withCredentials = true;
        const instance = axios.create({
            withCredentials: true
        })

        //cookie request
        let cookie = await helper.IBM_Auth(instance,https);
        let FinalAEData = {};
        
        let cook = req.query.cookie;
        console.log('cool : ' ,cook);
        console.log('studyId : ' ,req.query.studyId);

        cook ='JSESSIONID=6123D6ED7B7F62A2F93B24723382647B; ICDINGRESS=5a1bded058fe50ceec2f358a23d813407acf922a;'
        let sfdc = await helper.sfdcConnFn(jsforce);
        if(sfdc.status =='200'){
            console.log('SFDC Connection success.');
        }
    
        let studyExternalId ='28797';
        let studyObj = await helper.IBM_studyId(sfdc,studyExternalId);
        let studyId;
        if(studyObj['status'] == 'success'){
            studyId = studyObj['result'];
            
        }else{
            throw 'Study Id is null.';
        }
        
        console.log('studyId : ', studyId);
        
        //get Adverse Events
        // ---------------------------------- AE Table ----------------------------------

        let SFDC_Codelist_Obj = await helper.SFDC_IBM_Codelist_AE(sfdc);
        let SFDC_Codelist_Data ={};
        if(SFDC_Codelist_Obj['status'] == 'success'){
            SFDC_Codelist_Data = SFDC_Codelist_Obj['result'];
            
        }else{
            throw 'Code list data parsing failed.';
        }
        //console.log('SFDC_Codelist_Data : ',Object.keys(SFDC_Codelist_Data).length);

        let IBM_AE_Request_Data = await helper.IBM_getSubjectVisit_CT(instance,https,cook,request,'data_datatable&param1=AE');
        let IBM_AE_Data = JSON.parse(xmlParser.toJson(IBM_AE_Request_Data.data))['reply']['data']['datarow'];
        //console.log('IBM_AE_Data : ' , IBM_AE_Data.length);

        let IBM_Reint_Request_Data = await helper.IBM_getSubjectVisit_CT(instance,https,cook,request,'data_datatable&param1=REINT');
        let IBM_REINT_Data = JSON.parse(xmlParser.toJson(IBM_Reint_Request_Data.data))['reply']['data']['datarow'];
        //console.log('IBM_REINT_Data : ' , IBM_REINT_Data.length);

        let IBM_CEC_Request_Data = await helper.IBM_getSubjectVisit_CT(instance,https,cook,request,'data_datatable&param1=CEC');
        let IBM_CEC_Data = JSON.parse(xmlParser.toJson(IBM_CEC_Request_Data.data))['reply']['data']['datarow'];
        //console.log('IBM_CEC_Data : ' , IBM_CEC_Data.length);

        //console.log('IBM_AE_Data : ' , IBM_AE_Data);
        //console.log('template Data : ' , templateData);

        console.log('SFDC_Codelist_Data : ',Object.keys(SFDC_Codelist_Data).length);

        let AE_Obj = await helper.IBM_Parse_AE_Data(IBM_AE_Data,IBM_CEC_Data,SFDC_Codelist_Data);
        let AE_Table_Data_arry =[];
        if(AE_Obj['status'] == 'success'){
            AE_Table_Data_arry = AE_Obj['result'];
            
        }else{
            throw 'AE table IBM data parsing failed.';
        }
        
        console.log('AE_Table_Data_arry : ' , AE_Table_Data_arry.length); // 528865_130_6

        let AE_Data_Mapping_Obj = await helper.get_Subject_Details_AE(sfdc,AE_Table_Data_arry);
        let AE_Data_Mapping_Arry =[];
        if(AE_Data_Mapping_Obj['status'] == 'success'){
            AE_Data_Mapping_Arry = AE_Data_Mapping_Obj['result'];
            
        }else{
            throw 'AE table IBM data Mapping parsing failed.';
        }

        let AE_Promise = await insert_AE_InBatches(sfdc, AE_Data_Mapping_Arry);
        let promises = await helper.AE_Promises(AE_Promise);
        
        //--------------------- Secondary Inventions Records for AE Start --------------------------------------------------------
        
        let get_AE_Details = await helper.get_AE_Details(sfdc,AE_Table_Data_arry);
        let AE_Details_data ={};
        //console.log('get_AE_Details : ' , get_AE_Details);
        if(get_AE_Details['status'] == 'success'){
            AE_Details_data = get_AE_Details['result'];
            
        }else{
            throw 'Get AE Details Data parsing failed.';
        }

        console.log('AE_Details_data 111: ' , Object.keys(AE_Details_data).length);

        //console.log('AE_Details_data : ' , AE_Details_data['611751_130_0']);
        //console.log('AE_Details_data : ' , AE_Details_data['611751_130_1']);
        //console.log('AE_Details_data : ' , AE_Details_data['611751_130_4']);
        

        let SI_Data_Mapping_Obj = await helper.IBM_Parse_SI_Data(IBM_REINT_Data,AE_Details_data,SFDC_Codelist_Data);
        let SI_Data_Mapping_Arry =[];

        if(SI_Data_Mapping_Obj['status'] == 'success'){
            SI_Data_Mapping_Arry = SI_Data_Mapping_Obj['result'];
            
        }else{
            throw 'AE table IBM data Mapping parsing failed.';
        }
        //console.log('SI_Data_Mapping_Arry : ',SI_Data_Mapping_Arry);
        let SI_Promise = await insert_SI_InBatches(sfdc, SI_Data_Mapping_Arry);
        console.log('SI_Promise : ' , SI_Promise.length);

        let SI_Promise_Result = await helper.SI_Promises(SI_Promise);

        console.log('SI_Promise_Result : ' , SI_Promise_Result);
        console.log('Everything AE 1 is done..');

        //--------------------- Secondary Inventions Records for AE END  --------------------------------------------------------

        

    res.json({message: "IBM AE Items Data Fetch Success."}); 
    }catch(error){

    }
};


async function insert_AE_InBatches(sfdc, data, itemsPerBatch = 100) {

    return new Promise((resolve,reject)=>
    {
        try{

            let chunkedData = [] 
            for(let i =0; i < data.length; i = i + itemsPerBatch) {
                chunkedData.push(data.slice(i, i + itemsPerBatch))
            }
        
            let all_Promises=[];
            //console.log('chunkedData Data: ' , chunkedData);
            for(let j=0;j< chunkedData.length;j++){
                
                let promis = helper.AE_Data_Upsert(sfdc,chunkedData[j],'CTMS__Adverse_Event__c');
                all_Promises.push(promis);
            }
            //recrusion_AE(all_Promises);
        
            resolve(all_Promises);
            

        }catch(error){

            reject(error);

        }
    });
    

}

async function insert_SI_InBatches(sfdc, data, itemsPerBatch = 100) {

    return new Promise((resolve,reject)=>
    {
        try{

            let chunkedData = [] 
            for(let i =0; i < data.length; i = i + itemsPerBatch) {
                chunkedData.push(data.slice(i, i + itemsPerBatch))
            }
        
            let SI_All_Promises=[];
            
            for(let j=0;j< chunkedData.length;j++){
                
                //console.log('chunked Data [J] : ' , chunkedData[j]);
                let promis = helper.SI_Data_Upsert(sfdc,chunkedData[j],'Secondary_Intervention__c');
                SI_All_Promises.push(promis);
            }
        
            resolve(SI_All_Promises);
            

        }catch(error){

            reject(error);

        }
    });
    

}


/*
function recrusion_AE(all_Promises){

    let retry_Promise=[];
    
    console.log('all_Promises : ' , all_Promises.length);
    try{

        Promise.allSettled(all_Promises).then((results) => 

            results.forEach((result) => {

                console.log('Res : ' , result['status']);
            
                if(result['status'] == 'rejected'){

                    let failed_Res = result;
                    
                
                }
            })
        );

    }catch (error){

        console.log('error : ' , error);

    }
    
}
*/

module.exports = {processAEData};