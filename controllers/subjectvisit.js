var request =require('request');
var axios = require('axios');
var https  = require('https');
const { Http2ServerRequest } = require('http2');
var jsforce = require('jsforce');
const helper = require('../services/helper');


const processData = async (req, res, next) => {
    try
    {
        //cookie request
        let cookie = await helper.IBM_Auth(axios,https);
        console.log('COOKIE::',cookie);

        //getSubject visits
        let svData = await helper.IBM_getSubjectVisit_CT(axios,https,cookie);
        console.log('svData::',svData);

        res.json({message: "SFDC Connection success!!"});
    }
    catch (error) 
    {
        console.log('ERROR OCCURED');
        res.json({message: "Error occured!!", error :error});
    }
    
};


module.exports = {processData};