var request =require('request');
var axios = require('axios');
var https  = require('https');
const { Http2ServerRequest } = require('http2');
var jsforce = require('jsforce');
const helper = require('../services/helper');
let xmlParser = require('xml2json');
let fs = require('fs');

const processData = async (req, res, next) => {
    try
    {
        axios.defaults.withCredentials = true;
        const instance = axios.create({
            withCredentials: true
          })

        //cookie request
        let cookie = await helper.IBM_Auth(instance,https);
        console.log('COOKIE::',cookie);
        console.log('COOKIE VAL::::::',cookie.status);
        console.log('COOKIE VAL::::::',cookie.result);

        //getSubject visits
        let svData = await helper.IBM_getSubjectVisit_CT(instance,https,cookie.result,request);
        //console.log('svData::',svData);
        let jsonData= xmlParser.toJson(svData.data);
        console.log('JSON output', jsonData);

        //fs.writeFile('myjsonfile.json', jsonData, 'utf8', callback);
        fs.writeFile('data.json', jsonData, function(err) {
            if(err) {
                console.log('error::',err);
            }
            else{
                console.log('done');
            }
          });

        res.json({message: "SFDC Connection success!!"});
    }
    catch (error) 
    {
        console.log('ERROR OCCURED');
        res.json({message: "Error occured!!", error :error});
    }
    
};


module.exports = {processData};