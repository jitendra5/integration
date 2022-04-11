const IBM_Auth =(axios,https) => 
{
    return new Promise((resolve,reject)=>
    {
            axios.defaults.httpAgent = new https.Agent({
                rejectUnauthorized: false,
                withCredentials: true
            })
            //axios.defaults.withCredentials = true;
            axios({
                method: 'POST',
                url: 'https://api.eclinicalos.com/edc_studyservices.jsp?action=login=cloudbyzdev&password=Cloudbyz%402022&studyid=28797',
                //responseType: 'stream'
              })
            .then(function (response) {
                //console.log('respo::',response);
                //console.log('respo::cookie',response.headers['set-cookie']);
                let obj={};
                obj['status']='success';
                obj['result']= response.headers['set-cookie'];
                resolve(obj);
                //response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            })
            .catch(err=>{
                console.log('eror::',err);
                let obj={};
                    obj['status']='error';
                    obj['result']= err;
                    reject(obj);
            })
    })
};
const IBM_getSubjectVisit_CT =(axios,https,cookie) => 
{
    return new Promise((resolve,reject)=>
    {
        console.log('COOKIE VAL::::::',cookie);
            //axios.defaults.httpAgent = new https.Agent({rejectUnauthorized: false,})
            //axios.defaults.withCredentials = true;
            /*axios({
                method: 'GET',
                url: 'https://api.eclinicalos.com/edc_studyservices.jsp?action=infoattempt&type=data_datatable&param1=CT',
                //responseType: 'stream'
                withCredentials : true
              })*/
              /*const instance = axios.create({
                withCredentials: true,
                baseURL: 'https://api.eclinicalos.com/edc_studyservices.jsp?action=infoattempt&type=data_datatable&param1=CT'
             })
             instance.get()*/
             axios.get('https://api.eclinicalos.com/edc_studyservices.jsp?action=infoattempt&type=data_datatable&param1=CT' )
            .then(function (response) {
                console.log('respo::',response);
                //console.log('respo::cookie',response.headers['set-cookie']);
                let obj={};
                obj['status']='success';
                obj['result']= response;
                resolve(obj);
                //response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            })
            .catch(err=>{
                console.log('eror::',err);
                let obj={};
                    obj['status']='error';
                    obj['result']= err;
                    reject(obj);
            })
    })
};

module.exports = {IBM_Auth,IBM_getSubjectVisit_CT};