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

const processPDData = async (req, res, next) => {
    try
    {

        axios.defaults.withCredentials = true;
        const instance = axios.create({
            withCredentials: true
        })

        let cook = 'JSESSIONID=B59BCD4ED0C04AE4BD11FC297FFC5B53; ICDINGRESS=afa939a835e7a7fd4f8521937e91b9c11414d221; ';
        console.log('cookie : ' ,cook);
        console.log('study-Id : ' ,req.query.studyId);

        let sfdc = await helper.sfdcConnFn(jsforce);
        if(sfdc.status =='200'){
            console.log('SFDC Connection success.');
        }

        let Final_IBM_PD_Table_Data = {};

        let code_list = await helper.SFDC_IBM_Codelist(sfdc);
        let sfdc_IBM_Codelist ={};
        if(code_list['status'] == 'success'){
            sfdc_IBM_Codelist = code_list['result'];
            
        }else{
            throw 'PD Data for SFDC Failed.';
        }

        // ---------------------------------- PD Table ----------------------------------
        let IBM_PD_Table_Data = await helper.IBM_getSubjectVisit_CT(instance,https,cook,request,'data_datatable&param1=PD');
        let IBM_PD_JSON_Table_Data = JSON.parse(xmlParser.toJson(IBM_PD_Table_Data.data))['reply']['data']['datarow'];
        
        //console.log('PD_Table_Data : ',IBM_PD_JSON_Table_Data.length);
        
        let PD_Obj = await helper.IBM_Parse_PD_Data(IBM_PD_JSON_Table_Data,sfdc_IBM_Codelist);
        let PD_Final_Data ={};

        if(PD_Obj['status'] == 'success'){
            PD_Final_Data = PD_Obj['result'];
            
        }else{
            throw 'PD data parsing failed.';
        }
        
        //console.log('PD_Final_Data : ',PD_Final_Data);
        //console.log('PD_Final_Data : ',Object.keys(PD_Final_Data).length);
        
        let PD_Setup_Data = await helper.PD_Setup_Data(PD_Final_Data);
        let PD_Final_Arry =[];

        if(PD_Setup_Data['status'] == 'success'){
            PD_Final_Arry = PD_Setup_Data['result'];
            
        }else{
            throw 'PD Data for SFDC Failed.';
        }

        //console.log('PD_Final_Arry length : ',PD_Final_Arry.length);
        let PD_Setup_Data1 = await helper.get_Subject_Details_PD(sfdc,PD_Final_Arry);
        let PD_Final_Arry1 =[];

        if(PD_Setup_Data1['status'] == 'success'){
            PD_Final_Arry1 = PD_Setup_Data1['result'];
            
        }else{
            throw 'PD Data for SFDC Failed.';
        }

        console.log('PD_Final_Arry1 : ',PD_Final_Arry1.length);
        insert_PD_InBatches(sfdc, PD_Final_Arry1);

        console.log('Everything PD is done..');

        res.json({message: "IBM Fecthing PD Data is success!!"});
    }
    catch(error){

        console.log('ERROR OCCURED',error);
        res.json({message: "Error occured!!", error :error});

    }
}

function insert_PD_InBatches(sfdc, data, itemsPerBatch = 100) {
    let chunkedData = [] 
    for(let i =0; i < data.length; i = i + itemsPerBatch) {
        chunkedData.push(data.slice(i, i + itemsPerBatch))
    }

    let all_Promises=[];
    console.log('chunkedData : ' , chunkedData.length);
    for(let j=0;j< chunkedData.length;j++){

        let promis = helper.SFDC_PD_Upsert(sfdc,chunkedData[j]);
        all_Promises.push(promis);
    }
    recrusion_PD(all_Promises);
}

function recrusion_PD(all_Promises){

    let retry_Promise=[];

    Promise.allSettled(all_Promises).then((results) => 

        results.forEach((result) => {
            
            if(result['status'] == 'rejected'){
                console.log('result : ', result);
                retry_Promise = retry_Promise.concat(result['reason']['chunk']);
            }
        })
    );

    if(retry_Promise.length>0){
        recrusion_PD(retry_Promise);
    }else{   
    }
}

module.exports = {processPDData};