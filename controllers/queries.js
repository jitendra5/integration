var request =require('request');
var axios = require('axios');
var https  = require('https');
const { Http2ServerRequest } = require('http2');
var jsforce = require('jsforce');
const helper = require('../services/helper');
let xmlParser = require('xml2json');
var fs = require('fs');
const { Console } = require('console');
var moment = require('moment');
const csv = require("csvtojson");

const processQueriesData = async (req, res, next) => {
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

        let code_list = await helper.SFDC_IBM_Codelist_Query(sfdc,'Queries');
        let sfdc_IBM_Codelist ={};
        if(code_list['status'] == 'success'){
            sfdc_IBM_Codelist = code_list['result'];
            
        }else{
            throw 'Query Data for SFDC Failed.';
        }
        
        // ---------------------------------- PD Table ----------------------------------

        let IBM_Querylist_Table_Data = await helper.IBM_getSubjectVisit_CT(instance,https,cook,request,'data_querylist');
        let Querylist_Table_Data = JSON.parse(xmlParser.toJson(IBM_Querylist_Table_Data.data))['reply']['queries']['query'];
        
        //console.log('Query_Table_Data : ',Querylist_Table_Data);
        
        let Query_List_Obj = await helper.IBM_Parse_Query_Data(Querylist_Table_Data,sfdc_IBM_Codelist);
        let Query_List_Final_Data ={};

        if(Query_List_Obj['status'] == 'success'){
            Query_List_Final_Data = Query_List_Obj['result'];
            
        }else{
            throw 'Query data parsing failed.';
        }
        
        //console.log('Query_List_Final_Data : ',Query_List_Final_Data);
        //console.log('Query_List_Final_Data : ',Object.keys(Query_List_Final_Data).length);
        
        let Query_Setup_Data = await helper.Query_Setup_Data(Query_List_Final_Data);
        let Query_Setup_Arry =[];

        if(Query_Setup_Data['status'] == 'success'){
            Query_Setup_Arry = Query_Setup_Data['result'];
            
        }else{
            throw 'Query Data for SFDC Failed.';
        }

        //console.log('Query_Setup_Arry length : ',Query_Setup_Arry.length);

        let Query_Setup_Data1 = await helper.get_Subject_Details_Query(sfdc,Query_Setup_Arry);
        let Query_Final_Arry =[];

        if(Query_Setup_Data1['status'] == 'success'){
            Query_Final_Arry = Query_Setup_Data1['result'];
            
        }else{
            throw 'Query Data for SFDC Failed.';
        }

        console.log('Query_Final_Arry : ',Query_Final_Arry.length);
        insert_Query_InBatches(sfdc, Query_Final_Arry);

        res.json({message: "IBM Fecthing Query Data is success!!"});
    }
    catch(error){

        console.log('ERROR OCCURED',error);
        res.json({message: "Error occured!!", error :error});

    }
}

function insert_Query_InBatches(sfdc, data, itemsPerBatch = 100) {
    let chunkedData = [] 
    for(let i =0; i < data.length; i = i + itemsPerBatch) {
        chunkedData.push(data.slice(i, i + itemsPerBatch))
    }

    let all_Promises=[];
    console.log('chunkedData length: ' , chunkedData.length);
    for(let j=0;j< chunkedData.length;j++){

        let promis = helper.SFDC_Query_Upsert(sfdc,chunkedData[j],'CTMS__Queries__c');
        all_Promises.push(promis);
    }
    recrusion_Query(all_Promises);

    console.log('Everything Query is done..');

}

function recrusion_Query(all_Promises){

    let retry_Promise=[];
    
    console.log('all_Promises : ' , all_Promises.length);
    try{

        Promise.allSettled(all_Promises).then((results) => 

            results.forEach((result) => {

                console.log('Res : ' , result['status']);
            
                if(result['status'] == 'rejected'){

                    let failed_Res = result;
                    //console.log('failed_Res : ', failed_Res);
                    //console.log('failed_Res Reason : ', failed_Res['reason']);
                    //console.log('failed_Res chunk : ', failed_Res['reason']['chunk']);

                    //insert_Query_InBatches(sfdc,result['reason']['chunk']);
                    //retry_Promise.push(promis);
                
                }
            })
        );

    //console.log('retry_Promise : ' , retry_Promise.length);

        if(retry_Promise.length>0){
            console.log('Retry : ' , retry_Promise.length);
            recrusion_Query(retry_Promise);
        }


    }catch (error){

        console.log('error : ' , error);

    }
    
}

module.exports = {processQueriesData};