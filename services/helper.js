const IBM_Auth =(axios,https) => 
{
    return new Promise((resolve,reject)=>
    {
            // axios.defaults.httpAgent = new https.Agent({
            //     rejectUnauthorized: false
            // })
            //axios.defaults.withCredentials = true;
            // axios({
            //     method: 'POST',
            //     url: 'https://api.eclinicalos.com/edc_studyservices.jsp?action=login=cloudbyzdev&password=Cloudbyz%402022&studyid=28797',
            //     //responseType: 'stream'
            //   })
            axios.post('https://api.eclinicalos.com/edc_studyservices.jsp?action=login=cloudbyzdev&password=Cloudbyz%402022&studyid=28797')
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

const IBM_getSubjectVisit_CT =(axios,https,cook,request,fs) => 
{
    
    return new Promise((resolve,reject)=>
    {
        //Set the cookie instead of setting into header
            console.log('cook::',cook);
            var config = {
            method: 'GET',
            url: 'https://api.eclinicalos.com/edc_studyservices.jsp?action=infoattempt&type=data_datatable&param1=CT',
            headers: 
                { 
                'Cookie': 'ICDINGRESS=24f79f0ecccd5b130b449178ef75a45a4ff01702; JSESSIONID=E09D714BB95AA166F44BAF087A0F0CD1;'
                }
            };
            axios(config)
            .then(function (response) {
            //console.log(JSON.stringify(response.data));
            resolve(response);
            })
            .catch(function (error) {
            console.log(error);
            reject(error);
            });
            /*var cookie = request.cookie('ICDINGRESS=0d889781ac41ff266051396e9b6f31cd7bd7e05b; Path=/; Secure; HttpOnly','JSESSIONID=9CCD4BBCA6EC74DD92C353F20B149DB2; Path=/; Secure; HttpOnly');

            // Set the headers for the request
            var headers = {
                //'Content-Type': 'application/json',
                //'Content-Length': Buffer.byteLength(post_data),
                'Cookie': cookie
            };
            // Configure the request
            var options = {
                url: 'https://api.eclinicalos.com/edc_studyservices.jsp?action=infoattempt&type=data_datatable&param1=CT',
                method: 'GET',
                headers: headers
            };

            // Start the request
            request(options, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    // Print out the response body
                    console.log('SUCCESS');
                    resolve(response)
                } else {
                    console.log('error::',error);
                    reject(error)
                }
            });*/

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
             /*axios.get('https://api.eclinicalos.com/edc_studyservices.jsp?action=infoattempt&type=data_datatable&param1=CT' )
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
            })*/
    })
};

module.exports = {IBM_Auth,IBM_getSubjectVisit_CT};