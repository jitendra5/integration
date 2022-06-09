const IBM_Auth =(axios,https) => 
{
    return new Promise((resolve,reject)=>
    {
            
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

//data from different end points
// START....

const IBM_getSubjectVisit_CT =(axios,https,cook,request,EndpointPath) => 
{

    return new Promise((resolve,reject)=>
    {
        //Set the cookie instead of setting into header
            //console.log('cook::',cook);
            
        var config = {
        method: 'GET',
        url: 'https://api.eclinicalos.com/edc_studyservices.jsp?action=infoattempt&type='+EndpointPath, //data_datatable&param1=CT
        headers: 
            { 
            'Cookie': cook
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
            
    });
};


const IBM_parseFUData = (finalJSON)=>{

    let finalobj={};
    let FUFinalData ={};
    return new Promise((resolve,reject)=>
    {
            
        try{

            let FUChildArray =[];
            //console.log( "FU length : ", finalJSON.length);

            for (let x=0 ;x<finalJSON.length ;x++) {
                //console.log( "x : ", finalJSON[x]);
                //let obj = {};

                let subid = finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBID'));
                let subnum =  finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBNUM')); 
                //let visname = finalJSON[x]['value'].find(x=> (x['colname'] == 'VISNAME')); 
                let visitid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITID')); 
                let visitseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITSEQ')); 
                let pageid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGEID')); 
                let pageseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGESEQ'));
                let statusid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'STATUSID'));  
                let fudt =  finalJSON[x]['value'].find(x=> (x['colname'] == 'FUDT'));   
                let fuperf =  finalJSON[x]['value'].find(x=> (x['colname'] == 'FUPERF'));
                let visitty =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITTY'));
                
                if(FUChildArray.includes(subid['$t'])){
                    let obj = {};
                    
                    obj['table'] ='FU';
                    obj['subid'] = subid['$t'];
                    obj['subnum'] = subnum['$t'];
                    obj['visname'] = '';//visname['$t'];
                    obj['visitid'] = visitid['$t'];
                    obj['visitseq'] = visitseq['$t'];
                    obj['pageid'] = pageid['$t'];
                    obj['pageseq'] = pageseq['$t'];

                    obj['statusid'] = statusid['$t'] != undefined ? statusid['$t'] :'';
                    obj['fudt'] = fudt['$t'] != undefined ? fudt['$t'] : '';
                    obj['fuperf'] = fuperf['$t'] != undefined ? fuperf['$t']  : '';
                    obj['ctdt'] = ''; 
                    obj['imgsntdt'] = ''; 
                    obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t']; 
                    obj['visitty'] = visitty['$t'] != undefined ? visitty['$t']  : '';

                    let child = FUFinalData[subid['$t']];
                    child.push(obj);
                    FUFinalData[subid['$t']] = child;

                }else{
                    
                    let child = [];
                    let obj = {};
                    
                    obj['table'] ='FU';
                    obj['visname'] = '';
                    obj['subid'] = subid['$t'];
                    obj['subnum'] = subnum['$t'];
                    obj['visitid'] = visitid['$t'];
                    obj['visitseq'] = visitseq['$t'];
                    obj['pageid'] = pageid['$t'];
                    obj['pageseq'] = pageseq['$t'];

                    obj['statusid'] = statusid['$t'] != undefined ? statusid['$t'] :'';
                    obj['fudt'] = fudt['$t'] != undefined ? fudt['$t'] : '';
                    obj['fuperf'] = fuperf['$t'] != undefined ? fuperf['$t']  : '';
                    obj['ctdt'] = ''; 
                    obj['imgsntdt'] = ''; 
                    obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t'];
                    obj['visitty'] = visitty['$t'] != undefined ? visitty['$t']  : '';

                    child.push(obj);
                    FUFinalData[subid['$t']] = child;
                    FUChildArray.push(subid['$t']); 
                }
        
            }
            
            finalobj['status']='success';
            finalobj['result']= FUFinalData;
            resolve(finalobj);

        }catch(err){
            console.log('eror::',err);
        
            finalobj['status']='error';
            finalobj['result']= err;
            reject(finalobj);
        }    
    });
};

const IBM_parseELIGData = (finalJSON)=>{

    let finalobj={};
    let ELIGFinalData ={};
    return new Promise((resolve,reject)=>
    {
            
            try{

                let ELIGChildArray =[];
                //console.log( "FU length : ", finalJSON.length);
                for (let x=0 ;x<finalJSON.length ;x++) {
                    //console.log( "x : ", finalJSON[x]);
                    
                    let subid = finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBID'));
                    let subnum =  finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBNUM')); 
                    let visitid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITID')); 
                    let visitseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITSEQ')); 
                    let pageid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGEID')); 
                    let pageseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGESEQ'));
                    let statusid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'STATUSID'));
        
                    let pielig = finalJSON[x]['value'].find(x=> (x['colname'] == 'PIELIG'));
                    let picomm = finalJSON[x]['value'].find(x=> (x['colname'] == 'PICOMM'));
                    let ctelig = finalJSON[x]['value'].find(x=> (x['colname'] == 'CTELIG')); 
                    let elig = finalJSON[x]['value'].find(x=> (x['colname'] == 'ELIG'));
                    let crbine1 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE1'));
                    let crbine2 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE2'));
                    let crbine3 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE3'));
                    let crbine4 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE4'));
                    let crbine5 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE5'));
                    let crbine6 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE6'));
                    let crbine7 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE7'));
                    let crbine8 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE8'));
                    let crbine9 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE9'));
                    let crbine10 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE10'));
                    let crbine11 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE11'));
                    let crbine12 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE12'));
                    let crbine13 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE13'));
                    let crbine14 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE14'));
                    let crbine15 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE15'));
                    let crbine16 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE16'));
                    let crbine17 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE17'));
                    let crbine18 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE18'));
                    let crbine19 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE19'));
                    let crbine20 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE20'));
                    let crbine21 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE21'));
                    let crbine22 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE22'));
                    let crbine23 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE23'));
                    let crbine24 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE24'));
                    let crbine25 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE25'));
                    let crbine26 = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBINE26'));
                    let com = finalJSON[x]['value'].find(x=> (x['colname'] == 'COM'));
        
                    if(ELIGChildArray.includes(subid['$t'])){  
        
                        let obj = {};
        
                        obj['table']    = 'ELIG';
                        obj['subid']    = subid['$t'];
                        obj['subnum']   = subnum['$t'];
                        obj['visitid']  = visitid['$t'];
                        obj['visitseq'] = visitseq['$t'];
                        obj['pageid']   = pageid['$t'];
                        obj['pageseq']  = pageseq['$t'];
        
                        obj['statusid'] = statusid['$t'] != undefined ? statusid['$t'] :'';
                        obj['pielig']   = pielig['$t']   != undefined ? pielig['$t'] :'';
                        obj['picomm']   = picomm['$t']   != undefined ? picomm['$t'] :'';
                        obj['ctelig']   = ctelig['$t']   != undefined ? ctelig['$t'] :'';
                        obj['elig']     = elig['$t']     != undefined ? elig['$t'] :'';
                        obj['crbine1']  = crbine1['$t']  != undefined ? crbine1['$t'] :'';
                        obj['crbine2']  = crbine2['$t']  != undefined ? crbine2['$t'] :'';
                        obj['crbine3']  = crbine3['$t']  != undefined ? crbine3['$t'] :'';
                        obj['crbine4']  = crbine4['$t']  != undefined ? crbine4['$t'] :'';
                        obj['crbine5']  = crbine5['$t']  != undefined ? crbine5['$t'] :'';
                        obj['crbine6']  = crbine6['$t']  != undefined ? crbine6['$t'] :'';
                        obj['crbine7']  = crbine7['$t']  != undefined ? crbine7['$t'] :'';
                        obj['crbine8']  = crbine8['$t']  != undefined ? crbine8['$t'] :'';
                        obj['crbine9']  = crbine9['$t']  != undefined ? crbine9['$t'] :'';
                        obj['crbine10'] = crbine10['$t'] != undefined ? crbine10['$t'] :'';
                        obj['crbine11'] = crbine11['$t'] != undefined ? crbine11['$t'] :'';
                        obj['crbine12'] = crbine12['$t'] != undefined ? crbine12['$t'] :'';
                        obj['crbine13'] = crbine13['$t'] != undefined ? crbine13['$t'] :'';
                        obj['crbine14'] = crbine14['$t'] != undefined ? crbine14['$t'] :'';
                        obj['crbine15'] = crbine15['$t'] != undefined ? crbine15['$t'] :'';
                        obj['crbine16'] = crbine16['$t'] != undefined ? crbine16['$t'] :'';
                        obj['crbine17'] = crbine17['$t'] != undefined ? crbine17['$t'] :'';
                        obj['crbine18'] = crbine18['$t'] != undefined ? crbine18['$t'] :'';
                        obj['crbine19'] = crbine19['$t'] != undefined ? crbine19['$t'] :'';
                        obj['crbine20'] = crbine20['$t'] != undefined ? crbine20['$t'] :''; 
                        obj['crbine21'] = crbine21['$t'] != undefined ? crbine21['$t'] :'';
                        obj['crbine22'] = crbine22['$t'] != undefined ? crbine22['$t'] :'';
                        obj['crbine23'] = crbine23['$t'] != undefined ? crbine23['$t'] :'';
                        obj['crbine24'] = crbine24['$t'] != undefined ? crbine24['$t'] :'';
                        obj['crbine25'] = crbine25['$t'] != undefined ? crbine25['$t'] :'';
                        obj['crbine26'] = crbine26['$t'] != undefined ? crbine26['$t'] :'';
                        obj['com']      = com['$t']  != undefined ? com['$t'] :'';
                        obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t']; 
                        
                        let child = ELIGFinalData[subid['$t']];
                        child.push(obj);
                        ELIGFinalData[subid['$t']] = child;
        
                    }else{
        
                        let child = [];
                        let obj = {};
        
                        obj['table'] ='ELIG';
                        obj['subid'] = subid['$t'];
                        obj['subnum'] = subnum['$t'];
                        obj['visitid'] = visitid['$t'];
                        obj['visitseq'] = visitseq['$t'];
                        obj['pageid'] = pageid['$t'];
                        obj['pageseq'] = pageseq['$t'];
                        obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t'];
        
                        obj['statusid'] = statusid['$t'] != undefined ? statusid['$t'] :'';
                        obj['pielig']   = pielig['$t']   != undefined ? pielig['$t'] :'';
                        obj['picomm']   = picomm['$t']   != undefined ? picomm['$t'] :'';
                        obj['ctelig']   = ctelig['$t']   != undefined ? ctelig['$t'] :'';
                        obj['elig']     = elig['$t']     != undefined ? elig['$t'] :'';
                        obj['crbine1']  = crbine1['$t']  != undefined ? crbine1['$t'] :'';
                        obj['crbine2']  = crbine2['$t']  != undefined ? crbine2['$t'] :'';
                        obj['crbine3']  = crbine3['$t']  != undefined ? crbine3['$t'] :'';
                        obj['crbine4']  = crbine4['$t']  != undefined ? crbine4['$t'] :'';
                        obj['crbine5']  = crbine5['$t']  != undefined ? crbine5['$t'] :'';
                        obj['crbine6']  = crbine6['$t']  != undefined ? crbine6['$t'] :'';
                        obj['crbine7']  = crbine7['$t']  != undefined ? crbine7['$t'] :'';
                        obj['crbine8']  = crbine8['$t']  != undefined ? crbine8['$t'] :'';
                        obj['crbine9']  = crbine9['$t']  != undefined ? crbine9['$t'] :'';
                        obj['crbine10'] = crbine10['$t'] != undefined ? crbine10['$t'] :'';
                        obj['crbine11'] = crbine11['$t'] != undefined ? crbine11['$t'] :'';
                        obj['crbine12'] = crbine12['$t'] != undefined ? crbine12['$t'] :'';
                        obj['crbine13'] = crbine13['$t'] != undefined ? crbine13['$t'] :'';
                        obj['crbine14'] = crbine14['$t'] != undefined ? crbine14['$t'] :'';
                        obj['crbine15'] = crbine15['$t'] != undefined ? crbine15['$t'] :'';
                        obj['crbine16'] = crbine16['$t'] != undefined ? crbine16['$t'] :'';
                        obj['crbine17'] = crbine17['$t'] != undefined ? crbine17['$t'] :'';
                        obj['crbine18'] = crbine18['$t'] != undefined ? crbine18['$t'] :'';
                        obj['crbine19'] = crbine19['$t'] != undefined ? crbine19['$t'] :'';
                        obj['crbine20'] = crbine20['$t'] != undefined ? crbine20['$t'] :''; 
                        obj['crbine21'] = crbine21['$t'] != undefined ? crbine21['$t'] :'';
                        obj['crbine22'] = crbine22['$t'] != undefined ? crbine22['$t'] :'';
                        obj['crbine23'] = crbine23['$t'] != undefined ? crbine23['$t'] :'';
                        obj['crbine24'] = crbine24['$t'] != undefined ? crbine24['$t'] :'';
                        obj['crbine25'] = crbine25['$t'] != undefined ? crbine25['$t'] :'';
                        obj['crbine26'] = crbine26['$t'] != undefined ? crbine26['$t'] :'';
                        obj['com']      = com['$t']  != undefined ? com['$t'] :'';
                        
        
                        child.push(obj);
                        ELIGFinalData[subid['$t']] = child;
                        ELIGChildArray.push(subid['$t']); 
                    }
                
                }
                
                finalobj['status']='success';
                finalobj['result']= ELIGFinalData;
                resolve(finalobj);

            }catch(err){
                console.log('eror::',err);
            
                finalobj['status']='error';
                finalobj['result']= err;
                reject(finalobj);
            }
    })
};

const IBM_parseCASEREVData = (finalJSON)=>{

    let finalobj={};
    let CASEREVFinalData ={};
    return new Promise((resolve,reject)=>
    {
            
        try{

            let CASEREVChildArray =[];
    
            for (let x=0 ;x<finalJSON.length ;x++) {
                //console.log( "x : ", finalJSON[x]);

                let subid = finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBID'));
                let subnum =  finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBNUM')); 
                let visitid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITID')); 
                let visitseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITSEQ')); 
                let pageid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGEID')); 
                let pageseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGESEQ'));
                
                let proctrname = finalJSON[x]['value'].find(x=> (x['colname'] == 'PROCTRNAME'));
                let crbelig = finalJSON[x]['value'].find(x=> (x['colname'] == 'CRBELIG'));
                let neckyn = finalJSON[x]['value'].find(x=> (x['colname'] == 'NECKYN'));
                let neckrsn1 = finalJSON[x]['value'].find(x=> (x['colname'] == 'NECKRSN1'));
                let neckrsn2 = finalJSON[x]['value'].find(x=> (x['colname'] == 'NECKRSN2'));
                let neckrsn3 = finalJSON[x]['value'].find(x=> (x['colname'] == 'NECKRSN3'));
                let neckrsn4 = finalJSON[x]['value'].find(x=> (x['colname'] == 'NECKRSN4'));
                let neckrsn5 = finalJSON[x]['value'].find(x=> (x['colname'] == 'NECKRSN5'));
                let neckrsn6 = finalJSON[x]['value'].find(x=> (x['colname'] == 'NECKRSN6'));
                let neckrsn7 = finalJSON[x]['value'].find(x=> (x['colname'] == 'NECKRSN7'));
                let neckrsn8 = finalJSON[x]['value'].find(x=> (x['colname'] == 'NECKRSN8'));
                let neckrsn9 = finalJSON[x]['value'].find(x=> (x['colname'] == 'NECKRSN9'));
                let anrysmyn = finalJSON[x]['value'].find(x=> (x['colname'] == 'ANRYSMYN'));
                let anrysmrsn = finalJSON[x]['value'].find(x=> (x['colname'] == 'ANRYSMRSN'));
                let Ilaiyn = finalJSON[x]['value'].find(x=> (x['colname'] == 'ILAIYN'));
                let ilairsn1 = finalJSON[x]['value'].find(x=> (x['colname'] == 'ILAIRSN1'));
                let ilairsn2 = finalJSON[x]['value'].find(x=> (x['colname'] == 'ILAIRSN2'));
                let Ilairsn3 = finalJSON[x]['value'].find(x=> (x['colname'] == 'ILAIRSN3'));
                let accsyn = finalJSON[x]['value'].find(x=> (x['colname'] == 'ACCSYN'));
                let accsrsn1 = finalJSON[x]['value'].find(x=> (x['colname'] == 'ACCSRSN1'));
                let accsrsn2 = finalJSON[x]['value'].find(x=> (x['colname'] == 'ACCSRSN2'));
                let accsrsn3 = finalJSON[x]['value'].find(x=> (x['colname'] == 'ACCSRSN3'));

                let neckotyn = finalJSON[x]['value'].find(x=> (x['colname'] == 'NECKOTYN'));
                let neclotsp = finalJSON[x]['value'].find(x=> (x['colname'] == 'NECLOTSP'));
                let larmbcyn = finalJSON[x]['value'].find(x=> (x['colname'] == 'LARMBCYN'));
                let rarmbcyn = finalJSON[x]['value'].find(x=> (x['colname'] == 'RARMBCYN'));
                let biarmbcyn = finalJSON[x]['value'].find(x=> (x['colname'] == 'BIARMBCYN'));
                let ciadilgt9yn = finalJSON[x]['value'].find(x=> (x['colname'] == 'CIADILGT9YN'));
                let liiarhypmbcyn = finalJSON[x]['value'].find(x=> (x['colname'] == 'LIIARHYPMBCYN'));
                let riiarhypmbcyn = finalJSON[x]['value'].find(x=> (x['colname'] == 'RIIARHYPMBCYN'));
                let cdnotyn = finalJSON[x]['value'].find(x=> (x['colname'] == 'CDNOTYN'));
                let cdnotsp = finalJSON[x]['value'].find(x=> (x['colname'] == 'CDNOTSP'));

                if(CASEREVChildArray.includes(subid['$t'])){

                    let obj = {};
                    
                    obj['table'] ='CASEREV';
                    obj['subid'] = subid['$t'];
                    obj['subnum'] = subnum['$t'];
                    obj['visitid'] = visitid['$t'];
                    obj['visitseq'] = visitseq['$t'];
                    obj['pageid'] = pageid['$t'];
                    obj['pageseq'] = pageseq['$t'];
                    obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t']; 

                    obj['proctrname']= proctrname['$t']!= undefined ? proctrname['$t'] :'';
                    obj['crbelig']   = crbelig['$t']   != undefined ? crbelig['$t'] :'';
                    obj['neckyn']    = neckyn['$t']    != undefined ? neckyn['$t'] :'';
                    obj['neckrsn1']  = neckrsn1['$t']  != undefined ? neckrsn1['$t'] :'';
                    obj['neckrsn2']  = neckrsn2['$t']  != undefined ? neckrsn2['$t'] :'';
                    obj['neckrsn3']  = neckrsn3['$t']  != undefined ? neckrsn3['$t'] :'';
                    obj['neckrsn4']  = neckrsn4['$t']  != undefined ? neckrsn4['$t'] :'';
                    obj['neckrsn5']  = neckrsn5['$t']  != undefined ? neckrsn5['$t'] :'';
                    obj['neckrsn6']  = neckrsn6['$t']  != undefined ? neckrsn6['$t'] :'';
                    obj['neckrsn7']  = neckrsn7['$t']  != undefined ? neckrsn7['$t'] :'';
                    obj['neckrsn8']  = neckrsn8['$t']  != undefined ? neckrsn8['$t'] :'';
                    obj['neckrsn9']  = neckrsn9['$t']  != undefined ? neckrsn9['$t'] :'';
                    obj['anrysmyn'] = anrysmyn['$t'] != undefined ? anrysmyn['$t'] :'';
                    obj['anrysmrsn'] = anrysmrsn['$t'] != undefined ? anrysmrsn['$t'] :'';
                    obj['Ilaiyn'] = Ilaiyn['$t'] != undefined ? Ilaiyn['$t'] :'';
                    obj['ilairsn1'] = ilairsn1['$t'] != undefined ? ilairsn1['$t'] :'';
                    obj['ilairsn2'] = ilairsn2['$t'] != undefined ? ilairsn2['$t'] :'';
                    obj['Ilairsn3'] = Ilairsn3['$t'] != undefined ? Ilairsn3['$t'] :'';
                    obj['accsyn'] = accsyn['$t'] != undefined ? accsyn['$t'] :'';
                    obj['accsrsn1'] = accsrsn1['$t'] != undefined ? accsrsn1['$t'] :'';
                    obj['accsrsn2'] = accsrsn2['$t'] != undefined ? accsrsn2['$t'] :'';
                    obj['accsrsn3'] = accsrsn3['$t'] != undefined ? accsrsn3['$t'] :'';
                    obj['neckotyn'] = neckotyn['$t'] != undefined ? neckotyn['$t'] :''; 
                    obj['neclotsp'] = neclotsp['$t'] != undefined ? neclotsp['$t'] :'';
                    obj['larmbcyn'] = larmbcyn['$t'] != undefined ? larmbcyn['$t'] :'';
                    obj['rarmbcyn'] = rarmbcyn['$t'] != undefined ? rarmbcyn['$t'] :'';
                    obj['biarmbcyn'] = biarmbcyn['$t'] != undefined ? biarmbcyn['$t'] :'';
                    obj['ciadilgt9yn'] = ciadilgt9yn['$t'] != undefined ? ciadilgt9yn['$t'] :'';
                    obj['liiarhypmbcyn'] = liiarhypmbcyn['$t'] != undefined ? liiarhypmbcyn['$t'] :'';
                    obj['riiarhypmbcyn']      = riiarhypmbcyn['$t']  != undefined ? riiarhypmbcyn['$t'] :''; 
                    obj['cdnotyn']      = cdnotyn['$t']  != undefined ? cdnotyn['$t'] :'';
                    obj['cdnotsp']      = cdnotsp['$t']  != undefined ? cdnotsp['$t'] :'';
                    
                    
                    let child = CASEREVFinalData[subid['$t']];
                    child.push(obj);
                    CASEREVFinalData[subid['$t']] = child;

                }else{

                    let child = [];
                    let obj = {};

                    obj['table'] ='CASEREV';
                    obj['subid'] = subid['$t'];
                    obj['subnum'] = subnum['$t'];
                    obj['visitid'] = visitid['$t'];
                    obj['visitseq'] = visitseq['$t'];
                    obj['pageid'] = pageid['$t'];
                    obj['pageseq'] = pageseq['$t'];
                    obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t']; 

                    obj['proctrname']   = proctrname['$t']   != undefined ? proctrname['$t'] :'';
                    obj['crbelig']   = crbelig['$t']   != undefined ? crbelig['$t'] :'';
                    obj['neckyn']     = neckyn['$t']     != undefined ? neckyn['$t'] :'';
                    obj['neckrsn1']  = neckrsn1['$t']  != undefined ? neckrsn1['$t'] :'';
                    obj['neckrsn2']  = neckrsn2['$t']  != undefined ? neckrsn2['$t'] :'';
                    obj['neckrsn3']  = neckrsn3['$t']  != undefined ? neckrsn3['$t'] :'';
                    obj['neckrsn4']  = neckrsn4['$t']  != undefined ? neckrsn4['$t'] :'';
                    obj['neckrsn5']  = neckrsn5['$t']  != undefined ? neckrsn5['$t'] :'';
                    obj['neckrsn6']  = neckrsn6['$t']  != undefined ? neckrsn6['$t'] :'';
                    obj['neckrsn7']  = neckrsn7['$t']  != undefined ? neckrsn7['$t'] :'';
                    obj['neckrsn8']  = neckrsn8['$t']  != undefined ? neckrsn8['$t'] :'';
                    obj['neckrsn9']  = neckrsn9['$t']  != undefined ? neckrsn9['$t'] :'';
                    obj['anrysmyn'] = anrysmyn['$t'] != undefined ? anrysmyn['$t'] :'';
                    obj['anrysmrsn'] = anrysmrsn['$t'] != undefined ? anrysmrsn['$t'] :'';
                    obj['Ilaiyn'] = Ilaiyn['$t'] != undefined ? Ilaiyn['$t'] :'';
                    obj['ilairsn1'] = ilairsn1['$t'] != undefined ? ilairsn1['$t'] :'';
                    obj['ilairsn2'] = ilairsn2['$t'] != undefined ? ilairsn2['$t'] :'';
                    obj['Ilairsn3'] = Ilairsn3['$t'] != undefined ? Ilairsn3['$t'] :'';
                    obj['accsyn'] = accsyn['$t'] != undefined ? accsyn['$t'] :'';
                    obj['accsrsn1'] = accsrsn1['$t'] != undefined ? accsrsn1['$t'] :'';
                    obj['accsrsn2'] = accsrsn2['$t'] != undefined ? accsrsn2['$t'] :'';
                    obj['accsrsn3'] = accsrsn3['$t'] != undefined ? accsrsn3['$t'] :'';
                    obj['neckotyn'] = neckotyn['$t'] != undefined ? neckotyn['$t'] :''; 
                    obj['neclotsp'] = neclotsp['$t'] != undefined ? neclotsp['$t'] :'';
                    obj['larmbcyn'] = larmbcyn['$t'] != undefined ? larmbcyn['$t'] :'';
                    obj['rarmbcyn'] = rarmbcyn['$t'] != undefined ? rarmbcyn['$t'] :'';
                    obj['biarmbcyn'] = biarmbcyn['$t'] != undefined ? biarmbcyn['$t'] :'';
                    obj['ciadilgt9yn'] = ciadilgt9yn['$t'] != undefined ? ciadilgt9yn['$t'] :'';
                    obj['liiarhypmbcyn'] = liiarhypmbcyn['$t'] != undefined ? liiarhypmbcyn['$t'] :'';
                    obj['riiarhypmbcyn']      = riiarhypmbcyn['$t']  != undefined ? riiarhypmbcyn['$t'] :''; 
                    obj['cdnotyn']      = cdnotyn['$t']  != undefined ? cdnotyn['$t'] :'';
                    obj['cdnotsp']      = cdnotsp['$t']  != undefined ? cdnotsp['$t'] :'';

                    child.push(obj);
                    CASEREVFinalData[subid['$t']] = child;
                    CASEREVChildArray.push(subid['$t']); 
                }
            
            }

            
            finalobj['status']='success';
            finalobj['result']= CASEREVFinalData;
            resolve(finalobj);

        }catch(err){
            console.log('eror::',err);
        
            finalobj['status']='error';
            finalobj['result']= err;
            reject(finalobj);
        }

            
    })
};

const IBM_parseCTData = (finalJSON)=>{

    let finalobj={};
    let CTFinalobj ={};
    return new Promise((resolve,reject)=>
    {
            
        try{

            let CTChildArray = [];

            for (let x=0 ;x<finalJSON.length ;x++) {
                //console.log( "x : ", finalJSON[x]);
            
                let subid = finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBID'));
                let subnum =  finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBNUM')); 
                let visitid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITID')); 
                let visitseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITSEQ')); 
                let pageid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGEID')); 
                let pageseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGESEQ'));  
                let statusid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'STATUSID'));  
                
                let ctdt = finalJSON[x]['value'].find(x=> (x['colname'] == 'CTDT'));  
                let imgsntdt = finalJSON[x]['value'].find(x=> (x['colname'] == 'IMGSNTDT'));  
            
                let fuctty = finalJSON[x]['value'].find(x=> (x['colname'] == 'FUCTTY'));
                let ctrecvdt = finalJSON[x]['value'].find(x=> (x['colname'] == 'CTRECVDT'));
                let typ1br = finalJSON[x]['value'].find(x=> (x['colname'] == 'TYP1BR'));
                let typ1bl = finalJSON[x]['value'].find(x=> (x['colname'] == 'TYP1BL'));
                let typ2lum = finalJSON[x]['value'].find(x=> (x['colname'] == 'TYP2LUM'));
                let typ2ima = finalJSON[x]['value'].find(x=> (x['colname'] == 'TYP2IMA'));
                let typ2sm = finalJSON[x]['value'].find(x=> (x['colname'] == 'TYP2SM'));
                let typ3r = finalJSON[x]['value'].find(x=> (x['colname'] == 'TYP3R'));
                let typ3l = finalJSON[x]['value'].find(x=> (x['colname'] == 'TYP3L'));
                let typ3rb = finalJSON[x]['value'].find(x=> (x['colname'] == 'TYP3RB'));
                let typ3lb = finalJSON[x]['value'].find(x=> (x['colname'] == 'TYP3LB'));
                let typivr = finalJSON[x]['value'].find(x=> (x['colname'] == 'TYPIVR'));
                let typivl = finalJSON[x]['value'].find(x=> (x['colname'] == 'TYPIVL'));

                let endolk = finalJSON[x]['value'].find(x=> (x['colname'] == 'ENDOLK'));
                let endolkrs = finalJSON[x]['value'].find(x=> (x['colname'] == 'ENDOLKRS'));
                let msacd = finalJSON[x]['value'].find(x=> (x['colname'] == 'MSACD'));
                let migrat = finalJSON[x]['value'].find(x=> (x['colname'] == 'MIGRAT'));
                let migrr = finalJSON[x]['value'].find(x=> (x['colname'] == 'MIGRR'));
                let mrdir = finalJSON[x]['value'].find(x=> (x['colname'] == 'MRDIR'));
                let mrdist = finalJSON[x]['value'].find(x=> (x['colname'] == 'MRDIST'));
                let migrl = finalJSON[x]['value'].find(x=> (x['colname'] == 'MIGRL'));
                let mldir = finalJSON[x]['value'].find(x=> (x['colname'] == 'MLDIR'));
                let mldist = finalJSON[x]['value'].find(x=> (x['colname'] == 'MLDIST'));
                let migrcom = finalJSON[x]['value'].find(x=> (x['colname'] == 'MIGRCOM'));
                let typ1a = finalJSON[x]['value'].find(x=> (x['colname'] == 'TYP1A'));
                let rsm = finalJSON[x]['value'].find(x=> (x['colname'] == 'RSM'));
                let lsm = finalJSON[x]['value'].find(x=> (x['colname'] == 'LSM'));
                let ftfucomm = finalJSON[x]['value'].find(x=> (x['colname'] == 'FTFUCOMM'));

                let stenos = finalJSON[x]['value'].find(x=> (x['colname'] == 'STENOS'));
                let extthromr = finalJSON[x]['value'].find(x=> (x['colname'] == 'EXTTHROMR'));
                let extthroml = finalJSON[x]['value'].find(x=> (x['colname'] == 'EXTTHROML'));
                let len7 = finalJSON[x]['value'].find(x=> (x['colname'] == 'LEN7'));
                let typ1aot = finalJSON[x]['value'].find(x=> (x['colname'] == 'TYP1AOT'));

                
                if(CTChildArray.includes(subid['$t'])){
                    let obj = {};
                    
                    obj['table'] ='CT';
                    obj['subid'] = subid['$t'];
                    obj['subnum'] = subnum['$t'];
                    obj['visitid'] = visitid['$t'];
                    obj['visitseq'] = visitseq['$t'];
                    obj['pageid'] = pageid['$t'];
                    obj['pageseq'] = pageseq['$t'];
                    obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t']; 

                    obj['fuctty'] = fuctty['$t'] != undefined ? fuctty['$t'] : '';
                    obj['ctrecvdt'] = ctrecvdt['$t'] != undefined ? ctrecvdt['$t'] : '';
                    obj['typ1br'] = typ1br['$t'] != undefined ? typ1br['$t'] : '';
                    obj['typ1bl'] = typ1bl['$t'] != undefined ? typ1bl['$t'] : '';
                    obj['typ2lum'] = typ2lum['$t'] != undefined ? typ2lum['$t'] : '';
                    obj['typ2ima'] = typ2ima['$t'] != undefined ? typ2ima['$t'] : '';
                    obj['typ2sm'] = typ2sm['$t'] != undefined ? typ2sm['$t'] : '';
                    obj['typ3r'] = typ3r['$t'] != undefined ? typ3r['$t'] : '';
                    obj['typ3l'] = typ3l['$t'] != undefined ? typ3l['$t'] : '';
                    obj['typ3rb'] = typ3rb['$t'] != undefined ? typ3rb['$t'] : '';
                    obj['typ3lb'] = typ3lb['$t'] != undefined ? typ3lb['$t'] : '';
                    obj['typivr'] = typivr['$t'] != undefined ? typivr['$t'] : '';
                    obj['typivl'] = typivl['$t'] != undefined ? typivl['$t'] : '';
                    obj['ctdt'] = ctdt['$t'] != undefined ? ctdt['$t'] : '';
                    obj['imgsntdt'] = imgsntdt['$t'] != undefined ? imgsntdt['$t'] : '';
                    
                    obj['endolk'] = endolk['$t'] != undefined ? endolk['$t'] : '';
                    obj['endolkrs'] = endolkrs['$t'] != undefined ? endolkrs['$t'] : '';
                    obj['msacd'] = msacd['$t'] != undefined ? msacd['$t'] : '';
                    obj['migrat'] = migrat['$t'] != undefined ? migrat['$t'] : '';
                    obj['migrr'] = migrr['$t'] != undefined ? migrr['$t'] : '';
                    obj['mrdir'] = mrdir['$t'] != undefined ? mrdir['$t'] : '';
                    obj['mrdist'] = mrdist['$t'] != undefined ? mrdist['$t'] : '';
                    obj['migrl'] = migrl['$t'] != undefined ? migrl['$t'] : '';
                    obj['mldir'] = mldir['$t'] != undefined ? mldir['$t'] : '';
                    obj['mldist'] = mldist['$t'] != undefined ? mldist['$t'] : '';
                    obj['migrcom'] = migrcom['$t'] != undefined ? migrcom['$t'] : '';
                    obj['typ1a'] = typ1a['$t'] != undefined ? typ1a['$t'] : '';
                    obj['rsm'] = rsm['$t'] != undefined ? rsm['$t'] : '';
                    obj['lsm'] = lsm['$t'] != undefined ? lsm['$t'] : '';
                    obj['ftfucomm'] = ftfucomm['$t'] != undefined ? ftfucomm['$t'] : '';

                    obj['stenos'] = stenos['$t'] != undefined ? stenos['$t'] : '';
                    obj['extthromr'] = extthromr['$t'] != undefined ? extthromr['$t'] : '';   
                    obj['extthroml'] = extthroml['$t'] != undefined ? extthroml['$t'] : '';
                    obj['len7'] = len7['$t'] != undefined ? len7['$t'] : '';
                    obj['typ1aot'] = typ1aot['$t'] != undefined ? typ1aot['$t'] : '';
                    obj['statusid'] = statusid['$t'] != undefined ? statusid['$t'] :'';
                    
                    let child = CTFinalobj[subid['$t']];
                    child.push(obj);
                    CTFinalobj[subid['$t']] = child;

                }else{
                    
                    let child = [];
                    let obj = {};
                    
                    obj['table'] ='CT';
                    obj['visname'] = '';
                    obj['statusid'] = '';
                    obj['fudt'] = '';
                    obj['subid'] = subid['$t'];
                    obj['subnum'] = subnum['$t'];
                    obj['visitid'] = visitid['$t'];
                    obj['visitseq'] = visitseq['$t'];
                    obj['pageid'] = pageid['$t'];
                    obj['pageseq'] = pageseq['$t'];
                    obj['statusid'] = statusid['$t'] != undefined ? statusid['$t'] :'';

                    obj['fuctty'] = fuctty['$t'] != undefined ? fuctty['$t'] : '';
                    obj['ctrecvdt'] = ctrecvdt['$t'] != undefined ? ctrecvdt['$t'] : '';
                    obj['typ1br'] = typ1br['$t'] != undefined ? typ1br['$t'] : '';
                    obj['typ1bl'] = typ1bl['$t'] != undefined ? typ1bl['$t'] : '';
                    obj['typ2lum'] = typ2lum['$t'] != undefined ? typ2lum['$t'] : '';
                    obj['typ2ima'] = typ2ima['$t'] != undefined ? typ2ima['$t'] : '';
                    obj['typ2sm'] = typ2sm['$t'] != undefined ? typ2sm['$t'] : '';
                    obj['typ3r'] = typ3r['$t'] != undefined ? typ3r['$t'] : '';
                    obj['typ3l'] = typ3l['$t'] != undefined ? typ3l['$t'] : '';
                    obj['typ3rb'] = typ3rb['$t'] != undefined ? typ3rb['$t'] : '';
                    obj['typ3lb'] = typ3lb['$t'] != undefined ? typ3lb['$t'] : '';
                    obj['typivr'] = typivr['$t'] != undefined ? typivr['$t'] : '';
                    obj['typivl'] = typivl['$t'] != undefined ? typivl['$t'] : '';
                    obj['ctdt'] = ctdt['$t'] != undefined ? ctdt['$t'] : ''; 
                    obj['imgsntdt'] = imgsntdt['$t'] != undefined ? imgsntdt['$t'] : ''; 
                    
                    obj['endolk'] = endolk['$t'] != undefined ? endolk['$t'] : ''; 
                    obj['endolkrs'] = endolkrs['$t'] != undefined ? endolkrs['$t'] : ''; 
                    obj['msacd'] = msacd['$t'] != undefined ? msacd['$t'] : '';
                    obj['migrat'] = migrat['$t'] != undefined ? migrat['$t'] : '';
                    obj['migrr'] = migrr['$t'] != undefined ? migrr['$t'] : '';
                    obj['mrdir'] = mrdir['$t'] != undefined ? mrdir['$t'] : '';
                    obj['mrdist'] = mrdist['$t'] != undefined ? mrdist['$t'] : '';
                    obj['migrl'] = migrl['$t'] != undefined ? migrl['$t'] : '';
                    obj['mldir'] = mldir['$t'] != undefined ? mldir['$t'] : '';
                    obj['mldist'] = mldist['$t'] != undefined ? mldist['$t'] : '';
                    obj['migrcom'] = migrcom['$t'] != undefined ? migrcom['$t'] : '';
                    obj['typ1a'] = typ1a['$t'] != undefined ? typ1a['$t'] : '';
                    obj['rsm'] = rsm['$t'] != undefined ? rsm['$t'] : '';
                    obj['lsm'] = lsm['$t'] != undefined ? lsm['$t'] : '';
                    obj['ftfucomm'] = ftfucomm['$t'] != undefined ? ftfucomm['$t'] : '';

                    obj['stenos'] = stenos['$t'] != undefined ? stenos['$t'] : '';
                    obj['extthromr'] = extthromr['$t'] != undefined ? extthromr['$t'] : '';   
                    obj['extthroml'] = extthroml['$t'] != undefined ? extthroml['$t'] : '';
                    obj['len7'] = len7['$t'] != undefined ? len7['$t'] : '';
                    obj['typ1aot'] = typ1aot['$t'] != undefined ? typ1aot['$t'] : '';
                    
                    obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t'];


                    child.push(obj);
                    CTFinalobj[subid['$t']] = child;
                    CTChildArray.push(subid['$t']); 
                }
                
            }

            finalobj['status']='success';
            finalobj['result']= CTFinalobj;
            resolve(finalobj);

        }catch(err){
            console.log('eror::',err);
        
            finalobj['status']='error';
            finalobj['result']= err;
            reject(finalobj);
        }

            
    })
};

const IBM_parseSCRCTData = (finalJSON)=>{

    let finalobj={};
    let SCRCTFinalobj ={};
    return new Promise((resolve,reject)=>
    {
            
        try{

            let SCRCTChildArray = [];

            for (let x=0 ;x<finalJSON.length ;x++) {
                //console.log( "x : ", finalJSON[x]);
                
    
                let subid = finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBID'));
                let subnum =  finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBNUM')); 

                let visitid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITID')); 
                let visitseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITSEQ')); 
                let pageid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGEID')); 
                let pageseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGESEQ'));  
    
                let scrrev = finalJSON[x]['value'].find(x=> (x['colname'] == 'SCRREV')); 
                let eligrev = finalJSON[x]['value'].find(x=> (x['colname'] == 'ELIGREV'));  
                let statusid = finalJSON[x]['value'].find(x=> (x['colname'] == 'STATUSID'));  
            
                if(SCRCTChildArray.includes(subid['$t'])){ 
    
                    let obj = {};
    
                    obj['table'] ='SCRCT';
                    obj['visname'] = '';
                    obj['fudt'] = '';
                    obj['subid'] = subid['$t'];
                    obj['subnum'] = subnum['$t'];
                    obj['visitid'] = visitid['$t'];
                    obj['visitseq'] = visitseq['$t'];
                    obj['pageid'] = pageid['$t'];
                    obj['pageseq'] = pageseq['$t'];
    
                    obj['statusid'] = statusid['$t'] != undefined ? statusid['$t'] : '';
                    obj['scrrev'] = scrrev['$t'] != undefined ? scrrev['$t'] : '';
                    obj['eligrev'] = eligrev['$t'] != undefined ? eligrev['$t'] : '';
                    obj['ctdt'] =''; 
                    obj['imgsntdt'] = ''; 
                    obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t']; 
    
                    let child = SCRCTFinalobj[subid['$t']];
                    child.push(obj);
                    SCRCTFinalobj[subid['$t']] = child;
                }else{
    
                    let child = [];
                    let obj = {};
    
                    obj['table'] ='SCRCT';
                    obj['visname'] = '';
                    obj['fudt'] = '';
                    obj['subid'] = subid['$t'];
                    obj['subnum'] = subnum['$t'];
                    obj['visitid'] = visitid['$t'];
                    obj['visitseq'] = visitseq['$t'];
                    obj['pageid'] = pageid['$t'];
                    obj['pageseq'] = pageseq['$t'];
    
                    obj['statusid'] = statusid['$t'] != undefined ? statusid['$t'] : '';
                    obj['scrrev'] = scrrev['$t'] != undefined ? scrrev['$t'] : '';
                    obj['eligrev'] = eligrev['$t'] != undefined ? eligrev['$t'] : '';
                    obj['ctdt'] =''; 
                    obj['imgsntdt'] = ''; 
                    obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t'];   
    
                    child.push(obj);
                    SCRCTFinalobj[subid['$t']] = child;
                    SCRCTChildArray.push(subid['$t']); 
    
                }
                
            }
            
            finalobj['status']='success';
            finalobj['result']= SCRCTFinalobj;
            resolve(finalobj);

        }catch(err){
            console.log('eror::',err);
        
            finalobj['status']='error';
            finalobj['result']= err;
            reject(finalobj);
        }
    })
};

const IBM_parseIDXPData = (finalJSON)=>{

    let finalobj={};
    let IDXPFinalobj ={};
    return new Promise((resolve,reject)=>
    {
            
        try{

            let IDXPChildArray = [];

            for (let x=0 ;x<finalJSON.length ;x++) {
                //console.log( "x : ", finalJSON[x]);
            
                let subid = finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBID'));
                let subnum =  finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBNUM'));
                let visitid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITID')); 
                let visitseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITSEQ')); 
                let pageid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGEID')); 
                let pageseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGESEQ'));
                let trtdt =  finalJSON[x]['value'].find(x=> (x['colname'] == 'TRTDT')); 
                
                let complete =  finalJSON[x]['value'].find(x=> (x['colname'] == 'COMPLETE'));
                let typ1a=  finalJSON[x]['value'].find(x=> (x['colname'] == 'TYP1A'));
                let typu=  finalJSON[x]['value'].find(x=> (x['colname'] == 'TYPU'));
                let typucomm=  finalJSON[x]['value'].find(x=> (x['colname'] == 'TYPUCOMM'));
                let any2ndrypx=  finalJSON[x]['value'].find(x=> (x['colname'] == 'ANY2NDRYPX'));
                let pconproc=  finalJSON[x]['value'].find(x=> (x['colname'] == 'PCONPROC'));
                let reinnar=  finalJSON[x]['value'].find(x=> (x['colname'] == 'REINNAR'));
                let idxposyn=  finalJSON[x]['value'].find(x=> (x['colname'] == 'IDXPOSYN'));

                let STATUSID=  finalJSON[x]['value'].find(x=> (x['colname'] == 'STATUSID'));
                let PHYS=  finalJSON[x]['value'].find(x=> (x['colname'] == 'PHYS'));
                let APHYS=  finalJSON[x]['value'].find(x=> (x['colname'] == 'APHYS'));
                let ANESTH=  finalJSON[x]['value'].find(x=> (x['colname'] == 'ANESTH'));
                let ACCTYP=  finalJSON[x]['value'].find(x=> (x['colname'] == 'ACCTYP'));
                let AAASYN=  finalJSON[x]['value'].find(x=> (x['colname'] == 'AAASYN'));
                let PREFILL=  finalJSON[x]['value'].find(x=> (x['colname'] == 'PREFILL'));
                let PREFILV=  finalJSON[x]['value'].find(x=> (x['colname'] == 'PREFILV'));
                let PFILLPR=  finalJSON[x]['value'].find(x=> (x['colname'] == 'PFILLPR'));
                let FILLPR=  finalJSON[x]['value'].find(x=> (x['colname'] == 'FILLPR'));
                let OC1=  finalJSON[x]['value'].find(x=> (x['colname'] == 'OC1'));
                let OC2=  finalJSON[x]['value'].find(x=> (x['colname'] == 'OC2'));
                let OC3=  finalJSON[x]['value'].find(x=> (x['colname'] == 'OC3'));
                let OC4=  finalJSON[x]['value'].find(x=> (x['colname'] == 'OC4'));
                let REINPXTM=  finalJSON[x]['value'].find(x=> (x['colname'] == 'REINPXTM'));
                let ANESTM=  finalJSON[x]['value'].find(x=> (x['colname'] == 'ANESTM'));
                let CONVOL=  finalJSON[x]['value'].find(x=> (x['colname'] == 'CONVOL'));
                let BLLOSS=  finalJSON[x]['value'].find(x=> (x['colname'] == 'BLLOSS'));
                let FLUOTM=  finalJSON[x]['value'].find(x=> (x['colname'] == 'FLUOTM'));
                let TRANSFU=  finalJSON[x]['value'].find(x=> (x['colname'] == 'TRANSFU'));
                let ARTREP=  finalJSON[x]['value'].find(x=> (x['colname'] == 'ARTREP'));
                let ENDOLK=  finalJSON[x]['value'].find(x=> (x['colname'] == 'ENDOLK'));
                let NLXSTNTS=  finalJSON[x]['value'].find(x=> (x['colname'] == 'NLXSTNTS'));
                let PSPEC = finalJSON[x]['value'].find(x=> (x['colname'] == 'PSPEC')); 

                let RATM = finalJSON[x]['value'].find(x=> (x['colname'] == 'RATM'));
                let OCC3 = finalJSON[x]['value'].find(x=> (x['colname'] == 'OCC3'));
                let OCC2 = finalJSON[x]['value'].find(x=> (x['colname'] == 'OCC2'));
                let SMATM = finalJSON[x]['value'].find(x=> (x['colname'] == 'SMATM'));
                let CHIMNYN = finalJSON[x]['value'].find(x=> (x['colname'] == 'CHIMNYN'));

                if(IDXPChildArray.includes(subid['$t'])){
    
                    let obj = {};
    
                    obj['visname'] =='';
                    obj['subid'] = subid['$t'];
                    obj['subnum'] = subnum['$t'];
                    obj['visitid'] = visitid['$t'];
                    obj['visitseq'] = visitseq['$t'];
                    obj['pageid'] = pageid['$t'];
                    obj['pageseq'] = pageseq['$t'];
    
                    obj['trtdt'] = trtdt['$t'] != undefined ? trtdt['$t'] : '';
                    obj['complete'] = complete['$t'] != undefined ? complete['$t'] : '';
                    obj['typ1a'] = typ1a['$t'] != undefined ? typ1a['$t'] : '';
                    obj['typu'] = typu['$t'] != undefined ? typu['$t'] : '';
                    obj['typucomm'] = typucomm['$t'] != undefined ? typucomm['$t'] : '';
                    obj['any2ndrypx'] = any2ndrypx['$t'] != undefined ? any2ndrypx['$t'] : '';
                    obj['pconproc'] = pconproc['$t'] != undefined ? pconproc['$t'] : '';
                    obj['reinnar'] = reinnar['$t'] != undefined ? reinnar['$t'] : '';
                    obj['idxposyn'] = idxposyn['$t'] != undefined ? idxposyn['$t'] : '';

                    obj['STATUSID'] = STATUSID['$t'] != undefined ? STATUSID['$t'] : '';
                    obj['PHYS'] = PHYS['$t'] != undefined ? PHYS['$t'] : '';
                    obj['APHYS'] = APHYS['$t'] != undefined ? APHYS['$t'] : '';
                    obj['ANESTH'] = ANESTH['$t'] != undefined ? ANESTH['$t'] : '';
                    obj['ACCTYP'] = ACCTYP['$t'] != undefined ? ACCTYP['$t'] : '';
                    obj['AAASYN'] = AAASYN['$t'] != undefined ? AAASYN['$t'] : '';
                    obj['PREFILL'] = PREFILL['$t'] != undefined ? PREFILL['$t'] : '';
                    obj['PREFILV'] = PREFILV['$t'] != undefined ? PREFILV['$t'] : '';
                    obj['PFILLPR'] = PFILLPR['$t'] != undefined ? PFILLPR['$t'] : '';
                    obj['FILLPR'] = FILLPR['$t'] != undefined ? FILLPR['$t'] : '';
                    obj['OC1'] = OC1['$t'] != undefined ? OC1['$t'] : '';
                    obj['OC2'] = OC2['$t'] != undefined ? OC2['$t'] : '';
                    obj['OC3'] = OC3['$t'] != undefined ? OC3['$t'] : '';
                    obj['OC4'] = OC4['$t'] != undefined ? OC4['$t'] : '';
                    obj['REINPXTM'] = REINPXTM['$t'] != undefined ? REINPXTM['$t'] : '';
                    obj['ANESTM'] = ANESTM['$t'] != undefined ? ANESTM['$t'] : '';
                    obj['CONVOL'] = CONVOL['$t'] != undefined ? CONVOL['$t'] : '';
                    obj['BLLOSS'] = BLLOSS['$t'] != undefined ? BLLOSS['$t'] : '';
                    obj['FLUOTM'] = FLUOTM['$t'] != undefined ? FLUOTM['$t'] : '';
                    obj['TRANSFU'] = TRANSFU['$t'] != undefined ? TRANSFU['$t'] : '';
                    obj['ARTREP'] = ARTREP['$t'] != undefined ? ARTREP['$t'] : '';
                    obj['ENDOLK'] = ENDOLK['$t'] != undefined ? ENDOLK['$t'] : '';
                    obj['NLXSTNTS'] = NLXSTNTS['$t'] != undefined ? NLXSTNTS['$t'] : '';
                    obj['PSPEC'] = PSPEC['$t'] != undefined ? PSPEC['$t'] : ''; 

                    obj['RATM'] = RATM['$t'] != undefined ? RATM['$t'] : ''; 
                    obj['OCC3'] = OCC3['$t'] != undefined ? OCC3['$t'] : ''; 
                    obj['OCC2'] = OCC2['$t'] != undefined ? OCC2['$t'] : ''; 
                    obj['SMATM'] = SMATM['$t'] != undefined ? SMATM['$t'] : ''; 
                    obj['CHIMNYN'] = CHIMNYN['$t'] != undefined ? CHIMNYN['$t'] : ''; 
                    
                    obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t']; 
    
                    let child = IDXPFinalobj[subid['$t']];
                    child.push(obj);
                    IDXPFinalobj[subid['$t']] = child;
    
                }else{
    
                    let child = [];
                    let obj = {};
    
                    obj['visname'] =='';
                    obj['subid'] = subid['$t'];
                    obj['subnum'] = subnum['$t'];
                    obj['visitid'] = visitid['$t'];
                    obj['visitseq'] = visitseq['$t'];
                    obj['pageid'] = pageid['$t'];
                    obj['pageseq'] = pageseq['$t'];
    
                    obj['trtdt'] = trtdt['$t'] != undefined ? trtdt['$t'] : '';
                    obj['complete'] = complete['$t'] != undefined ? complete['$t'] : '';
                    obj['typ1a'] = typ1a['$t'] != undefined ? typ1a['$t'] : '';
                    obj['typu'] = typu['$t'] != undefined ? typu['$t'] : '';
                    obj['typucomm'] = typucomm['$t'] != undefined ? typucomm['$t'] : '';
                    obj['any2ndrypx'] = any2ndrypx['$t'] != undefined ? any2ndrypx['$t'] : '';
                    obj['pconproc'] = pconproc['$t'] != undefined ? pconproc['$t'] : '';
                    obj['reinnar'] = reinnar['$t'] != undefined ? reinnar['$t'] : '';
                    obj['idxposyn'] = idxposyn['$t'] != undefined ? idxposyn['$t'] : '';

                    obj['STATUSID'] = STATUSID['$t'] != undefined ? STATUSID['$t'] : '';
                    obj['PHYS'] = PHYS['$t'] != undefined ? PHYS['$t'] : '';
                    obj['APHYS'] = APHYS['$t'] != undefined ? APHYS['$t'] : '';
                    obj['ANESTH'] = ANESTH['$t'] != undefined ? ANESTH['$t'] : '';
                    obj['ACCTYP'] = ACCTYP['$t'] != undefined ? ACCTYP['$t'] : '';
                    obj['AAASYN'] = AAASYN['$t'] != undefined ? AAASYN['$t'] : '';
                    obj['PREFILL'] = PREFILL['$t'] != undefined ? PREFILL['$t'] : '';
                    obj['PREFILV'] = PREFILV['$t'] != undefined ? PREFILV['$t'] : '';
                    obj['PFILLPR'] = PFILLPR['$t'] != undefined ? PFILLPR['$t'] : '';
                    obj['FILLPR'] = FILLPR['$t'] != undefined ? FILLPR['$t'] : '';
                    obj['OC1'] = OC1['$t'] != undefined ? OC1['$t'] : '';
                    obj['OC2'] = OC2['$t'] != undefined ? OC2['$t'] : '';
                    obj['OC3'] = OC3['$t'] != undefined ? OC3['$t'] : '';
                    obj['OC4'] = OC4['$t'] != undefined ? OC4['$t'] : '';
                    obj['REINPXTM'] = REINPXTM['$t'] != undefined ? REINPXTM['$t'] : '';
                    obj['ANESTM'] = ANESTM['$t'] != undefined ? ANESTM['$t'] : '';
                    obj['CONVOL'] = CONVOL['$t'] != undefined ? CONVOL['$t'] : '';
                    obj['BLLOSS'] = BLLOSS['$t'] != undefined ? BLLOSS['$t'] : '';
                    obj['FLUOTM'] = FLUOTM['$t'] != undefined ? FLUOTM['$t'] : '';
                    obj['TRANSFU'] = TRANSFU['$t'] != undefined ? TRANSFU['$t'] : '';
                    obj['ARTREP'] = ARTREP['$t'] != undefined ? ARTREP['$t'] : '';
                    obj['ENDOLK'] = ENDOLK['$t'] != undefined ? ENDOLK['$t'] : '';
                    obj['NLXSTNTS'] = NLXSTNTS['$t'] != undefined ? NLXSTNTS['$t'] : '';
                    obj['PSPEC'] = PSPEC['$t'] != undefined ? PSPEC['$t'] : '';

                    obj['RATM'] = RATM['$t'] != undefined ? RATM['$t'] : ''; 
                    obj['OCC3'] = OCC3['$t'] != undefined ? OCC3['$t'] : ''; 
                    obj['OCC2'] = OCC2['$t'] != undefined ? OCC2['$t'] : ''; 
                    obj['SMATM'] = SMATM['$t'] != undefined ? SMATM['$t'] : ''; 
                    obj['CHIMNYN'] = CHIMNYN['$t'] != undefined ? CHIMNYN['$t'] : ''; 

                    obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t']; 
    
                    child.push(obj);
                    IDXPFinalobj[subid['$t']] = child;
                    IDXPChildArray.push(subid['$t']); 
    
                }
            }

            finalobj['status']='success';
            finalobj['result']= IDXPFinalobj;
            resolve(finalobj);

        }catch(err){
            console.log('eror::',err);
        
            finalobj['status']='error';
            finalobj['result']= err;
            reject(finalobj);
        }

            
    })
};

const IBM_parseIDXHData = (finalJSON)=>{

    let finalobj={};
    let IDXHFinalobj ={};
    return new Promise((resolve,reject)=>
    {
            
        try{

            let IDXHChildArray = []; 

            for (let x=0 ;x<finalJSON.length ;x++) {
                //console.log( "x : ", finalJSON[x]);
                
                let subid = finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBID'));
                let subnum =  finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBNUM'));
                let visitid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITID')); 
                let visitseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITSEQ')); 
                let pageid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGEID')); 
                let pageseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGESEQ'));
                let idxendt =  finalJSON[x]['value'].find(x=> (x['colname'] == 'IDXENDT'));  
                let idxstdt =  finalJSON[x]['value'].find(x=> (x['colname'] == 'IDXSTDT')); 
                
                if(IDXHChildArray.includes(subid['$t'])){
    
                    let obj = {};
    
                    obj['visname'] = '';
                    obj['subid'] = subid['$t'];
                    obj['subnum'] =subnum['$t'];
                    obj['visitid'] = visitid['$t'];
                    obj['visitseq'] = visitseq['$t'];
                    obj['pageid'] = pageid['$t'];
                    obj['pageseq'] = pageseq['$t'];
    
                    obj['idxendt'] = idxendt['$t'] != undefined ? idxendt['$t'] : ''; 
                    obj['idxstdt'] = idxstdt['$t'] != undefined ? idxstdt['$t'] : ''; 
                    obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t']; 
    
                    let child = IDXHFinalobj[subid['$t']];
                    child.push(obj);
                    IDXHFinalobj[subid['$t']] = child;
    
                }else{
    
                    let child = [];
                    let obj = {};
    
                    obj['visname'] = '';
                    obj['subid'] = subid['$t'];
                    obj['subnum'] =subnum['$t'];
                    obj['visitid'] = visitid['$t'];
                    obj['visitseq'] = visitseq['$t'];
                    obj['pageid'] = pageid['$t'];
                    obj['pageseq'] = pageseq['$t'];
    
                    obj['idxendt'] = idxendt['$t'] != undefined ? idxendt['$t'] : ''; 
                    obj['idxstdt'] = idxstdt['$t'] != undefined ? idxstdt['$t'] : ''; 
                    obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t']; 
                    
                    child.push(obj);
                    IDXHFinalobj[subid['$t']] = child;
                    IDXHChildArray.push(subid['$t']); 
    
                }
            
            }

            
            finalobj['status']='success';
            finalobj['result']= IDXHFinalobj;
            resolve(finalobj);

        }catch(err){
            console.log('eror::',err);
        
            finalobj['status']='error';
            finalobj['result']= err;
            reject(finalobj);
        }

            
    })
};

const IBM_parseEXITData = (finalJSON)=>{

    let finalobj={};
    let EXITFinalobj ={};
    return new Promise((resolve,reject)=>
    {
            
        try{

            let EXITChildArray = [];

            for (let x=0 ;x<=finalJSON.length ;x++) {
                //console.log( "x : ", finalJSON[x]);
                if(finalJSON[x] != undefined ) {
    
                    let subid = finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBID'));
                    let subnum =  finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBNUM'));
                    let visitid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITID')); 
                    let visitseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITSEQ')); 
                    let pageid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGEID')); 
                    let pageseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGESEQ'));
                    let exitdt =  finalJSON[x]['value'].find(x=> (x['colname'] == 'EXITDT'));  
                    let exitrs =  finalJSON[x]['value'].find(x=> (x['colname'] == 'EXITRS')); 
                    let reldaen =  finalJSON[x]['value'].find(x=> (x['colname'] == 'RELDAEN'));  
                    let exitrssp =  finalJSON[x]['value'].find(x=> (x['colname'] == 'EXITRSSP'));  
                    let exitrsot =  finalJSON[x]['value'].find(x=> (x['colname'] == 'EXITRSOT'));   
                    let pxnar =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PXNAR'));  
                    let exitptrsn =  finalJSON[x]['value'].find(x=> (x['colname'] == 'EXITPTRSN'));  
                    let statusid = finalJSON[x]['value'].find(x=> (x['colname'] == 'STATUSID'));  

                    if(EXITChildArray.includes(subid['$t'])){
    
                        let obj = {};
    
                        obj['visname'] = '';
                        obj['subid'] = subid['$t'];
                        obj['subnum'] =subnum['$t'];
                        obj['visitid'] = visitid['$t'];
                        obj['visitseq'] = visitseq['$t'];
                        obj['pageid'] = pageid['$t'];
                        obj['pageseq'] = pageseq['$t'];
    
                        obj['exitdt'] = exitdt['$t'] != undefined ? exitdt['$t'] : '';
                        obj['exitrs'] = exitrs['$t'] != undefined ? exitrs['$t'] : '';
                        obj['exitptrsn'] = exitptrsn['$t'] != undefined ? exitptrsn['$t'] : '';
                        obj['reldaen'] = reldaen['$t'] != undefined ? reldaen['$t'] : '';
                        obj['exitrssp'] = exitrssp['$t'] != undefined ? exitrssp['$t'] : '';
                        obj['exitrsot'] = exitrsot['$t'] != undefined ? exitrsot['$t'] : '';
                        obj['pxnar'] = pxnar['$t'] != undefined ? pxnar['$t'] : '';
                        obj['statusid'] = statusid['$t'] != undefined ? statusid['$t'] : '';
                        obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t']; 

    
                        let child = EXITFinalobj[subid['$t']];
                        child.push(obj);
                        EXITFinalobj[subid['$t']] = child;
    
                    }else{
    
                        let child = [];
                        let obj = {};
    
                        obj['visname'] = '';
                        obj['subid'] = subid['$t'];
                        obj['subnum'] =subnum['$t'];
                        obj['visitid'] = visitid['$t'];
                        obj['visitseq'] = visitseq['$t'];
                        obj['pageid'] = pageid['$t'];
                        obj['pageseq'] = pageseq['$t'];
    
                        obj['exitdt'] = exitdt['$t'] != undefined ? exitdt['$t'] : '';
                        obj['exitrs'] = exitrs['$t'] != undefined ? exitrs['$t'] : '';
                        obj['exitptrsn'] = exitptrsn['$t'] != undefined ? exitptrsn['$t'] : '';
                        obj['reldaen'] = reldaen['$t'] != undefined ? reldaen['$t'] : '';
                        obj['exitrssp'] = exitrssp['$t'] != undefined ? exitrssp['$t'] : '';
                        obj['exitrsot'] = exitrsot['$t'] != undefined ? exitrsot['$t'] : '';
                        obj['pxnar'] = pxnar['$t'] != undefined ? pxnar['$t'] : '';
                        obj['statusid'] = statusid['$t'] != undefined ? statusid['$t'] : '';
                        obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t']; 
                        
                        child.push(obj);
                        EXITFinalobj[subid['$t']] = child;
                        EXITChildArray.push(subid['$t']); 
                    }
                }
    
            }

            
            finalobj['status']='success';
            finalobj['result']= EXITFinalobj;
            resolve(finalobj);

        }catch(err){
            console.log('eror::',err);
        
            finalobj['status']='error';
            finalobj['result']= err;
            reject(finalobj);
        }

            
    })
};

const IBM_parseDEATHData = (finalJSON)=>{

    let finalobj={};
    let DEATHFinalobj ={};
    return new Promise((resolve,reject)=>
    {
        try{

            let DEATHChildArray = [];

            for (let x=0 ;x<finalJSON.length ;x++) {
                //console.log( "x : ", finalJSON[x]);
            
                let subid = finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBID'));
                let subnum =  finalJSON[x]['value'].find(x=> (x['colname'] == 'SUBNUM'));
                let visitid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITID')); 
                let visitseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'VISITSEQ')); 
                let pageid =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGEID')); 
                let pageseq =  finalJSON[x]['value'].find(x=> (x['colname'] == 'PAGESEQ'));
    
                let lost2fu =  finalJSON[x]['value'].find(x=> (x['colname'] == 'LOST2FU'));  
                let wrtncorsnt =  finalJSON[x]['value'].find(x=> (x['colname'] == 'WRTNCORSNT'));  
                
                let dthcs =  finalJSON[x]['value'].find(x=> (x['colname'] == 'DTHCS'));  
                let explant =  finalJSON[x]['value'].find(x=> (x['colname'] == 'EXPLANT'));  
                let explantots =  finalJSON[x]['value'].find(x=> (x['colname'] == 'EXPLANTOTS'));  
    
                if(DEATHChildArray.includes(subid['$t'])){
    
                    let obj = {};
    
                    obj['visname'] = '';
                    obj['subid'] = subid['$t'];
                    obj['subnum'] =subnum['$t'];
                    obj['visitid'] = visitid['$t'];
                    obj['visitseq'] = visitseq['$t'];
                    obj['pageid'] = pageid['$t'];
                    obj['pageseq'] = pageseq['$t'];
    
                    obj['lost2fu'] = lost2fu['$t'] != undefined ? lost2fu['$t'] : '';
                    obj['wrtncorsnt'] = wrtncorsnt['$t'] != undefined ? wrtncorsnt['$t'] : '';
                    obj['dthcs'] = dthcs['$t'] != undefined ? dthcs['$t'] : '';
                    obj['explant'] = explant['$t'] != undefined ? explant['$t'] : '';
                    obj['explantots'] = explantots['$t'] != undefined ? explantots['$t'] : '';
                    obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t']; 
    
                    let child = DEATHFinalobj[subid['$t']];
                    child.push(obj);
                    DEATHFinalobj[subid['$t']] = child;
    
                }else{
    
                    let child = [];
                    let obj = {};
    
                    obj['visname'] = '';
                    obj['subid'] = subid['$t'];
                    obj['subnum'] =subnum['$t'];
                    obj['visitid'] = visitid['$t']; 
                    obj['visitseq'] = visitseq['$t'];
                    obj['pageid'] = pageid['$t'];
                    obj['pageseq'] = pageseq['$t'];
    
                    obj['lost2fu'] = lost2fu['$t'] != undefined ? lost2fu['$t'] : '';
                    obj['wrtncorsnt'] = wrtncorsnt['$t'] != undefined ? wrtncorsnt['$t'] : '';
                    obj['dthcs'] = dthcs['$t'] != undefined ? dthcs['$t'] : '';
                    obj['explant'] = explant['$t'] != undefined ? explant['$t'] : '';
                    obj['explantots'] = explantots['$t'] != undefined ? explantots['$t'] : '';
                    obj['externalid'] = subnum['$t'] +'_'+visitid['$t']+'_'+pageid['$t']; 
    
                    child.push(obj);
                    DEATHFinalobj[subid['$t']] = child;
                    DEATHChildArray.push(subid['$t']); 
                }
    
            }

            finalobj['status']='success';
            finalobj['result']= DEATHFinalobj;
            resolve(finalobj);

        }catch(err){
            console.log('eror::',err);
        
            finalobj['status']='error';
            finalobj['result']= err;
            reject(finalobj);
        }

            
    })
};

// END....

// Mapping and Merging table data 
// START....

const IBM_Codelist_SV = (sfdc,Picklist_Field_APIs,sfdc_Pickl_Val,sfdc_Obj_Name) =>
{

    let final_Codelist_Obj={};
    let IBM_Codelist_Obj={};

    return new Promise((resolve,reject)=>
    {   
        try{

            /*console.log('Picklist_Field_APIs : ' , Picklist_Field_APIs.length);  
            console.log('sfdc_Obj_Name : ' , sfdc_Obj_Name);  
            console.log('sfdc_Pickl_Val : ' , sfdc_Pickl_Val);  */
            
            sfdc.con.sobject(sfdc_Obj_Name)
            .find([{ Object_Name__c : sfdc_Pickl_Val }],Picklist_Field_APIs,null) 
            .execute(function (error, sfdc_CodeList_Results) { 
                    
                //console.log('sfdc_CodeList_Results : ' , sfdc_CodeList_Results);

                if(sfdc_CodeList_Results.length > 0){
                    for(let i=0;i<sfdc_CodeList_Results.length;i++){

                        let ibm_SFDC_Object_Fields = Object.keys(sfdc_CodeList_Results[i]);
                        
                        //console.log('All  : ' , ibm_SFDC_Object_Fields);

                        for(let j=0; j< ibm_SFDC_Object_Fields.length; j++){
                            
                            //console.log('J : ' , ibm_SFDC_Object_Fields[j]); 
                            if(ibm_SFDC_Object_Fields[j] != 'attributes' && ibm_SFDC_Object_Fields[j] != 'Object_Name__c'){
                                
                                let code_key =ibm_SFDC_Object_Fields[j];
                                let code_list = ibmCodelistConverter(sfdc_CodeList_Results[i][code_key].split('___'));
                                //console.log('code_list : ' , code_list);
                                IBM_Codelist_Obj[code_key] = code_list;
                                
                            }

                        }
                    }

                    //console.log('IBM_Codelist_Obj :' , IBM_Codelist_Obj);
                    final_Codelist_Obj['status']='success';
                    final_Codelist_Obj['result']= IBM_Codelist_Obj;
                    resolve(final_Codelist_Obj);
                
                }
                if(error){
                    console.log('error : ' , error);
                    final_Codelist_Obj['status']='error';
                    final_Codelist_Obj['result']= error;
                    reject(final_Codelist_Obj);
                }
                
            });

        }catch(error){

            console.log('eror::',error);
        
            final_Codelist_Obj['status']='error';
            final_Codelist_Obj['result']= error;
            reject(final_Codelist_Obj);

        }
    });

}

function SFDC_Codelist_Mapping_SV(value,sfdc_field,sfdc_IBM_Codelist){
    let val =value;
    //console.log(sfdc_field , sfdc_IBM_Codelist[sfdc_field]);
    if( val!= undefined){

        let final_val = sfdc_IBM_Codelist[sfdc_field][val];
        return final_val != undefined ? final_val : '';
    }
}

const SubjectVisitScreening =(SCRCTFinalobj , CTFinalobj , ELIGFinalData , CASEREVFinalData,IBM_Codlist_SV_Data) => 
{
    let FinalScreeningData = {};

    for(let j=0; j<= Object.keys(SCRCTFinalobj).length;j++){

        let key = Object.keys(SCRCTFinalobj)[j];

        if (SCRCTFinalobj.hasOwnProperty(key) || CTFinalobj.hasOwnProperty(key) || ELIGFinalData.hasOwnProperty(key) || CASEREVFinalData.hasOwnProperty(key)) {

            let CTrecords = CTFinalobj[key];
            let SCRCTrecords = SCRCTFinalobj[key];
            let ELIGrecords =  ELIGFinalData[key];
            let CASEREVrecords = CASEREVFinalData[key];

            let visitIdArry = ['10'];

            for(let k =0;k <= visitIdArry.length;k++){

                if(visitIdArry[k] != undefined){

                    let CTfilters = CTrecords != undefined ? CTrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let SCRCTfilters = SCRCTrecords != undefined ? SCRCTrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let ELIGfilters = ELIGrecords != undefined ? ELIGrecords.filter(x=> (x.visitid == visitIdArry[k] )) : [];
                    let CASEREVfilters = CASEREVrecords != undefined ? CASEREVrecords.filter(x=> (x.visitid == visitIdArry[k] )) : [];

                    //console.log('FUfilters : ', FUfilters.length);
                    //console.log('CTfilters : ', CTfilters.length);
                    //console.log('IDXHfilters : ', IDXHfilters.length);

                    // CT
                    let mapData ={};
                    for(let CTTable of CTfilters){

                        let obj ={};
                        let mpKey;
                    
                        obj['External_Id__c'] = CTTable['subid']+'_'+CTTable['visitid']+'_'+CTTable['visitseq'];

                        if(CTTable['pageid'] == '10'){
                            
                            obj['CT_Date__c'] = CTTable['ctdt'];
                            obj['CT_Sent_Date__c'] = CTTable['imgsntdt'];

                        }
                        if(CTTable['pageid'] == '20'){

                            obj['CT_Date_Core_Lab__c'] = CTTable['ctdt'];
                            obj['CT_Page_Status__c'] =  CTTable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(CTTable['statusid'],'CT_Page_Status__c',IBM_Codlist_SV_Data) : '';//P
                        }

                        if(CTTable['pageid'] == '10' || CTTable['pageid'] == '20'){

                            mpKey =CTTable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                //console.log('mergeObj : ' , mergeObj);
                                mapData[mpKey] = mergeObj;

                            }else{

                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }

                        }

                    }

                    //SCRCT
                
                    for(let SCRCTTable of SCRCTfilters){
                        let obj ={};
                        let mpKey;
                    
                        obj['External_Id__c'] = SCRCTTable['subid']+'_'+SCRCTTable['visitid']+'_'+SCRCTTable['visitseq'];

                        //scrrev eligrev statusid
                        if(SCRCTTable['pageid'] == '20'){
                            obj['Check_this_box_if_Re_evaluated__c'] = SCRCTTable['scrrev'] != undefined ? SCRCTTable['scrrev'] == 'X' ? true  : false : false;//C
                            obj['Eligibility_based_on_re_evaluation__c'] = SCRCTTable['eligrev'] != undefined && SCRCTTable['eligrev'] != '' ? SFDC_Codelist_Mapping_SV(SCRCTTable['eligrev'],'Eligibility_based_on_re_evaluation__c',IBM_Codlist_SV_Data) : '';//P 

                            //obj['CTMS__Visit_Name__c'] = SCRCTTable['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(SCRCTTable['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 
                        }

                        if(SCRCTTable['pageid'] == '190'){

                            obj['IG_Check_this_box_if_Re_evaluated__c'] =  SCRCTTable['scrrev'] != undefined ? SCRCTTable['scrrev'] == 'X' ? true  : false : false;//C SCRCTTable['scrrev']; //C
                            obj['IG_Eligibility_based_on_re_evaluation__c'] = SCRCTTable['eligrev'] != undefined && SCRCTTable['eligrev'] != '' ? SFDC_Codelist_Mapping_SV(SCRCTTable['eligrev'],'IG_Eligibility_based_on_re_evaluation__c',IBM_Codlist_SV_Data) : ''; //P

                        }

                            mpKey = SCRCTTable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                            
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }
                        
                    }
                    //console.log('key :', key);
                    //console.log('mapData :', mapData);

                    //ELIG
                
                    for(let elig of ELIGfilters){

                        let obj ={};
                        let mpKey;
                    
                        obj['External_Id__c'] = elig['subid']+'_'+elig['visitid']+'_'+elig['visitseq'];

                        if(elig['pageid'] == '10'){

            
                            obj['PI_Assessed_Eligibility__c'] = elig['pielig'] != undefined ? SFDC_Codelist_Mapping_SV(elig['pielig'],'PI_Assessed_Eligibility__c',IBM_Codlist_SV_Data) : ''; //P
                            obj['CTMS__Comments__c'] = elig['picomm'];
                            obj['Visit_Page_Status__c'] = elig['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(elig['statusid'],'Visit_Page_Status__c',IBM_Codlist_SV_Data) : ''; //P
                            obj['CTMS__Visit_Name__c'] = elig['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(elig['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 
                            mpKey = elig['visitid'];
    
                        }
                        //statusid pielig picomm ctelig

                        if(elig['pageid'] == '20'){
    
                            obj['CT_Core_Lab_Assessed_Eligibility__c'] = elig['ctelig'] != undefined ? SFDC_Codelist_Mapping_SV(elig['ctelig'],'CT_Core_Lab_Assessed_Eligibility__c',IBM_Codlist_SV_Data) : ''; //P
                            
                            mpKey = elig['visitid'];
    
                        }
    
                        if(elig['pageid'] == '40'){
    
                            obj['Is_the_subject_eligible_for_enrollment__c'] = elig['elig'] != undefined ? SFDC_Codelist_Mapping_SV(elig['elig'],'Is_the_subject_eligible_for_enrollment__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Male_or_female_at_least_18_years_old__c'] = elig['crbine1'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine1'],'Male_or_female_at_least_18_years_old__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Informed_consent_form_understood__c'] = elig['crbine2'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine2'],'Informed_consent_form_understood__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Patient_agrees_to_all_follow_up_visits__c'] = elig['crbine3'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine3'],'Patient_agrees_to_all_follow_up_visits__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Abdominal_aortic_aneurysm__c'] = elig['crbine4'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine4'],'Abdominal_aortic_aneurysm__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Adequate_iliac_femoral_access__c']= elig['crbine5'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine5'],'Adequate_iliac_femoral_access__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Aneurysm_blood_lumen_diameter_60mm__c'] = elig['crbine6'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine6'],'Aneurysm_blood_lumen_diameter_60mm__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Proximal_non_aneurysmal_aortic_neck__c'] = elig['crbine7'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine7'],'Proximal_non_aneurysmal_aortic_neck__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Most_caudal_renal_artery__c'] = elig['crbine8'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine8'],'Most_caudal_renal_artery__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Common_iliac_artery_lumen_diameter__c'] = elig['crbine9'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine9'],'Common_iliac_artery_lumen_diameter__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Distal_iliac_artery_seal_zone__c'] = elig['crbine10'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine10'],'Distal_iliac_artery_seal_zone__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Ability_to_preserve_hypogastric_artery__c'] = elig['crbine11'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine11'],'Ability_to_preserve_hypogastric_artery__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Ratio_of_maximum_aortic_aneurysm__c'] = elig['crbine12'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine12'],'Ratio_of_maximum_aortic_aneurysm__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Life_expectancy_judged_by_Investigator__c'] = elig['crbine13'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine13'],'Life_expectancy_judged_by_Investigator__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Psychiatric_or_other_condition__c'] = elig['crbine14'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine14'],'Psychiatric_or_other_condition__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Participating_in_another_clinical_study__c'] = elig['crbine15'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine15'],'Participating_in_another_clinical_study__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Known_allergy_or_contraindication__c'] = elig['crbine16'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine16'],'Known_allergy_or_contraindication__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Coagulopathy_or_uncontrolled_bleeding__c'] = elig['crbine17'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine17'],'Coagulopathy_or_uncontrolled_bleeding__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Ruptured_leaking__c'] = elig['crbine18'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine18'],'Ruptured_leaking__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Serum_creatinine_S_Cr_level_2_0_mg_dL__c'] = elig['crbine19'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine19'],'Serum_creatinine_S_Cr_level_2_0_mg_dL__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['CVA__c'] = elig['crbine20'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine20'],'CVA__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Aneurysmal_disease_of_thoracic_aorta__c'] = elig['crbine21'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine21'],'Aneurysmal_disease_of_thoracic_aorta__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Clinically_significant_mural_thrombus__c'] = elig['crbine22'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine22'],'Clinically_significant_mural_thrombus__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Connective_tissue_diseases__c'] = elig['crbine23'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine23'],'Connective_tissue_diseases__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Unsuitable_vascular_anatomy__c'] = elig['crbine24'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine24'],'Unsuitable_vascular_anatomy__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Pregnant__c']= elig['crbine25'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine25'],'Pregnant__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['PI_withdrew_subject_from_study__c'] = elig['crbine26'] != undefined ? SFDC_Codelist_Mapping_SV(elig['crbine26'],'PI_withdrew_subject_from_study__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['General_Comments__c'] = elig['com'];
                            
                            mpKey = elig['visitid'];
    
                        }
                
                        if(elig['pageid'] == '190'){
                    
                            obj['IG_CT_Core_Lab_Assessed_Eligibility__c'] = elig['ctelig'] != undefined ? SFDC_Codelist_Mapping_SV(elig['ctelig'],'IG_CT_Core_Lab_Assessed_Eligibility__c',IBM_Codlist_SV_Data) : ''; //P 

                            mpKey = elig['visitid'];
                        }

                        if(mapData.hasOwnProperty(mpKey)){

                            let mergeObj = {...mapData[mpKey],...obj};
                            mapData[mpKey] = mergeObj;
                            
                        }else{
                            if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                mapData[mpKey] = obj;
                            }
                            
                        }
                    
                    }
                    
                    //CASEREV
                    
                    for(let caserev of CASEREVfilters){

                        let obj ={};
                        let mpKey;

                        /*obj['Visit_Id__c'] = caserev['visitid'];
                        obj['Visit_Seq__c'] = caserev['visitseq'];
                        obj['Pageid__c'] = caserev['pageid'];
                        obj['Page_Seq__c'] = caserev['pageseq'];*/
                        
                        obj['External_Id__c'] = caserev['subid']+'_'+caserev['visitid']+'_'+caserev['visitseq'];

                        if(caserev['pageid'] == '180'){

                            obj['Name_of_proctor__c'] = caserev['proctrname'];
                            obj['CRB_Determination__c'] = caserev['crbelig'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['crbelig'],'CRB_Determination__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Neck__c'] = caserev['neckyn'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['neckyn'],'Neck__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Neck_angulation__c'] = caserev['neckrsn1'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['neckrsn1'],'Neck_angulation__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Insufficient_landing_zone_10mm__c'] = caserev['neckrsn2'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['neckrsn2'],'Insufficient_landing_zone_10mm__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Irregular_or_excessive_thrombus__c'] = caserev['neckrsn3'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['neckrsn3'],'Irregular_or_excessive_thrombus__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Unhealthy_aorta_proximal__c'] = caserev['neckrsn4'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['neckrsn4'],'Unhealthy_aorta_proximal__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Existing_Anatomical_Dissection__c'] = caserev['neckrsn5'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['neckrsn5'],'Existing_Anatomical_Dissection__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Excessive_Calcification__c'] = caserev['neckrsn6'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['neckrsn6'],'Excessive_Calcification__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Narrowing_in_Neck_Distal__c'] = caserev['neckrsn7'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['neckrsn7'],'Narrowing_in_Neck_Distal__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Occlusion_of_Arteries__c'] = caserev['neckrsn8'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['neckrsn8'],'Occlusion_of_Arteries__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Suprarenal_Neck_Diameter_18mm__c'] = caserev['neckrsn9'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['neckrsn9'],'Suprarenal_Neck_Diameter_18mm__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Aneurysm__c'] = caserev['anrysmyn'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['anrysmyn'],'Aneurysm__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Irregular_flow_lumen__c'] = caserev['anrysmrsn'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['anrysmrsn'],'Irregular_flow_lumen__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Iliacs_Aortoiliac__c'] =  caserev['ilaiyn'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['ilaiyn'],'Iliacs_Aortoiliac__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Insufficient_Distal_Landing_Zone__c'] = caserev['ilairsn1'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['ilairsn1'],'Insufficient_Distal_Landing_Zone__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Narrow_aortoiliac_bifurcation__c'] = caserev['ilairsn2'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['ilairsn2'],'Narrow_aortoiliac_bifurcation__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Narrowing_in_iliacs__c'] = caserev['ilairsn3'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['ilairsn3'],'Narrowing_in_iliacs__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Access__c'] = caserev['accsyn'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['accsyn'],'Access__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Excessive_Calcifications__c'] = caserev['accsrsn1'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['accsrsn1'],'Excessive_Calcifications__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Potential_dislodgement_of_existing_stent__c'] = caserev['accsrsn2'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['accsrsn2'],'Potential_dislodgement_of_existing_stent__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Excessive_iliac_tortuosity__c'] = caserev['accsrsn3'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['accsrsn3'],'Excessive_iliac_tortuosity__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Other__c'] = caserev['neckotyn'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['neckotyn'],'Other__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Screening_other_specify__c'] = caserev['neclotsp'];

                            obj['Conditionally_Approved_Left__c'] = caserev['larmbcyn'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['larmbcyn'],'Conditionally_Approved_Left__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Conditionally_Approved_Right__c'] = caserev['rarmbcyn'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['rarmbcyn'],'Conditionally_Approved_Right__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Conditionally_Approved_Bilateral__c'] = caserev['biarmbcyn'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['biarmbcyn'],'Conditionally_Approved_Bilateral__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Common_Iliac_Artery__c'] = caserev['ciadilgt9yn'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['ciadilgt9yn'],'Common_Iliac_Artery__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Left_Internal_Iliac_Artery__c'] = caserev['liiarhypmbcyn'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['liiarhypmbcyn'],'Left_Internal_Iliac_Artery__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['right_internal_iliac_artery__c'] = caserev['riiarhypmbcyn'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['riiarhypmbcyn'],'right_internal_iliac_artery__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Conditionally_approved_Other__c'] = caserev['cdnotyn'] != undefined ? SFDC_Codelist_Mapping_SV(caserev['cdnotyn'],'Conditionally_approved_Other__c',IBM_Codlist_SV_Data) : ''; //P

                            obj['Conditionally_approved_Other_Specify__c'] = caserev['cdnotsp'];

                            mpKey = caserev['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                                
                            }
                        }

                    }

                    let ctVisitSeqArry=[];
                    //console.log('mapData : ' , mapData);
                    for(cz=0;cz<= Object.keys(mapData).length;cz++){
                        let key =  Object.keys(mapData)[cz];
                        let uz =  mapData[key];
                        //console.log('mapData : ' , uz);
                        if(uz != undefined){
                            ctVisitSeqArry.push(uz);
                        }
                        
                    }

                    if(ctVisitSeqArry.length>0){

                        if(FinalScreeningData.hasOwnProperty(key)){
                            
                            let child = FinalScreeningData[key];
                            child.push(...ctVisitSeqArry); 
                            FinalScreeningData[key] = child; 
    
                        }else{
                            let child = [];
                            child.push(...ctVisitSeqArry); 
                            //console.log('child : ' , child)
                            FinalScreeningData[key] = child;  
                            
                        }
                    }
                }
            }
        }
    }
   // console.log('FinalScreeningData : ' , FinalScreeningData['693930'] ); 
    return FinalScreeningData;


};

const SubjectVisit30Days =(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data) => 
{

    let Final30DaysData = {};

    for(let j=0; j<= Object.keys(CTFinalobj).length;j++){

        let key = Object.keys(CTFinalobj)[j];

        if (key != undefined && (FUFinalData.hasOwnProperty(key) || CTFinalobj.hasOwnProperty(key))) {

            let Furecords = FUFinalData[key];
            let CTrecords = CTFinalobj[key];
        
            let visitIdArry = ['50'];
            for(let k =0;k <= visitIdArry.length;k++){

                if(visitIdArry[k] != undefined){

                    let CTfilters = CTrecords != undefined ? CTrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let FUfilters = Furecords != undefined ? Furecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    
                    //console.log('FUfilters : ', FUfilters.length);
                    //console.log('CTfilters : ', CTfilters.length);

                    // FU
                    let mapData ={};
                    for(let FUtable of FUfilters){

                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = FUtable['subid']+'_'+FUtable['visitid']+'_'+FUtable['visitseq'];

                        if(FUtable['pageid'] == '10'){
                            
                            obj['CTMS__Visit_Name__c'] = FUtable['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Visit_Page_Status__c'] = FUtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['statusid'],'Visit_Page_Status__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['Visit_Performed__c'] = FUtable['fuperf'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['fuperf'],'Visit_Performed__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['CTMS__Visit_Date__c'] = FUtable['fudt'];
                            obj['CTMS__Visit_Type__c'] = FUtable['visitty'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitty'],'Visit_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            mpKey =FUtable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }

                        }

                    }

                    //CT 
                
                    for(let CTtable of CTfilters){
                        let obj ={};
                        let mpKey;

                        //console.log('CTtable Page Id :=:  ' ,CTtable['pageid']);
                        obj['External_Id__c'] = CTtable['subid']+'_'+CTtable['visitid']+'_'+CTtable['visitseq'];

                        if(CTtable['pageid'] == '10'){
                            
                            obj['CT_Date__c'] = CTtable['ctdt'];
                            obj['CT_Sent_Date__c'] = CTtable['imgsntdt'];

                            obj['Imaging_Type__c'] = CTtable['fuctty'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['fuctty'],'Imaging_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak_10__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable_10__c'] = CTtable['endolkrs'];

                            obj['Type_IA_10__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R_10__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L_10__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar_10__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA_10__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana_10__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R_10__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L_10__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R_10__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L_10__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R_10__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L_10__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm_10__c'] = CTtable['msacd'];

                            obj['Evidence_of_index_Stent_Graft_Migration__c'] = CTtable['migrat'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrat'],'Evidence_of_index_Stent_Graft_Migration__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Right__c'] = CTtable['migrr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrr'],'Right__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction__c'] = CTtable['mrdir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mrdir'],'Direction__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm__c'] = CTtable['mrdist'];

                            obj['Left__c'] = CTtable['migrl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrl'],'Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction_Left__c'] = CTtable['mldir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mldir'],'Direction_Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm_Left__c'] = CTtable['mldist']; 
                            obj['CT_Comments_10__c'] = CTtable['migrcom'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '20'){

                            obj['CT_Date_Core_Lab__c'] = CTtable['ctdt'];

                            obj['CT_Page_Status__c'] = CTtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['statusid'],'CT_Page_Status__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable__c'] = CTtable['endolkrs'];

                            obj['Type_IA__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm__c'] = CTtable['msacd'];

                            obj['Right_Stent_migration__c'] = CTtable['rsm'];

                            obj['Left_Stent_migration__c'] = CTtable['lsm'];
                            obj['CT_Comments__c'] = CTtable['ftfucomm'];

                            obj['Stent_Graft_Stenosis__c'] = CTtable['stenos'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['stenos'],'Stent_Graft_Stenosis__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_R__c'] = CTtable['extthromr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthromr'],'Extent_of_thrombus_R__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_L__c'] = CTtable['extthroml'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthroml'],'Extent_of_thrombus_L__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Length_from_Distal_Renal_Artery__c'] = CTtable['len7'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '30'){
                        
                            obj['Date_CT_received_by_Corelab__c'] = CTtable['ctrecvdt'];
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '90'){
                        
                            obj['Type_IA_90__c'] = CTtable['typ1aot'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1aot'],'Type_IA_90__c',IBM_Codlist_SV_Data) : '';//P 
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '10' || CTtable['pageid'] == '20' || CTtable['pageid'] == '30' || CTtable['pageid'] == '90'){

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                            
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            
                            }
                        }   
                        
                    }

                    //console.log('mapData : ' , mapData);

                    let ctVisitSeqArry=[];
                    //console.log('mapData : ' , mapData);
                    for(cz=0;cz<= Object.keys(mapData).length;cz++){
                        let key =  Object.keys(mapData)[cz];
                        let uz =  mapData[key];
                        //console.log('mapData : ' , uz);
                        if(uz != undefined){
                            ctVisitSeqArry.push(uz);
                        }
                    }

                    if(ctVisitSeqArry.length>0){

                        if(Final30DaysData.hasOwnProperty(key)){
                            
                            let child = Final30DaysData[key];
                            child.push(...ctVisitSeqArry); 
                            Final30DaysData[key] = child; 
    
                        }else{
                            let child = [];
                            child.push(...ctVisitSeqArry); 
                            //console.log('child : ' , child)
                            Final30DaysData[key] = child;  
                            
                        }
                    }

                }
            }
        }
    }

    console.log('Final30DaysData : ' , Object.keys(Final30DaysData).length);
    return Final30DaysData;
    
};

const SubjectVisit6months =(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data) => 
{
    let Final6MonthsData = {};

    for(let j=0; j<= Object.keys(CTFinalobj).length;j++){

        let key = Object.keys(CTFinalobj)[j];

        if (key != undefined && (FUFinalData.hasOwnProperty(key) || CTFinalobj.hasOwnProperty(key))) {

            let Furecords = FUFinalData[key];
            let CTrecords = CTFinalobj[key];
        
            let visitIdArry = ['60'];
            for(let k =0;k <= visitIdArry.length;k++){

                if(visitIdArry[k] != undefined){

                    let CTfilters = CTrecords != undefined ? CTrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let FUfilters = Furecords != undefined ? Furecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    
                    //console.log('FUfilters : ', FUfilters.length);
                    //console.log('CTfilters : ', CTfilters.length);

                    // FU
                    let mapData ={};
                    for(let FUtable of FUfilters){

                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = FUtable['subid']+'_'+FUtable['visitid']+'_'+FUtable['visitseq'];
                        

                        if(FUtable['pageid'] == '10'){
                        
                            obj['CTMS__Visit_Name__c'] = FUtable['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Visit_Page_Status__c'] = FUtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['statusid'],'Visit_Page_Status__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['Visit_Performed__c'] = FUtable['fuperf'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['fuperf'],'Visit_Performed__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['CTMS__Visit_Date__c'] = FUtable['fudt'];
                            obj['CTMS__Visit_Type__c'] = FUtable['visitty'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitty'],'Visit_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            mpKey =FUtable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                //console.log('mergeObj : ' , mergeObj);
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }

                        }

                    }

                    //CT 

                    for(let CTtable of CTfilters){
                        let obj ={};
                        let mpKey;

                        //console.log('CTtable Page Id :=:  ' ,CTtable['pageid']);
                        obj['External_Id__c'] = CTtable['subid']+'_'+CTtable['visitid']+'_'+CTtable['visitseq'];

                        if(CTtable['pageid'] == '10'){
                            
                            obj['CT_Date__c'] = CTtable['ctdt'];
                            obj['CT_Sent_Date__c'] = CTtable['imgsntdt'];

                            obj['Imaging_Type__c'] = CTtable['fuctty'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['fuctty'],'Imaging_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak_10__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable_10__c'] = CTtable['endolkrs'];

                            obj['Type_IA_10__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R_10__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L_10__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar_10__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA_10__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana_10__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R_10__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L_10__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R_10__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L_10__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R_10__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L_10__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm_10__c'] = CTtable['msacd'];

                            obj['Evidence_of_index_Stent_Graft_Migration__c'] = CTtable['migrat'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrat'],'Evidence_of_index_Stent_Graft_Migration__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Right__c'] = CTtable['migrr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrr'],'Right__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction__c'] = CTtable['mrdir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mrdir'],'Direction__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm__c'] = CTtable['mrdist'];

                            obj['Left__c'] = CTtable['migrl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrl'],'Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction_Left__c'] = CTtable['mldir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mldir'],'Direction_Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm_Left__c'] = CTtable['mldist']; 
                            obj['CT_Comments_10__c'] = CTtable['migrcom'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '20'){

                            obj['CT_Date_Core_Lab__c'] = CTtable['ctdt'];

                            obj['CT_Page_Status__c'] = CTtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['statusid'],'CT_Page_Status__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable__c'] = CTtable['endolkrs'];

                            obj['Type_IA__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm__c'] = CTtable['msacd'];

                            obj['Right_Stent_migration__c'] = CTtable['rsm'];

                            obj['Left_Stent_migration__c'] = CTtable['lsm'];
                            obj['CT_Comments__c'] = CTtable['ftfucomm'];

                            obj['Stent_Graft_Stenosis__c'] = CTtable['stenos'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['stenos'],'Stent_Graft_Stenosis__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_R__c'] = CTtable['extthromr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthromr'],'Extent_of_thrombus_R__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_L__c'] = CTtable['extthroml'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthroml'],'Extent_of_thrombus_L__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Length_from_Distal_Renal_Artery__c'] = CTtable['len7'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '30'){
                        
                            obj['Date_CT_received_by_Corelab__c'] = CTtable['ctrecvdt'];
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '90'){
                        
                            obj['Type_IA_90__c'] = CTtable['typ1aot'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1aot'],'Type_IA_90__c',IBM_Codlist_SV_Data) : '';//P 
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '10' || CTtable['pageid'] == '20' || CTtable['pageid'] == '30' || CTtable['pageid'] == '90'){

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                            
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            
                            }
                        }   
                        
                    }

                    let ctVisitSeqArry=[];
                    //console.log('mapData : ' , mapData);
                    for(cz=0;cz<= Object.keys(mapData).length;cz++){
                        let key =  Object.keys(mapData)[cz];
                        let uz =  mapData[key];
                        //console.log('mapData : ' , uz);
                        if(uz != undefined){
                            ctVisitSeqArry.push(uz);
                        }
                    }

                    if(ctVisitSeqArry.length>0){

                        if(Final6MonthsData.hasOwnProperty(key)){
                            
                            let child = Final6MonthsData[key];
                            child.push(...ctVisitSeqArry); 
                            Final6MonthsData[key] = child; 
    
                        }else{
                            let child = [];
                            child.push(...ctVisitSeqArry); 
                            //console.log('child : ' , child)
                            Final6MonthsData[key] = child;  
                            
                        }
                    }

                }
            }
        }
    }

    console.log('Final6MonthsData : ' , Object.keys(Final6MonthsData).length);
    return Final6MonthsData;

};

const SubjectVisit1year =(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data) => 
{
    let Final1YearData = {};

    for(let j=0; j<= Object.keys(CTFinalobj).length;j++){

        let key = Object.keys(CTFinalobj)[j];

        if (key != undefined && (FUFinalData.hasOwnProperty(key) || CTFinalobj.hasOwnProperty(key))) {

            let Furecords = FUFinalData[key];
            let CTrecords = CTFinalobj[key];
        
            let visitIdArry = ['70'];
            for(let k =0;k <= visitIdArry.length;k++){

                if(visitIdArry[k] != undefined){

                    let CTfilters = CTrecords != undefined ? CTrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let FUfilters = Furecords != undefined ? Furecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    
                    //console.log('FUfilters : ', FUfilters.length);
                    //console.log('CTfilters : ', CTfilters.length);

                    // FU
                    let mapData ={};
                    for(let FUtable of FUfilters){

                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = FUtable['subid']+'_'+FUtable['visitid']+'_'+FUtable['visitseq'];

                        if(FUtable['pageid'] == '10'){
                            
                            obj['CTMS__Visit_Name__c'] = FUtable['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Visit_Page_Status__c'] = FUtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['statusid'],'Visit_Page_Status__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['Visit_Performed__c'] = FUtable['fuperf'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['fuperf'],'Visit_Performed__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['CTMS__Visit_Date__c'] = FUtable['fudt'];
                            obj['CTMS__Visit_Type__c'] = FUtable['visitty'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitty'],'Visit_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            mpKey =FUtable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }

                        }

                    }

                    //CT 
                
                    for(let CTtable of CTfilters){
                        let obj ={};
                        let mpKey;

                        //console.log('CTtable Page Id :=:  ' ,CTtable['pageid']);
                        obj['External_Id__c'] = CTtable['subid']+'_'+CTtable['visitid']+'_'+CTtable['visitseq'];

                        if(CTtable['pageid'] == '10'){
                            
                            obj['CT_Date__c'] = CTtable['ctdt'];
                            obj['CT_Sent_Date__c'] = CTtable['imgsntdt'];

                            obj['Imaging_Type__c'] = CTtable['fuctty'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['fuctty'],'Imaging_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak_10__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable_10__c'] = CTtable['endolkrs'];

                            obj['Type_IA_10__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R_10__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L_10__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar_10__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA_10__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana_10__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R_10__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L_10__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R_10__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L_10__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R_10__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L_10__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm_10__c'] = CTtable['msacd'];

                            obj['Evidence_of_index_Stent_Graft_Migration__c'] = CTtable['migrat'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrat'],'Evidence_of_index_Stent_Graft_Migration__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Right__c'] = CTtable['migrr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrr'],'Right__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction__c'] = CTtable['mrdir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mrdir'],'Direction__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm__c'] = CTtable['mrdist'];

                            obj['Left__c'] = CTtable['migrl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrl'],'Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction_Left__c'] = CTtable['mldir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mldir'],'Direction_Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm_Left__c'] = CTtable['mldist']; 
                            obj['CT_Comments_10__c'] = CTtable['migrcom'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '20'){

                            obj['CT_Date_Core_Lab__c'] = CTtable['ctdt'];

                            obj['CT_Page_Status__c'] = CTtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['statusid'],'CT_Page_Status__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable__c'] = CTtable['endolkrs'];

                            obj['Type_IA__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm__c'] = CTtable['msacd'];

                            obj['Right_Stent_migration__c'] = CTtable['rsm'];

                            obj['Left_Stent_migration__c'] = CTtable['lsm'];
                            obj['CT_Comments__c'] = CTtable['ftfucomm'];

                            obj['Stent_Graft_Stenosis__c'] = CTtable['stenos'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['stenos'],'Stent_Graft_Stenosis__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_R__c'] = CTtable['extthromr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthromr'],'Extent_of_thrombus_R__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_L__c'] = CTtable['extthroml'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthroml'],'Extent_of_thrombus_L__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Length_from_Distal_Renal_Artery__c'] = CTtable['len7'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '30'){
                        
                            obj['Date_CT_received_by_Corelab__c'] = CTtable['ctrecvdt'];
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '90'){
                        
                            obj['Type_IA_90__c'] = CTtable['typ1aot'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1aot'],'Type_IA_90__c',IBM_Codlist_SV_Data) : '';//P 
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '10' || CTtable['pageid'] == '20' || CTtable['pageid'] == '30' || CTtable['pageid'] == '90'){

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                            
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            
                            }
                        }   
                        
                    }


                    let ctVisitSeqArry=[];
                    //console.log('mapData : ' , mapData);
                    for(cz=0;cz<= Object.keys(mapData).length;cz++){
                        let key =  Object.keys(mapData)[cz];
                        let uz =  mapData[key];
                        //console.log('mapData : ' , uz);
                        if(uz != undefined){
                            ctVisitSeqArry.push(uz);
                        }
                    }

                    if(ctVisitSeqArry.length>0){

                        if(Final1YearData.hasOwnProperty(key)){
                            
                            let child = Final1YearData[key];
                            child.push(...ctVisitSeqArry); 
                            Final1YearData[key] = child; 
    
                        }else{
                            let child = [];
                            child.push(...ctVisitSeqArry); 
                            //console.log('child : ' , child)
                            Final1YearData[key] = child;  
                            
                        }
                    }

                }
            }
        }
    }

    console.log('Final1YearData : ' , Object.keys(Final1YearData).length);
    return Final1YearData;
    
};

const SubjectVisit2years =(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data) => 
{
    let Final2YearsData = {};

    for(let j=0; j<= Object.keys(CTFinalobj).length;j++){

        let key = Object.keys(CTFinalobj)[j];

        if (key != undefined && (FUFinalData.hasOwnProperty(key) || CTFinalobj.hasOwnProperty(key))) {

            let Furecords = FUFinalData[key];
            let CTrecords = CTFinalobj[key];
        
            let visitIdArry = ['80'];
            for(let k =0;k <= visitIdArry.length;k++){

                if(visitIdArry[k] != undefined){

                    let CTfilters = CTrecords != undefined ? CTrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let FUfilters = Furecords != undefined ? Furecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    
                    //console.log('FUfilters : ', FUfilters.length);
                    //console.log('CTfilters : ', CTfilters.length);

                    // FU
                    let mapData ={};
                    for(let FUtable of FUfilters){

                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = FUtable['subid']+'_'+FUtable['visitid']+'_'+FUtable['visitseq'];

                        if(FUtable['pageid'] == '10'){
                            
                            obj['CTMS__Visit_Name__c'] = FUtable['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Visit_Page_Status__c'] = FUtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['statusid'],'Visit_Page_Status__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['Visit_Performed__c'] = FUtable['fuperf'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['fuperf'],'Visit_Performed__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['CTMS__Visit_Date__c'] = FUtable['fudt'];
                            obj['CTMS__Visit_Type__c'] = FUtable['visitty'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitty'],'Visit_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            mpKey =FUtable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }

                        }

                    }

                    //CT 
                
                    for(let CTtable of CTfilters){
                        let obj ={};
                        let mpKey;

                        //console.log('CTtable Page Id :=:  ' ,CTtable['pageid']);
                        obj['External_Id__c'] = CTtable['subid']+'_'+CTtable['visitid']+'_'+CTtable['visitseq'];

                        if(CTtable['pageid'] == '10'){
                            
                            obj['CT_Date__c'] = CTtable['ctdt'];
                            obj['CT_Sent_Date__c'] = CTtable['imgsntdt'];

                            obj['Imaging_Type__c'] = CTtable['fuctty'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['fuctty'],'Imaging_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak_10__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable_10__c'] = CTtable['endolkrs'];

                            obj['Type_IA_10__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R_10__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L_10__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar_10__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA_10__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana_10__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R_10__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L_10__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R_10__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L_10__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R_10__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L_10__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm_10__c'] = CTtable['msacd'];

                            obj['Evidence_of_index_Stent_Graft_Migration__c'] = CTtable['migrat'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrat'],'Evidence_of_index_Stent_Graft_Migration__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Right__c'] = CTtable['migrr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrr'],'Right__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction__c'] = CTtable['mrdir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mrdir'],'Direction__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm__c'] = CTtable['mrdist'];

                            obj['Left__c'] = CTtable['migrl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrl'],'Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction_Left__c'] = CTtable['mldir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mldir'],'Direction_Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm_Left__c'] = CTtable['mldist']; 
                            obj['CT_Comments_10__c'] = CTtable['migrcom'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '20'){

                            obj['CT_Date_Core_Lab__c'] = CTtable['ctdt'];

                            obj['CT_Page_Status__c'] = CTtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['statusid'],'CT_Page_Status__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable__c'] = CTtable['endolkrs'];

                            obj['Type_IA__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm__c'] = CTtable['msacd'];

                            obj['Right_Stent_migration__c'] = CTtable['rsm'];

                            obj['Left_Stent_migration__c'] = CTtable['lsm'];
                            obj['CT_Comments__c'] = CTtable['ftfucomm'];

                            obj['Stent_Graft_Stenosis__c'] = CTtable['stenos'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['stenos'],'Stent_Graft_Stenosis__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_R__c'] = CTtable['extthromr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthromr'],'Extent_of_thrombus_R__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_L__c'] = CTtable['extthroml'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthroml'],'Extent_of_thrombus_L__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Length_from_Distal_Renal_Artery__c'] = CTtable['len7'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '30'){
                        
                            obj['Date_CT_received_by_Corelab__c'] = CTtable['ctrecvdt'];
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '90'){
                        
                            obj['Type_IA_90__c'] = CTtable['typ1aot'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1aot'],'Type_IA_90__c',IBM_Codlist_SV_Data) : '';//P 
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '10' || CTtable['pageid'] == '20' || CTtable['pageid'] == '30' || CTtable['pageid'] == '90'){

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                            
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            
                            }
                        }   
                        
                    }


                    let ctVisitSeqArry=[];
                    //console.log('mapData : ' , mapData);
                    for(cz=0;cz<= Object.keys(mapData).length;cz++){
                        let key =  Object.keys(mapData)[cz];
                        let uz =  mapData[key];
                        //console.log('mapData : ' , uz);
                        if(uz != undefined){
                            ctVisitSeqArry.push(uz);
                        }
                    }

                    if(ctVisitSeqArry.length>0){

                        if(Final2YearsData.hasOwnProperty(key)){
                            
                            let child = Final2YearsData[key];
                            child.push(...ctVisitSeqArry); 
                            Final2YearsData[key] = child; 
    
                        }else{
                            let child = [];
                            child.push(...ctVisitSeqArry); 
                            //console.log('child : ' , child)
                            Final2YearsData[key] = child;  
                            
                        }
                    }

                }
            }
        }
    }

    console.log('Final2YearsData : ' , Object.keys(Final2YearsData).length);
    return Final2YearsData;

};

const SubjectVisit3years =(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data) => 
{
    let Final3YearsData = {};

    for(let j=0; j<= Object.keys(CTFinalobj).length;j++){

        let key = Object.keys(CTFinalobj)[j];

        if (key != undefined && (FUFinalData.hasOwnProperty(key) || CTFinalobj.hasOwnProperty(key))) {

            let Furecords = FUFinalData[key];
            let CTrecords = CTFinalobj[key];
        
            let visitIdArry = ['90'];
            for(let k =0;k <= visitIdArry.length;k++){

                if(visitIdArry[k] != undefined){

                    let CTfilters = CTrecords != undefined ? CTrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let FUfilters = Furecords != undefined ? Furecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    
                    //console.log('FUfilters : ', FUfilters.length);
                    //console.log('CTfilters : ', CTfilters.length);

                    // FU
                    let mapData ={};
                    for(let FUtable of FUfilters){

                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = FUtable['subid']+'_'+FUtable['visitid']+'_'+FUtable['visitseq'];

                        if(FUtable['pageid'] == '10'){
                            
                            obj['CTMS__Visit_Name__c'] = FUtable['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Visit_Page_Status__c'] = FUtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['statusid'],'Visit_Page_Status__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['Visit_Performed__c'] = FUtable['fuperf'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['fuperf'],'Visit_Performed__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['CTMS__Visit_Date__c'] = FUtable['fudt'];
                            obj['CTMS__Visit_Type__c'] = FUtable['visitty'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitty'],'Visit_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            mpKey =FUtable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }

                        }

                    }

                    //CT 
                
                    for(let CTtable of CTfilters){
                        let obj ={};
                        let mpKey;

                        //console.log('CTtable Page Id :=:  ' ,CTtable['pageid']);
                        obj['External_Id__c'] = CTtable['subid']+'_'+CTtable['visitid']+'_'+CTtable['visitseq'];

                        if(CTtable['pageid'] == '10'){
                            
                            obj['CT_Date__c'] = CTtable['ctdt'];
                            obj['CT_Sent_Date__c'] = CTtable['imgsntdt'];

                            obj['Imaging_Type__c'] = CTtable['fuctty'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['fuctty'],'Imaging_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak_10__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable_10__c'] = CTtable['endolkrs'];

                            obj['Type_IA_10__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R_10__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L_10__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar_10__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA_10__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana_10__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R_10__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L_10__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R_10__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L_10__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R_10__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L_10__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm_10__c'] = CTtable['msacd'];

                            obj['Evidence_of_index_Stent_Graft_Migration__c'] = CTtable['migrat'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrat'],'Evidence_of_index_Stent_Graft_Migration__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Right__c'] = CTtable['migrr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrr'],'Right__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction__c'] = CTtable['mrdir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mrdir'],'Direction__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm__c'] = CTtable['mrdist'];

                            obj['Left__c'] = CTtable['migrl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrl'],'Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction_Left__c'] = CTtable['mldir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mldir'],'Direction_Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm_Left__c'] = CTtable['mldist']; 
                            obj['CT_Comments_10__c'] = CTtable['migrcom'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '20'){

                            obj['CT_Date_Core_Lab__c'] = CTtable['ctdt'];

                            obj['CT_Page_Status__c'] = CTtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['statusid'],'CT_Page_Status__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable__c'] = CTtable['endolkrs'];

                            obj['Type_IA__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm__c'] = CTtable['msacd'];

                            obj['Right_Stent_migration__c'] = CTtable['rsm'];

                            obj['Left_Stent_migration__c'] = CTtable['lsm'];
                            obj['CT_Comments__c'] = CTtable['ftfucomm'];

                            obj['Stent_Graft_Stenosis__c'] = CTtable['stenos'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['stenos'],'Stent_Graft_Stenosis__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_R__c'] = CTtable['extthromr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthromr'],'Extent_of_thrombus_R__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_L__c'] = CTtable['extthroml'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthroml'],'Extent_of_thrombus_L__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Length_from_Distal_Renal_Artery__c'] = CTtable['len7'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '30'){
                        
                            obj['Date_CT_received_by_Corelab__c'] = CTtable['ctrecvdt'];
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '90'){
                        
                            obj['Type_IA_90__c'] = CTtable['typ1aot'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1aot'],'Type_IA_90__c',IBM_Codlist_SV_Data) : '';//P 
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '10' || CTtable['pageid'] == '20' || CTtable['pageid'] == '30' || CTtable['pageid'] == '90'){

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                            
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            
                            }
                        }   
                        
                    }


                    let ctVisitSeqArry=[];
                    //console.log('mapData : ' , mapData);
                    for(cz=0;cz<= Object.keys(mapData).length;cz++){
                        let key =  Object.keys(mapData)[cz];
                        let uz =  mapData[key];
                        //console.log('mapData : ' , uz);
                        if(uz != undefined){
                            ctVisitSeqArry.push(uz);
                        }
                    }

                    if(ctVisitSeqArry.length>0){

                        if(Final3YearsData.hasOwnProperty(key)){
                            
                            let child = Final3YearsData[key];
                            child.push(...ctVisitSeqArry); 
                            Final3YearsData[key] = child; 
    
                        }else{
                            let child = [];
                            child.push(...ctVisitSeqArry); 
                            //console.log('child : ' , child)
                            Final3YearsData[key] = child;  
                            
                        }
                    }

                }
            }
        }
    }

    console.log('Final3YearsData : ' , Object.keys(Final3YearsData).length);
    return Final3YearsData;

};

const SubjectVisit4years =(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data) => 
{
    let Final4YearsData = {};

    for(let j=0; j<= Object.keys(CTFinalobj).length;j++){

        let key = Object.keys(CTFinalobj)[j];

        if (key != undefined && (FUFinalData.hasOwnProperty(key) || CTFinalobj.hasOwnProperty(key))) {

            let Furecords = FUFinalData[key];
            let CTrecords = CTFinalobj[key];
        
            let visitIdArry = ['100'];
            for(let k =0;k <= visitIdArry.length;k++){

                if(visitIdArry[k] != undefined){

                    let CTfilters = CTrecords != undefined ? CTrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let FUfilters = Furecords != undefined ? Furecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    
                    //console.log('FUfilters : ', FUfilters.length);
                    //console.log('CTfilters : ', CTfilters.length);

                    // FU
                    let mapData ={};
                    for(let FUtable of FUfilters){

                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = FUtable['subid']+'_'+FUtable['visitid']+'_'+FUtable['visitseq'];

                        if(FUtable['pageid'] == '10'){
                            
                            obj['CTMS__Visit_Name__c'] = FUtable['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Visit_Page_Status__c'] = FUtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['statusid'],'Visit_Page_Status__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['Visit_Performed__c'] = FUtable['fuperf'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['fuperf'],'Visit_Performed__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['CTMS__Visit_Date__c'] = FUtable['fudt'];
                            obj['CTMS__Visit_Type__c'] = FUtable['visitty'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitty'],'Visit_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            mpKey =FUtable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }

                        }

                    }

                    //CT 
                
                    for(let CTtable of CTfilters){
                        let obj ={};
                        let mpKey;

                        //console.log('CTtable Page Id :=:  ' ,CTtable['pageid']);
                        obj['External_Id__c'] = CTtable['subid']+'_'+CTtable['visitid']+'_'+CTtable['visitseq'];

                        if(CTtable['pageid'] == '10'){
                            
                            obj['CT_Date__c'] = CTtable['ctdt'];
                            obj['CT_Sent_Date__c'] = CTtable['imgsntdt'];

                            obj['Imaging_Type__c'] = CTtable['fuctty'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['fuctty'],'Imaging_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak_10__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable_10__c'] = CTtable['endolkrs'];

                            obj['Type_IA_10__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R_10__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L_10__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar_10__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA_10__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana_10__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R_10__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L_10__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R_10__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L_10__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R_10__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L_10__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm_10__c'] = CTtable['msacd'];

                            obj['Evidence_of_index_Stent_Graft_Migration__c'] = CTtable['migrat'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrat'],'Evidence_of_index_Stent_Graft_Migration__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Right__c'] = CTtable['migrr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrr'],'Right__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction__c'] = CTtable['mrdir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mrdir'],'Direction__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm__c'] = CTtable['mrdist'];

                            obj['Left__c'] = CTtable['migrl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrl'],'Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction_Left__c'] = CTtable['mldir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mldir'],'Direction_Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm_Left__c'] = CTtable['mldist']; 
                            obj['CT_Comments_10__c'] = CTtable['migrcom'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '20'){

                            obj['CT_Date_Core_Lab__c'] = CTtable['ctdt'];

                            obj['CT_Page_Status__c'] = CTtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['statusid'],'CT_Page_Status__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable__c'] = CTtable['endolkrs'];

                            obj['Type_IA__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm__c'] = CTtable['msacd'];

                            obj['Right_Stent_migration__c'] = CTtable['rsm'];

                            obj['Left_Stent_migration__c'] = CTtable['lsm'];
                            obj['CT_Comments__c'] = CTtable['ftfucomm'];

                            obj['Stent_Graft_Stenosis__c'] = CTtable['stenos'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['stenos'],'Stent_Graft_Stenosis__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_R__c'] = CTtable['extthromr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthromr'],'Extent_of_thrombus_R__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_L__c'] = CTtable['extthroml'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthroml'],'Extent_of_thrombus_L__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Length_from_Distal_Renal_Artery__c'] = CTtable['len7'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '30'){
                        
                            obj['Date_CT_received_by_Corelab__c'] = CTtable['ctrecvdt'];
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '90'){
                        
                            obj['Type_IA_90__c'] = CTtable['typ1aot'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1aot'],'Type_IA_90__c',IBM_Codlist_SV_Data) : '';//P 
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '10' || CTtable['pageid'] == '20' || CTtable['pageid'] == '30' || CTtable['pageid'] == '90'){

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                            
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            
                            }
                        }   
                        
                    }


                    let ctVisitSeqArry=[];
                    //console.log('mapData : ' , mapData);
                    for(cz=0;cz<= Object.keys(mapData).length;cz++){
                        let key =  Object.keys(mapData)[cz];
                        let uz =  mapData[key];
                        //console.log('mapData : ' , uz);
                        if(uz != undefined){
                            ctVisitSeqArry.push(uz);
                        }
                    }

                    if(ctVisitSeqArry.length>0){

                        if(Final4YearsData.hasOwnProperty(key)){
                            
                            let child = Final4YearsData[key];
                            child.push(...ctVisitSeqArry); 
                            Final4YearsData[key] = child; 
    
                        }else{
                            let child = [];
                            child.push(...ctVisitSeqArry); 
                            //console.log('child : ' , child)
                            Final4YearsData[key] = child;  
                            
                        }
                    }

                }
            }
        }
    }

    console.log('Final4YearsData : ' , Object.keys(Final4YearsData).length);
    return Final4YearsData;

};

const SubjectVisit5years =(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data) => 
{
    let Final5YearsData = {};

    for(let j=0; j<= Object.keys(CTFinalobj).length;j++){

        let key = Object.keys(CTFinalobj)[j];

        if (key != undefined && (FUFinalData.hasOwnProperty(key) || CTFinalobj.hasOwnProperty(key))) {

            let Furecords = FUFinalData[key];
            let CTrecords = CTFinalobj[key];
        
            let visitIdArry = ['110'];
            for(let k =0;k <= visitIdArry.length;k++){

                if(visitIdArry[k] != undefined){

                    let CTfilters = CTrecords != undefined ? CTrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let FUfilters = Furecords != undefined ? Furecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    
                    //console.log('FUfilters : ', FUfilters.length);
                    //console.log('CTfilters : ', CTfilters.length);

                    // FU
                    let mapData ={};
                    for(let FUtable of FUfilters){

                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = FUtable['subid']+'_'+FUtable['visitid']+'_'+FUtable['visitseq'];

                        if(FUtable['pageid'] == '10'){
                            
                            obj['CTMS__Visit_Name__c'] = FUtable['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Visit_Page_Status__c'] = FUtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['statusid'],'Visit_Page_Status__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['Visit_Performed__c'] = FUtable['fuperf'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['fuperf'],'Visit_Performed__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['CTMS__Visit_Date__c'] = FUtable['fudt'];
                            obj['CTMS__Visit_Type__c'] = FUtable['visitty'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitty'],'Visit_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            mpKey =FUtable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }

                        }

                    }

                    //CT 
                
                    for(let CTtable of CTfilters){
                        let obj ={};
                        let mpKey;

                        //console.log('CTtable Page Id :=:  ' ,CTtable['pageid']);
                        obj['External_Id__c'] = CTtable['subid']+'_'+CTtable['visitid']+'_'+CTtable['visitseq'];

                        if(CTtable['pageid'] == '10'){
                            
                            obj['CT_Date__c'] = CTtable['ctdt'];
                            obj['CT_Sent_Date__c'] = CTtable['imgsntdt'];

                            obj['Imaging_Type__c'] = CTtable['fuctty'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['fuctty'],'Imaging_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak_10__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable_10__c'] = CTtable['endolkrs'];

                            obj['Type_IA_10__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R_10__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L_10__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar_10__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA_10__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana_10__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R_10__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L_10__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R_10__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L_10__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R_10__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L_10__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm_10__c'] = CTtable['msacd'];

                            obj['Evidence_of_index_Stent_Graft_Migration__c'] = CTtable['migrat'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrat'],'Evidence_of_index_Stent_Graft_Migration__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Right__c'] = CTtable['migrr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrr'],'Right__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction__c'] = CTtable['mrdir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mrdir'],'Direction__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm__c'] = CTtable['mrdist'];

                            obj['Left__c'] = CTtable['migrl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrl'],'Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction_Left__c'] = CTtable['mldir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mldir'],'Direction_Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm_Left__c'] = CTtable['mldist']; 
                            obj['CT_Comments_10__c'] = CTtable['migrcom'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '20'){

                            obj['CT_Date_Core_Lab__c'] = CTtable['ctdt'];

                            obj['CT_Page_Status__c'] = CTtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['statusid'],'CT_Page_Status__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable__c'] = CTtable['endolkrs'];

                            obj['Type_IA__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm__c'] = CTtable['msacd'];

                            obj['Right_Stent_migration__c'] = CTtable['rsm'];

                            obj['Left_Stent_migration__c'] = CTtable['lsm'];
                            obj['CT_Comments__c'] = CTtable['ftfucomm'];

                            obj['Stent_Graft_Stenosis__c'] = CTtable['stenos'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['stenos'],'Stent_Graft_Stenosis__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_R__c'] = CTtable['extthromr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthromr'],'Extent_of_thrombus_R__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_L__c'] = CTtable['extthroml'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthroml'],'Extent_of_thrombus_L__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Length_from_Distal_Renal_Artery__c'] = CTtable['len7'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '30'){
                        
                            obj['Date_CT_received_by_Corelab__c'] = CTtable['ctrecvdt'];
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '90'){
                        
                            obj['Type_IA_90__c'] = CTtable['typ1aot'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1aot'],'Type_IA_90__c',IBM_Codlist_SV_Data) : '';//P 
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '10' || CTtable['pageid'] == '20' || CTtable['pageid'] == '30' || CTtable['pageid'] == '90'){

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                            
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            
                            }
                        }   
                        
                    }


                    let ctVisitSeqArry=[];
                    //console.log('mapData : ' , mapData);
                    for(cz=0;cz<= Object.keys(mapData).length;cz++){
                        let key =  Object.keys(mapData)[cz];
                        let uz =  mapData[key];
                        //console.log('mapData : ' , uz);
                        if(uz != undefined){
                            ctVisitSeqArry.push(uz);
                        }
                    }

                    if(ctVisitSeqArry.length>0){

                        if(Final5YearsData.hasOwnProperty(key)){
                            
                            let child = Final5YearsData[key];
                            child.push(...ctVisitSeqArry); 
                            Final5YearsData[key] = child; 
    
                        }else{
                            let child = [];
                            child.push(...ctVisitSeqArry); 
                            //console.log('child : ' , child)
                            Final5YearsData[key] = child;  
                            
                        }
                    }

                }
            }
        }
    }

    console.log('Final5YearsData : ' , Object.keys(Final5YearsData).length);
    return Final5YearsData;

};

const SubjectVisitUnScheduledVisit =(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data) => 
{
    let FinalUnScheduledVisitData = {};

    for(let j=0; j<= Object.keys(CTFinalobj).length;j++){

        let key = Object.keys(CTFinalobj)[j];

        if (key != undefined && (FUFinalData.hasOwnProperty(key) || CTFinalobj.hasOwnProperty(key))) {

            let Furecords = FUFinalData[key];
            let CTrecords = CTFinalobj[key];

            let visitIdArry = ['120'];
            for(let k =0;k <= visitIdArry.length;k++){

                if(visitIdArry[k] != undefined){

                    let CTfilters = CTrecords != undefined ? CTrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let FUfilters = Furecords != undefined ? Furecords.filter(x=> (x.visitid == visitIdArry[k])) : [];

                    // FU
                    let mapData ={};

                    for(let FUtable of FUfilters){

                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = FUtable['subid']+'_'+FUtable['visitid']+'_'+FUtable['visitseq'];

                        if(FUtable['pageid'] == '30'){
                            
                            obj['CTMS__Visit_Name__c'] = FUtable['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Visit_Page_Status__c'] = FUtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['statusid'],'Visit_Page_Status__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['Visit_Performed__c'] = FUtable['fuperf'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['fuperf'],'Visit_Performed__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['CTMS__Visit_Date__c'] = FUtable['fudt'];
                            
                            mpKey =FUtable['visitid'];
                        }
                        if(FUtable['pageid'] == '10'){
                            
                            obj['CTMS__Visit_Type__c'] = FUtable['visitty'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitty'],'Visit_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            mpKey =FUtable['visitid'];
                        }

                        if(FUtable['pageid'] == '10' || FUtable['pageid'] == '30'){

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }

                        }

                    }

                    //CT 
                
                    for(let CTtable of CTfilters){
                        let obj ={};
                        let mpKey;

                        //console.log('CTtable Page Id :=:  ' ,CTtable['pageid']);
                        obj['External_Id__c'] = CTtable['subid']+'_'+CTtable['visitid']+'_'+CTtable['visitseq'];

                        if(CTtable['pageid'] == '30'){
                            
                            obj['CT_Date__c'] = CTtable['ctdt'];
                            obj['CT_Sent_Date__c'] = CTtable['imgsntdt'];

                            obj['Imaging_Type__c'] = CTtable['fuctty'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['fuctty'],'Imaging_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak_10__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable_10__c'] = CTtable['endolkrs'];

                            obj['Type_IA_10__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R_10__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L_10__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar_10__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA_10__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana_10__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R_10__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L_10__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R_10__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L_10__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R_10__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L_10__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm_10__c'] = CTtable['msacd'];

                            obj['Evidence_of_index_Stent_Graft_Migration__c'] = CTtable['migrat'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrat'],'Evidence_of_index_Stent_Graft_Migration__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Right__c'] = CTtable['migrr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrr'],'Right__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction__c'] = CTtable['mrdir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mrdir'],'Direction__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm__c'] = CTtable['mrdist'];

                            obj['Left__c'] = CTtable['migrl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrl'],'Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction_Left__c'] = CTtable['mldir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mldir'],'Direction_Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm_Left__c'] = CTtable['mldist']; 
                            obj['CT_Comments_10__c'] = CTtable['migrcom'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '20'){

                            obj['CT_Date_Core_Lab__c'] = CTtable['ctdt'];

                            obj['CT_Page_Status__c'] = CTtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['statusid'],'CT_Page_Status__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable__c'] = CTtable['endolkrs'];

                            obj['Type_IA__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm__c'] = CTtable['msacd'];

                            obj['Right_Stent_migration__c'] = CTtable['rsm'];

                            obj['Left_Stent_migration__c'] = CTtable['lsm'];
                            obj['CT_Comments__c'] = CTtable['ftfucomm'];

                            obj['Stent_Graft_Stenosis__c'] = CTtable['stenos'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['stenos'],'Stent_Graft_Stenosis__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_R__c'] = CTtable['extthromr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthromr'],'Extent_of_thrombus_R__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_L__c'] = CTtable['extthroml'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthroml'],'Extent_of_thrombus_L__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Length_from_Distal_Renal_Artery__c'] = CTtable['len7'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '40'){
                        
                            obj['Date_CT_received_by_Corelab__c'] = CTtable['ctrecvdt'];
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '70'){
                        
                            obj['Type_IA_90__c'] = CTtable['typ1aot'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1aot'],'Type_IA_90__c',IBM_Codlist_SV_Data) : '';//P 
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '20' || CTtable['pageid'] == '30' || CTtable['pageid'] == '40' || CTtable['pageid'] == '70'){

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                            
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            
                            }
                        }   
                        
                    }

                    let ctVisitSeqArry=[];
                    //console.log('mapData : ' , mapData);
                    for(cz=0;cz<= Object.keys(mapData).length;cz++){
                        let key =  Object.keys(mapData)[cz];
                        let uz =  mapData[key];
                        //console.log('mapData : ' , uz);
                        if(uz != undefined){
                            ctVisitSeqArry.push(uz);
                        }
                        
                    }
                    //console.log('ctVisitSeqArry : ' , ctVisitSeqArry);

                    if(ctVisitSeqArry.length>0){
                        
                        if(FinalUnScheduledVisitData.hasOwnProperty(key)){
                            
                            let child = FinalUnScheduledVisitData[key];
                            child.push(...ctVisitSeqArry); 
                            FinalUnScheduledVisitData[key] = child; 
    
                        }else{
                            let child = [];
                            child.push(...ctVisitSeqArry); 
                            
                            FinalUnScheduledVisitData[key] = child;  
                            
                        }
                    }
                    //console.log('FinalUnScheduledVisitData : ' , FinalUnScheduledVisitData);
                }
            }
        }
    }
    return FinalUnScheduledVisitData;

};

const SubjectVisitEnhancedFollowUp =(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data) => 
{
    let FinalUnScheduledVisitData = {};

    for(let j=0; j<= Object.keys(CTFinalobj).length;j++){

        let key = Object.keys(CTFinalobj)[j];

        if (key != undefined && (FUFinalData.hasOwnProperty(key) || CTFinalobj.hasOwnProperty(key))) {

            let Furecords = FUFinalData[key];
            let CTrecords = CTFinalobj[key];

            let visitIdArry = ['190'];
            for(let k =0;k <= visitIdArry.length;k++){

                if(visitIdArry[k] != undefined){

                    let CTfilters = CTrecords != undefined ? CTrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let FUfilters = Furecords != undefined ? Furecords.filter(x=> (x.visitid == visitIdArry[k])) : [];

                    //console.log('FUfilters : ', FUfilters);
                    //console.log('CTfilters : ', CTfilters);

                    // FU
                    let mapData ={};
                    for(let FUtable of FUfilters){

                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = FUtable['subid']+'_'+FUtable['visitid']+'_'+FUtable['visitseq'];

                        if(FUtable['pageid'] == '10'){
                            
                            obj['CTMS__Visit_Name__c'] = FUtable['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Visit_Page_Status__c'] = FUtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['statusid'],'Visit_Page_Status__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['Visit_Performed__c'] = FUtable['fuperf'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['fuperf'],'Visit_Performed__c',IBM_Codlist_SV_Data) : '';//P  
                            obj['CTMS__Visit_Date__c'] = FUtable['fudt'];
                            obj['CTMS__Visit_Type__c'] = FUtable['visitty'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitty'],'Visit_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            mpKey =FUtable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }

                        }

                    }

                    //CT 
                
                    for(let CTtable of CTfilters){
                        let obj ={};
                        let mpKey;

                        //console.log('CTtable Page Id :=:  ' ,CTtable['pageid']);
                        obj['External_Id__c'] = CTtable['subid']+'_'+CTtable['visitid']+'_'+CTtable['visitseq'];

                        if(CTtable['pageid'] == '10'){
                            
                            obj['CT_Date__c'] = CTtable['ctdt'];
                            obj['CT_Sent_Date__c'] = CTtable['imgsntdt'];

                            obj['Imaging_Type__c'] = CTtable['fuctty'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['fuctty'],'Imaging_Type__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak_10__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable_10__c'] = CTtable['endolkrs'];

                            obj['Type_IA_10__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R_10__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L_10__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar_10__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA_10__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana_10__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R_10__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L_10__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R_10__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L_10__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R_10__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L_10__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L_10__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm_10__c'] = CTtable['msacd'];

                            obj['Evidence_of_index_Stent_Graft_Migration__c'] = CTtable['migrat'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrat'],'Evidence_of_index_Stent_Graft_Migration__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Right__c'] = CTtable['migrr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrr'],'Right__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction__c'] = CTtable['mrdir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mrdir'],'Direction__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm__c'] = CTtable['mrdist'];

                            obj['Left__c'] = CTtable['migrl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['migrl'],'Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Direction_Left__c'] = CTtable['mldir'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['mldir'],'Direction_Left__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Distance_mm_Left__c'] = CTtable['mldist']; 
                            obj['CT_Comments_10__c'] = CTtable['migrcom'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '20'){

                            obj['CT_Date_Core_Lab__c'] = CTtable['ctdt'];

                            obj['CT_Page_Status__c'] = CTtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['statusid'],'CT_Page_Status__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_there_evidence_of_Endoleak__c'] = CTtable['endolk'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['endolk'],'Was_there_evidence_of_Endoleak__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Reason_Endoleak_not_evaluable__c'] = CTtable['endolkrs'];

                            obj['Type_IA__c'] = CTtable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1a'],'Type_IA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_R__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IB_L__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Maximum_AAA_Sac_Diameter_mm__c'] = CTtable['msacd'];

                            obj['Right_Stent_migration__c'] = CTtable['rsm'];

                            obj['Left_Stent_migration__c'] = CTtable['lsm'];
                            obj['CT_Comments__c'] = CTtable['ftfucomm'];

                            obj['Stent_Graft_Stenosis__c'] = CTtable['stenos'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['stenos'],'Stent_Graft_Stenosis__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_R__c'] = CTtable['extthromr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthromr'],'Extent_of_thrombus_R__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Extent_of_thrombus_L__c'] = CTtable['extthroml'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['extthroml'],'Extent_of_thrombus_L__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Length_from_Distal_Renal_Artery__c'] = CTtable['len7'];

                            mpKey = CTtable['visitid']; 

                        }

                        if(CTtable['pageid'] == '30'){
                        
                            obj['Date_CT_received_by_Corelab__c'] = CTtable['ctrecvdt'];
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '90'){
                        
                            obj['Type_IA_90__c'] = CTtable['typ1aot'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1aot'],'Type_IA_90__c',IBM_Codlist_SV_Data) : '';//P 
                            mpKey = CTtable['visitid']; 
                        }

                        if(CTtable['pageid'] == '10' || CTtable['pageid'] == '20' || CTtable['pageid'] == '30' || CTtable['pageid'] == '90'){

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                            
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            
                            }
                        }   
                        
                    }


                    let ctVisitSeqArry=[];
                    //console.log('mapData : ' , mapData);
                    for(cz=0;cz<= Object.keys(mapData).length;cz++){
                        let key =  Object.keys(mapData)[cz];
                        let uz =  mapData[key];
                        //console.log('mapData : ' , uz);
                        if(uz != undefined){
                            ctVisitSeqArry.push(uz);
                        }
                        
                    }
                    
                    //console.log('ctVisitSeqArry 2 : ' , ctVisitSeqArry);

                    if(ctVisitSeqArry.length>0){

                        if(FinalUnScheduledVisitData.hasOwnProperty(key)){
                            
                            let child = FinalUnScheduledVisitData[key];
                            child.push(...ctVisitSeqArry); 
                            FinalUnScheduledVisitData[key] = child; 
    
                        }else{
                            let child = [];
                            child.push(...ctVisitSeqArry); 
                            //console.log('child : ' , child)
                            FinalUnScheduledVisitData[key] = child;  
                            
                        }
                    }
                }
            }
        }
    }
    return FinalUnScheduledVisitData;

};

const SubjectVisitIndexProcedure =(FUFinalData,CTFinalobj,IDXPFinalobj,IDXHFinalobj,IBM_Codlist_SV_Data) => 
{
    let FinalIndexProcedureData = {};

    for(let j=0; j<= Object.keys(CTFinalobj).length;j++){

        let key = Object.keys(CTFinalobj)[j];

        if (key != undefined && (FUFinalData.hasOwnProperty(key) || CTFinalobj.hasOwnProperty(key) || IDXPFinalobj.hasOwnProperty(key) || IDXHFinalobj.hasOwnProperty(key))) {

            let Furecords = FUFinalData[key];
            let CTrecords = CTFinalobj[key];
            let IDXPrecords = IDXPFinalobj[key];
            let IDXHrecords = IDXHFinalobj[key];

            let visitIdArry = ['40'];
            for(let k =0;k <= visitIdArry.length;k++){

                if(visitIdArry[k] != undefined){

                    let CTfilters = CTrecords != undefined ? CTrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    //let FUfilters = Furecords != undefined ? Furecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let IDXPfilters = IDXPrecords != undefined ? IDXPrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let IDXHfilters = IDXHrecords != undefined ? IDXHrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];

                    //console.log('FUfilters : ', FUfilters.length);
                    //console.log('CTfilters : ', CTfilters.length);
                    //console.log('IDXHfilters : ', IDXHfilters.length);

                    // FU
                    let mapData ={};
                    

                    //CT 
                
                    for(let CTtable of CTfilters){
                        let obj ={};
                        let mpKey;

                        //console.log('CTtable Page Id :=:  ' ,CTtable['pageid']);
                        obj['External_Id__c'] = CTtable['subid']+'_'+CTtable['visitid']+'_'+CTtable['visitseq'];
                        
                        if(CTtable['pageid'] == '10'){
                            

                            obj['Type_IB_R__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Type_IB_L__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L__c',IBM_Codlist_SV_Data) : '';//P 


                            mpKey = CTtable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                            
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            
                            }

                        }
                        
                    }

                    //IDXP
                
                    for(let IDXPTable of IDXPfilters){
                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = IDXPTable['subid']+'_'+IDXPTable['visitid']+'_'+IDXPTable['visitseq'];
                        
                        if(IDXPTable['pageid'] == '10'){
                            
                            obj['CTMS__Visit_Name__c'] = IDXPTable['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Procedure_Page_Status__c'] = IDXPTable['STATUSID'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['STATUSID'],'Procedure_Page_Status__c',IBM_Codlist_SV_Data) : '';//P  

                            obj['Procedure_Date__c'] = IDXPTable['trtdt'];

                            obj['Procedure_Completion_Status__c'] = IDXPTable['complete'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['complete'],'Procedure_Completion_Status__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['Type_IA__c'] = IDXPTable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['typ1a'],'Type_IA__c',IBM_Codlist_SV_Data) : '';//P

                            obj['Unknown__c'] = IDXPTable['typu'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['typu'],'Unknown__c',IBM_Codlist_SV_Data) : '';//P

                            obj['If_unknown_type_please_explain__c'] = IDXPTable['typucomm'];

                            obj['Did_Adverse_Event_occur_during_procedure__c'] = IDXPTable['any2ndrypx'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['any2ndrypx'],'Did_Adverse_Event_occur_during_procedure__c',IBM_Codlist_SV_Data) : '';//P

                            obj['concomitant_procedures_performed__c'] = IDXPTable['pconproc'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['pconproc'],'concomitant_procedures_performed__c',IBM_Codlist_SV_Data) : '';//P

                            obj['Narrative_for_concomitant_procedure__c'] = IDXPTable['reinnar'];

                            obj['subject_converted_to_Open_Surgery__c'] = IDXPTable['idxposyn'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['idxposyn'],'subject_converted_to_Open_Surgery__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['Implanting_Physician_Name__c'] = IDXPTable['PHYS'];

                            obj['Assisting_Physician_s_Name__c'] = IDXPTable['APHYS'];

                            obj['Anesthesia_Type__c'] = IDXPTable['ANESTH'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['ANESTH'],'Anesthesia_Type__c',IBM_Codlist_SV_Data) : '';//P 
                            
                            obj['Nellix_access_type__c'] =  IDXPTable['ACCTYP'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['ACCTYP'],'Nellix_access_type__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['Is_the_aneuysm_s_systomatic__c'] = IDXPTable['AAASYN'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['AAASYN'],'Is_the_aneuysm_s_systomatic__c',IBM_Codlist_SV_Data) : '';//P

                            obj['Pre_fill__c'] = IDXPTable['PREFILL'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['PREFILL'],'Pre_fill__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['Pre_fill_volume_In_mL__c'] = IDXPTable['PREFILV'];
                            obj['Pre_fill_Pressure_mm_Hg__c'] = IDXPTable['PFILLPR'];
                            obj['Polymer_Fill_Pressure_mm_Hg__c'] = IDXPTable['FILLPR'];
                            
                            obj['First_Break_of_skin__c'] = IDXPTable['OC1'];
                            obj['First_Nellix_catheter_in__c'] = IDXPTable['OC2'];
                            obj['Last_Nellix_Catheter_out__c'] = IDXPTable['OC3'];
                            obj['Final_skin_closure__c'] = IDXPTable['OC4'];

                            obj['Total_procedure_time__c'] = IDXPTable['REINPXTM'];
                            obj['Total_Anesthesia_time__c'] = IDXPTable['ANESTM'];
                            obj['Contrast_volume_used__c'] = IDXPTable['CONVOL'];
                            obj['Estimated_Blood_loss__c'] = IDXPTable['BLLOSS'];
                            obj['Fluoroscopy_time__c'] = IDXPTable['FLUOTM'];
                            obj['Transfused_volume__c'] = IDXPTable['TRANSFU'];

                            obj['Arterial_repair_during_procedure__c'] = IDXPTable['ARTREP'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['ARTREP'],'Arterial_repair_during_procedure__c',IBM_Codlist_SV_Data) : '';//P

                            obj['Residual_Endoleak_post_procedure__c'] = IDXPTable['ENDOLK'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['ENDOLK'],'Residual_Endoleak_post_procedure__c',IBM_Codlist_SV_Data) : '';//P

                            obj['Total_implanted_Nellix_stents__c'] = IDXPTable['NLXSTNTS'];
                            obj['Primary_Specialty__c'] = IDXPTable['PSPEC'];

                            mpKey = IDXPTable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                                
                            }
                            
                        }

                    }
                    
                    //IDXH
                    
                    for(let IDXHTable of IDXHfilters){
                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = IDXHTable['subid']+'_'+IDXHTable['visitid']+'_'+IDXHTable['visitseq'];

                        if(IDXHTable['pageid'] == '20'){

                            obj['Hospital_Admission_Date__c'] = IDXHTable['idxstdt'];
                            obj['Discharge_Date__c'] = IDXHTable['idxendt'];

                            mpKey = IDXHTable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }
                        }
                    }

                    let ctVisitSeqArry=[];
                    //console.log('mapData : ' , mapData);
                    for(cz=0;cz<= Object.keys(mapData).length;cz++){
                        let key =  Object.keys(mapData)[cz];
                        let uz =  mapData[key];
                        //console.log('mapData : ' , uz);
                        if(uz != undefined){
                            ctVisitSeqArry.push(uz);
                        }
                        
                    }

                    if(ctVisitSeqArry.length>0){

                        if(FinalIndexProcedureData.hasOwnProperty(key)){
                            
                            let child = FinalIndexProcedureData[key];
                            child.push(...ctVisitSeqArry); 
                            FinalIndexProcedureData[key] = child; 
    
                        }else{
                            let child = [];
                            child.push(...ctVisitSeqArry); 
                            //console.log('child : ' , child)
                            FinalIndexProcedureData[key] = child;  
                            
                        }
                    }
                }
            }
        }
    }
    console.log('FinalIndexProcedureData : ' , Object.keys(FinalIndexProcedureData).length);
    return FinalIndexProcedureData;

};

const SubjectVisitChevasProcedure =(FUFinalData,CTFinalobj,IDXPFinalobj,IDXHFinalobj,IBM_Codlist_SV_Data) => 
{
    let FinalChevasData = {};

    for(let j=0; j<= Object.keys(CTFinalobj).length;j++){

        let key = Object.keys(CTFinalobj)[j];

        if (key != undefined && (FUFinalData.hasOwnProperty(key) || CTFinalobj.hasOwnProperty(key))) {

            let Furecords = FUFinalData[key];
            let CTrecords = CTFinalobj[key];
            let IDXPrecords = IDXPFinalobj[key];
            let IDXHrecords = IDXHFinalobj[key];

            let visitIdArry = ['180'];
            for(let k =0;k <= visitIdArry.length;k++){

                if(visitIdArry[k] != undefined){

                    let CTfilters = CTrecords != undefined ? CTrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let FUfilters = Furecords != undefined ? Furecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let IDXPfilters = IDXPrecords != undefined ? IDXPrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let IDXHfilters = IDXHrecords != undefined ? IDXHrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];

                    //console.log('FUfilters : ', FUfilters);
                    //console.log('CTfilters : ', CTfilters);
                    //console.log('IDXHfilters : ', IDXHfilters);

                    // FU
                    let mapData ={};
                    
                    

                    //CT 
                    
                    for(let CTtable of CTfilters){
                        let obj ={};
                        let mpKey;
                        //console.log('CTtable Page Id :=:  ' ,CTtable['pageid']);
                    
                        obj['External_Id__c'] = CTtable['subid']+'_'+CTtable['visitid']+'_'+CTtable['visitseq'];

                        if(CTtable['pageid'] == '10'){
                            
                            obj['Type_IB_R__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Type_IB_L__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L__c',IBM_Codlist_SV_Data) : '';//P 

                            mpKey = CTtable['visitid']+'_'+CTtable['visitseq']; 
                            
                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                                
                            }
                        }
                    }

                    //IDXP
                    
                    for(let IDXPTable of IDXPfilters){

                        let obj ={};
                        let mpKey;
                        
                        obj['External_Id__c'] = IDXPTable['subid']+'_'+IDXPTable['visitid']+'_'+IDXPTable['visitseq'];

                        if(IDXPTable['pageid'] == '10'){

                            obj['CTMS__Visit_Name__c'] = IDXPTable['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Procedure_Page_Status__c'] = IDXPTable['STATUSID'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['STATUSID'],'Procedure_Page_Status__c',IBM_Codlist_SV_Data) : '';//P  

                            obj['Procedure_Date__c'] = IDXPTable['trtdt'];
                            
                            obj['Procedure_Completion_Status__c'] = IDXPTable['complete'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['complete'],'Procedure_Completion_Status__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['Type_IA__c'] = IDXPTable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['typ1a'],'Type_IA__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['Unknown__c'] = IDXPTable['typu'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['typu'],'Unknown__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['If_unknown_type_please_explain__c'] = IDXPTable['typucomm'];
                            
                            obj['Did_Adverse_Event_occur_during_procedure__c'] = IDXPTable['any2ndrypx'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['any2ndrypx'],'Did_Adverse_Event_occur_during_procedure__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['concomitant_procedures_performed__c'] = IDXPTable['pconproc'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['pconproc'],'concomitant_procedures_performed__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['Narrative_for_concomitant_procedure__c'] = IDXPTable['reinnar'];
                            
                            obj['subject_converted_to_Open_Surgery__c'] = IDXPTable['idxposyn'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['idxposyn'],'subject_converted_to_Open_Surgery__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['Implanting_Physician_Name__c'] = IDXPTable['PHYS'];
                            
                            obj['Assisting_Physician_s_Name__c'] = IDXPTable['APHYS'];
                            
                            obj['Anesthesia_Type__c'] = IDXPTable['ANESTH'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['ANESTH'],'Anesthesia_Type__c',IBM_Codlist_SV_Data) : '';//P 
                            
                            obj['Nellix_access_type__c'] =  IDXPTable['ACCTYP'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['ACCTYP'],'Nellix_access_type__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['Is_the_aneuysm_s_systomatic__c'] = IDXPTable['AAASYN'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['AAASYN'],'Is_the_aneuysm_s_systomatic__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['Pre_fill__c'] = IDXPTable['PREFILL'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['PREFILL'],'Pre_fill__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['Pre_fill_volume_In_mL__c'] = IDXPTable['PREFILV'];
                            obj['Pre_fill_Pressure_mm_Hg__c'] = IDXPTable['PFILLPR'];
                            obj['Polymer_Fill_Pressure_mm_Hg__c'] = IDXPTable['FILLPR'];
                            obj['First_Break_of_skin__c'] = IDXPTable['OC1'];
                            obj['First_Nellix_catheter_in__c'] = IDXPTable['OC2'];
                            obj['Last_Nellix_Catheter_out__c'] = IDXPTable['OC3'];
                            obj['Final_skin_closure__c'] = IDXPTable['OC4'];
                            obj['Total_procedure_time__c'] = IDXPTable['REINPXTM'];
                            obj['Total_Anesthesia_time__c'] = IDXPTable['ANESTM'];

                            obj['Renal_Arteries_Time__c'] = IDXPTable['RATM']; 
                            obj['Last_Chimney_Catheter_out__c'] = IDXPTable['OCC3'];
                            obj['First_Chimney_catheter_in__c'] = IDXPTable['OCC2'];
                            obj['SMA_time__c'] = IDXPTable['SMATM'];
                            obj['How_many_chimney_stents_were_implanted__c'] =IDXPTable['CHIMNYN'];

                            obj['Contrast_volume_used__c'] = IDXPTable['CONVOL'];
                            obj['Estimated_Blood_loss__c'] = IDXPTable['BLLOSS'];
                            obj['Fluoroscopy_time__c'] = IDXPTable['FLUOTM'];
                            obj['Transfused_volume__c'] = IDXPTable['TRANSFU'];
                            
                            obj['Arterial_repair_during_procedure__c'] = IDXPTable['ARTREP'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['ARTREP'],'Arterial_repair_during_procedure__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['Residual_Endoleak_post_procedure__c'] = IDXPTable['ENDOLK'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['ENDOLK'],'Residual_Endoleak_post_procedure__c',IBM_Codlist_SV_Data) : '';//P
                            obj['Primary_Specialty__c'] = IDXPTable['PSPEC'];

                            mpKey = IDXPTable['visitid']+'_'+IDXPTable['visitseq'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                                
                            }
                            
                        }
                    }

                    //IDXH
                    
                    for(let IDXHTable of IDXHfilters){
                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = IDXHTable['subid']+'_'+IDXHTable['visitid']+'_'+IDXHTable['visitseq'];

                        if(IDXHTable['pageid'] == '20'){

                            obj['Hospital_Admission_Date__c'] = IDXHTable['idxstdt'];
                            obj['Discharge_Date__c'] = IDXHTable['idxendt'];
                            mpKey = IDXHTable['visitid']+'_'+IDXHTable['visitseq'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }
                            
                        }
                    }

                    let ctVisitSeqArry=[];
                    //console.log('mapData : ' , mapData);
                    for(cz=0;cz<= Object.keys(mapData).length;cz++){
                        let key =  Object.keys(mapData)[cz];
                        let uz =  mapData[key];
                        //console.log('mapData : ' , uz);
                        if(uz != undefined){
                            ctVisitSeqArry.push(uz);
                        }
                        
                    }
                    
                    if(ctVisitSeqArry.length>0){

                        if(FinalChevasData.hasOwnProperty(key)){
                            
                            let child = FinalChevasData[key];
                            child.push(...ctVisitSeqArry); 
                            FinalChevasData[key] = child; 
    
                        }else{
                            let child = [];
                            child.push(...ctVisitSeqArry); 
                            //console.log('child : ' , child)
                            FinalChevasData[key] = child;  
                            
                        }
                    }
                }
            }
        }
    }

    console.log('FinalChevasData : ' , Object.keys(FinalChevasData).length);
    return FinalChevasData;
};

const SubjectVisitNinaProcedure =(FUFinalData,CTFinalobj,IDXPFinalobj,IDXHFinalobj,IBM_Codlist_SV_Data) => 
{
    let FinalNinaProcedureData = {};

    for(let j=0; j<= Object.keys(CTFinalobj).length;j++){

        let key = Object.keys(CTFinalobj)[j];

        if (key != undefined && (FUFinalData.hasOwnProperty(key) || CTFinalobj.hasOwnProperty(key))) {

            let Furecords = FUFinalData[key];
            let CTrecords = CTFinalobj[key];
            let IDXPrecords = IDXPFinalobj[key];
            let IDXHrecords = IDXHFinalobj[key];

            let visitIdArry = ['170'];
            for(let k =0;k <= visitIdArry.length;k++){

                if(visitIdArry[k] != undefined){

                    let CTfilters = CTrecords != undefined ? CTrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let FUfilters = Furecords != undefined ? Furecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let IDXPfilters = IDXPrecords != undefined ? IDXPrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let IDXHfilters = IDXHrecords != undefined ? IDXHrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];


                    // FU
                    let mapData ={};
                    for(let FUtable of FUfilters){

                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = FUtable['subid']+'_'+FUtable['visitid']+'_'+FUtable['visitseq'];
                        
                        if(FUtable['pageid'] == '10'){
                    
                            obj['CTMS__Visit_Name__c'] = FUtable['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 
                        
                            mpKey =FUtable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                //console.log('mergeObj : ' , mergeObj);
                                mapData[mpKey] = mergeObj;
                                
    
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }

                        }

                    }

                    //CT 
                    
                    for(let CTtable of CTfilters){
                        let mpKey;

                        //console.log('CTtable Page Id :=:  ' ,CTtable['pageid']);
                        obj['External_Id__c'] = CTtable['subid']+'_'+CTtable['visitid']+'_'+CTtable['visitseq'];
        
                        if(CTtable['pageid'] == '10'){
                        
                            obj['Type_IB_R__c'] = CTtable['typ1br'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1br'],'Type_IB_R__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Type_IB_L__c'] = CTtable['typ1bl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ1bl'],'Type_IB_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Lumbar__c'] = CTtable['typ2lum'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2lum'],'Type_II_Lumbar__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_IMA__c'] = CTtable['typ2ima'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2ima'],'Type_II_IMA__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_II_Sacralis_Mediana__c'] = CTtable['typ2sm'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ2sm'],'Type_II_Sacralis_Mediana__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_R__c'] = CTtable['typ3r'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3r'],'Type_IIIa_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIa_L__c'] = CTtable['typ3l'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3l'],'Type_IIIa_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_R__c'] = CTtable['typ3rb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3rb'],'Type_IIIb_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IIIb_L__c'] = CTtable['typ3lb'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typ3lb'],'Type_IIIb_L__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_R__c'] = CTtable['typivr'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivr'],'Type_IV_R__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Type_IV_L__c'] = CTtable['typivl'] != undefined ? SFDC_Codelist_Mapping_SV(CTtable['typivl'],'Type_IV_L__c',IBM_Codlist_SV_Data) : '';//P 

                            mpKey = CTtable['visitid'];
                            
                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                            
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            
                            }

                        }
                        
                    }

                    
                    //IDXP
                    
                    for(let IDXPTable of IDXPfilters){
                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = IDXPTable['subid']+'_'+IDXPTable['visitid']+'_'+IDXPTable['visitseq'];

                        if(IDXPTable['pageid'] == '10'){
                            
                            obj['Procedure_Page_Status__c'] = IDXPTable['STATUSID'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['STATUSID'],'Procedure_Page_Status__c',IBM_Codlist_SV_Data) : '';//P  

                            obj['Procedure_Date__c'] = IDXPTable['trtdt'];

                            obj['Procedure_Completion_Status__c'] = IDXPTable['complete'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['complete'],'Procedure_Completion_Status__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['Type_IA__c'] = IDXPTable['typ1a'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['typ1a'],'Type_IA__c',IBM_Codlist_SV_Data) : '';//P

                            obj['Unknown__c'] = IDXPTable['typu'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['typu'],'Unknown__c',IBM_Codlist_SV_Data) : '';//P

                            obj['If_unknown_type_please_explain__c'] = IDXPTable['typucomm'];

                            obj['Did_Adverse_Event_occur_during_procedure__c'] = IDXPTable['any2ndrypx'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['any2ndrypx'],'Did_Adverse_Event_occur_during_procedure__c',IBM_Codlist_SV_Data) : '';//P

                            obj['concomitant_procedures_performed__c'] = IDXPTable['pconproc'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['pconproc'],'concomitant_procedures_performed__c',IBM_Codlist_SV_Data) : '';//P

                            obj['Narrative_for_concomitant_procedure__c'] = IDXPTable['reinnar'];

                            obj['subject_converted_to_Open_Surgery__c'] = IDXPTable['idxposyn'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['idxposyn'],'subject_converted_to_Open_Surgery__c',IBM_Codlist_SV_Data) : '';//P
                            
                            obj['Implanting_Physician_Name__c'] = IDXPTable['PHYS'];

                            obj['Assisting_Physician_s_Name__c'] = IDXPTable['APHYS'];

                            obj['Anesthesia_Type__c'] = IDXPTable['ANESTH'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['ANESTH'],'Anesthesia_Type__c',IBM_Codlist_SV_Data) : '';//P 
                            
                            obj['Nellix_access_type__c'] =  IDXPTable['ACCTYP'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['ACCTYP'],'Nellix_access_type__c',IBM_Codlist_SV_Data) : '';//P

                            obj['Is_the_aneuysm_s_systomatic__c'] = IDXPTable['AAASYN'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['AAASYN'],'Is_the_aneuysm_s_systomatic__c',IBM_Codlist_SV_Data) : '';//P

                            obj['Pre_fill__c'] = IDXPTable['PREFILL'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['PREFILL'],'Pre_fill__c',IBM_Codlist_SV_Data) : '';//P

                            obj['Pre_fill_volume_In_mL__c'] = IDXPTable['PREFILV'];
                            obj['Pre_fill_Pressure_mm_Hg__c'] = IDXPTable['PFILLPR'];
                            obj['Polymer_Fill_Pressure_mm_Hg__c'] = IDXPTable['FILLPR'];
                            obj['First_Break_of_skin__c'] = IDXPTable['OC1'];
                            obj['First_Nellix_catheter_in__c'] = IDXPTable['OC2'];
                            obj['Last_Nellix_Catheter_out__c'] = IDXPTable['OC3'];
                            obj['Final_skin_closure__c'] = IDXPTable['OC4'];
                            obj['Total_procedure_time__c'] = IDXPTable['REINPXTM'];
                            obj['Total_Anesthesia_time__c'] = IDXPTable['ANESTM'];
                            obj['Contrast_volume_used__c'] = IDXPTable['CONVOL'];
                            obj['Estimated_Blood_loss__c'] = IDXPTable['BLLOSS'];
                            obj['Fluoroscopy_time__c'] = IDXPTable['FLUOTM'];
                            obj['Transfused_volume__c'] = IDXPTable['TRANSFU'];

                            obj['Arterial_repair_during_procedure__c'] = IDXPTable['ARTREP'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['ARTREP'],'Arterial_repair_during_procedure__c',IBM_Codlist_SV_Data) : '';//P

                            obj['Residual_Endoleak_post_procedure__c'] = IDXPTable['ENDOLK'] != undefined ? SFDC_Codelist_Mapping_SV(IDXPTable['ENDOLK'],'Residual_Endoleak_post_procedure__c',IBM_Codlist_SV_Data) : '';//P

                            obj['Primary_Specialty__c'] = IDXPTable['PSPEC'];

                            mpKey = IDXPTable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                                
                            }
                            
                        }

                    }

                    //IDXH
                    
                    for(let IDXHTable of IDXHfilters){
                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = IDXHTable['subid']+'_'+IDXHTable['visitid']+'_'+IDXHTable['visitseq'];

                        if(IDXHTable['pageid'] == '20'){

                            obj['Hospital_Admission_Date__c'] = IDXHTable['idxstdt'];
                            obj['Discharge_Date__c'] = IDXHTable['idxendt'];

                            mpKey = IDXHTable['visitid'];
                            
                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                mapData[mpKey] = mergeObj;
                                
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                                
                            }
                            
                        }

                    }

                    let ctVisitSeqArry=[];
                    //console.log('mapData : ' , mapData);
                    for(cz=0;cz<= Object.keys(mapData).length;cz++){
                        let key =  Object.keys(mapData)[cz];
                        let uz =  mapData[key];
                        //console.log('mapData : ' , uz);
                        if(uz != undefined){
                            ctVisitSeqArry.push(uz);
                        }
                        
                    }
                    //console.log('ctVisitSeqArry IDXH : ' , ctVisitSeqArry);

                    if(ctVisitSeqArry.length>0){

                        if(FinalNinaProcedureData.hasOwnProperty(key)){
                            
                            let child = FinalNinaProcedureData[key];
                            child.push(...ctVisitSeqArry); 
                            FinalNinaProcedureData[key] = child; 
    
                        }else{
                            let child = [];
                            child.push(...ctVisitSeqArry); 
                            //console.log('child : ' , child)
                            FinalNinaProcedureData[key] = child;  
                            
                        }

                    }
                    
                }

            }
        }
    }
    return FinalNinaProcedureData;

};

const SubjectVisitStudyExit =(FUFinalData,EXITFinalobj,DEATHFinalobj,IBM_Codlist_SV_Data) => 
{

    let FinalStudyExitData = {};

    for(let j=0; j<= Object.keys(EXITFinalobj).length;j++){

        let key = Object.keys(EXITFinalobj)[j];

        if (key != undefined && (FUFinalData.hasOwnProperty(key) || EXITFinalobj.hasOwnProperty(key) || DEATHFinalobj.hasOwnProperty(key))) {

            let FUrecords = FUFinalData[key];
            let EXITrecords = EXITFinalobj[key];
            let DEATHrecords = DEATHFinalobj[key];

            let visitIdArry = ['160'];
            for(let k =0;k <= visitIdArry.length;k++){

                if(visitIdArry[k] != undefined){

                    let EXITfilters = EXITrecords != undefined ? EXITrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let FUfilters = FUrecords != undefined ? FUrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
                    let DEATHfilters = DEATHrecords != undefined ? DEATHrecords.filter(x=> (x.visitid == visitIdArry[k])) : [];
            
                    //console.log('FUfilters : ', FUfilters);
                    //console.log('EXITfilters : ', EXITfilters);
                    //console.log('DEATHfilters : ', DEATHfilters);

                    // FU
                    let mapData ={};
                    /*for(let FUtable of FUfilters){

                        let obj ={};
                        let mpKey;

                            obj['External_Id__c'] = FUtable['subid']+'_'+FUtable['visitid']+'_'+FUtable['visitseq'];
                        
                        if(FUtable['pageid'] == '10'){
                            
                            obj['CTMS__Visit_Name__c'] = FUtable['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(FUtable['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 

                            mpKey =FUtable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                //console.log('mergeObj : ' , mergeObj);
                                mapData[mpKey] = mergeObj;
                                
    
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }

                        }

                    }*/

                    //CT 
                    
                    for(let EXITtable of EXITfilters){
                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = EXITtable['subid']+'_'+EXITtable['visitid']+'_'+EXITtable['visitseq'];

                        if(EXITtable['pageid'] == '10'){
                            
                            obj['Date_of_Study_Exit__c'] = EXITtable['exitdt'];
                            obj['CTMS__Visit_Name__c'] = EXITtable['visitid'] != undefined ? SFDC_Codelist_Mapping_SV(EXITtable['visitid'],'IBM_Visit_ID__c',IBM_Codlist_SV_Data) : '';//P 
                            obj['Reason_for_Study_Exit__c'] = EXITtable['exitrs'] != undefined ? SFDC_Codelist_Mapping_SV(EXITtable['exitrs'],'Reason_for_Study_Exit__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Specify_Reason_for_Withdrawal__c'] = EXITtable['exitptrsn'];
                            obj['Please_specify_the_relatedmAE__c'] = EXITtable['reldaen'];
                            obj['Specify_reason_for_decision_to_withdraw__c'] = EXITtable['exitrssp'];
                            obj['EXIT_Other_specify__c'] = EXITtable['exitrsot'];
                            obj['EXIT_Comments__c'] = EXITtable['pxnar'];
                            obj['Exit_Page_Status__c'] = EXITtable['statusid'] != undefined ? SFDC_Codelist_Mapping_SV(EXITtable['statusid'],'Exit_Page_Status__c',IBM_Codlist_SV_Data) : '';//P 

                            mpKey =EXITtable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                //console.log('mergeObj : ' , mergeObj);
                                mapData[mpKey] = mergeObj;
                                
    
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }
                        }
                    }

                
                    //IDXP
                
                    for(let DEATHtable of DEATHfilters){
                        let obj ={};
                        let mpKey;

                        obj['External_Id__c'] = DEATHtable['subid']+'_'+DEATHtable['visitid']+'_'+DEATHtable['visitseq'];

                        if(DEATHtable['pageid'] == '10'){
    
                            obj['Number_of_calls__c'] = DEATHtable['lost2fu'];
                            obj['Written_correspondence_sent__c'] = DEATHtable['wrtncorsnt'] != undefined ? SFDC_Codelist_Mapping_SV(DEATHtable['wrtncorsnt'],'Written_correspondence_sent__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Primary_Cause_of_Death__c'] = DEATHtable['dthcs'] != undefined ? SFDC_Codelist_Mapping_SV(DEATHtable['dthcs'],'Primary_Cause_of_Death__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Was_the_Nellix_device_s_explanted__c'] = DEATHtable['explant'] != undefined ? SFDC_Codelist_Mapping_SV(DEATHtable['explant'],'Was_the_Nellix_device_s_explanted__c',IBM_Codlist_SV_Data) : '';//P 

                            obj['Other_device_s_explanted__c'] = DEATHtable['explantots'];
                            
                            mpKey =DEATHtable['visitid'];

                            if(mapData.hasOwnProperty(mpKey)){

                                let mergeObj = {...mapData[mpKey],...obj};
                                //console.log('mergeObj : ' , mergeObj);
                                mapData[mpKey] = mergeObj;
                                
    
                            }else{
                                if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                                    mapData[mpKey] = obj;
                                }
                            }
                        }
                    }

                    let exitVisitSeqArry=[];
                    //console.log('mapData : ' , mapData);
                    for(cz=0;cz<= Object.keys(mapData).length;cz++){
                        let key =  Object.keys(mapData)[cz];
                        let uz =  mapData[key];
                        //console.log('mapData : ' , uz);
                        if(uz != undefined){
                            exitVisitSeqArry.push(uz);
                        }
                        
                    }
                    
                    if(exitVisitSeqArry.length>0){

                        if(FinalStudyExitData.hasOwnProperty(key)){
                            
                            let child = FinalStudyExitData[key];
                            child.push(...exitVisitSeqArry); 
                            FinalStudyExitData[key] = child; 
    
                        }else{
                            let child = [];
                            child.push(...exitVisitSeqArry); 
                            //console.log('child : ' , child)
                            FinalStudyExitData[key] = child;  
                            
                        }

                    }
                    
                }

            }
        }
    }
    return FinalStudyExitData;

};

const sfdcConnFn =(jsforce) => {

    return new Promise(function(resolve, reject) {
        var conn = new jsforce.Connection({
            // you can change loginUrl to connect to sandbox or prerelease env.
            loginUrl : (process.env.url || 'https://test.salesforce.com')
            });
            conn.login((process.env.username||'sbellary@endologix.com.endodev'), (process.env.password || 'Endologix@2022'), function(err, userInfo) {
            if (err) { 
                var resp={
                    con :'error',
                    status:'400'
                };
                reject(resp);
                //console.error(err); 
            }
            else{
                //logger.debug(conn.instanceUrl);
                //console.log("User ID: " + userInfo.id);
                //console.log("Org ID: " + userInfo.organizationId);
                var resp={
                    con :conn,
                    status:'200'
                };
                resolve(resp);
            }//sucess conn else
            });//conn login fn.
    })
};

function ibmCodelistConverter(codelistArry){
    let ibmCodelistObj = {};
    //console.log('codelistArry :' , codelistArry);

    for(let vs=0;vs < codelistArry.length;vs++){

        if(codelistArry[vs] != undefined && codelistArry[vs] != ''){
            
            /*console.log('arr : ' , codelistArry[vs]);
            console.log('0 : ' , codelistArry[vs].split('=')[0].trim());
            console.log('1 : ' , codelistArry[vs].split('=')[1].trim());*/

            ibmCodelistObj[codelistArry[vs].split('=')[0].trim()] = codelistArry[vs].split('=')[1].trim();
        }
    }
    //console.log('ibmCodelistObj : ', ibmCodelistObj);
    return ibmCodelistObj;

}

const IBMCodlist =(sfdc,FinalSubjectVisitData) => 
{
    let ObjCodelist ={};
    let FinalSubjectVisitDataToSFDCArray =[];
    return new Promise((resolve,reject)=>
    {
        try{
            
            let SFDCSubjectVisitData;

            sfdc.con.sobject("CTMS__Subject__c")
            .find([{ CTMS__External_ID__c : Object.keys(FinalSubjectVisitData) }],["Id","CTMS__Site__c","CTMS__Program__c","CTMS__External_ID__c"],null) 
            .execute(function (err, results) { 
                //console.log(results);
                //console.log(err);

                if(results){
                    SFDCSubjectVisitData = results;

                    if(SFDCSubjectVisitData != undefined) {

                        try{ //Object.keys(FinalSubjectVisitData).length
                            for(let y=0;y< Object.keys(FinalSubjectVisitData).length ;y++){  
                                
                                let key = Object.keys(FinalSubjectVisitData)[y];
                                let svObject = FinalSubjectVisitData[key];
                                //console.log('svObject : ' , svObject);

                                if(key != undefined && svObject != undefined) {
                    
                                    let subject = SFDCSubjectVisitData.find(x=> (x['CTMS__External_ID__c'] == key));
                                    let subject_Obj={};

                                    subject_Obj['CTMS__Program__c'] = subject.CTMS__Program__c != undefined ? subject.CTMS__Program__c : null;
                                    subject_Obj['CTMS__Site__c'] = subject.CTMS__Site__c != undefined ? subject.CTMS__Site__c : null;
                                    subject_Obj['CTMS__Subject__c'] = subject.Id != undefined ? subject.Id : null;

                                    for(let sv of svObject){
                                        
                                        /*if(sv['External_Id__c'] == '611687_160_0' || sv['External_Id__c'] == '611964_160_0'){
                                            console.log('SV : ' ,sv);
                                            let merge_Obj = {...sv,...subject_Obj};
                                            FinalSubjectVisitDataToSFDCArray.push(merge_Obj);
                                        }*/
                                        let merge_Obj = {...sv,...subject_Obj};
                                        FinalSubjectVisitDataToSFDCArray.push(merge_Obj);
                                    }
                                }
                            }

                        }catch(err){
                            console.log('Error OCCURED : ', err);
                        }

                        console.log('Final Subject Visit Data To SFDC Array : ',FinalSubjectVisitDataToSFDCArray.length)
                        //console.log('FinalSubjectVisitDataToSFDCArray 4040 : ', FinalSubjectVisitDataToSFDCArray.length);

                    }
                    ObjCodelist['status']='success';
                    ObjCodelist['result']= FinalSubjectVisitDataToSFDCArray;
                    resolve(ObjCodelist);
                }

                if(err){
                    console.log('eror::',err);
            
                    ObjCodelist['status']='error';
                    ObjCodelist['result']= err;
                    reject(ObjCodelist);
                }
                
            });
    
        }catch(err){

            console.log('eror::',err);
            
            ObjCodelist['status']='error';
            ObjCodelist['result']= err;
            reject(ObjCodelist);

        }
    });
};

const finalSubjectVisitInsertion = (sfdc,FinalSubjectVisitDataToSFDCArray,Obj_Name) =>{

    let ObjCodelist = {};
    return new Promise((resolve,reject)=>
    {
        try{

            sfdc.con.bulk.pollInterval = 5000;
            sfdc.con.bulk.PollingTimeout = 60000;
            sfdc.con.sobject(Obj_Name).upsertBulk(FinalSubjectVisitDataToSFDCArray, "External_Id__c", (error, result) => {
                
                if (error) {
                    console.log('err : ',error);

                    if (error.name =='PollingTimeout') {
                        ObjCodelist['status']='error';
                        ObjCodelist['result']= 'PollingTimeout';
                        reject(ObjCodelist);
                    } 
                    else {
                        ObjCodelist['status']='error';
                        ObjCodelist['result']= 'Some other error';
                        reject(ObjCodelist);
                    }
                }
                if(result){
                    ObjCodelist['status']='success';
                    ObjCodelist['result']= 'IBM Fecthing Data is success!!';
                    resolve(ObjCodelist);
                
                } 
            });

            
        }catch(error){
            console.log('eror::',error);
            
            ObjCodelist['status']='error';
            ObjCodelist['result']= error;
            reject(ObjCodelist);

        }
    });


};

const SV_Promises = (all_Promises) =>{

    let ObjCodelist ={};
    let Failed_Promises = [];

    return new Promise((resolve,reject)=>
    {
        try{

            Promise.allSettled(all_Promises).then((results) => 
    
                results.forEach((result) => {
    
                    console.log('Res : ' , result);
                
                    if(result['status'] == 'rejected'){
    
                        //let failed_Res = result;
                        console.log('failed_Res : ', result['reason']['chunk']);
                    
                    }

                    ObjCodelist['status']='success';
                    ObjCodelist['result']= Failed_Promises;
                    resolve(ObjCodelist);
                }));
    
        //console.log('retry_Promise : ' , retry_Promise.length);
        }catch (error){
    
            console.log('error : ' , error);
            ObjCodelist['status']='error';
            ObjCodelist['result']= error;
            reject(ObjCodelist);

    
        }
    });
};

const missing_SV_Data_Find =(sfdc,all_Array)=>{

    let SV_Eternal_Ids = [];
    let sfdc_Eternal_Ids = [];
    

    for(let mm =0;mm<all_Array.length;mm++){
        let arr_Obj =all_Array[mm];

        /*if(arr_Obj['External_Id__c'] == '496774_40_0' || arr_Obj['External_Id__c'] =='507595_40_0' || arr_Obj['External_Id__c'] == '523386_40_0'){
            console.log('arr_Obj : ' , arr_Obj);
        }*/
        SV_Eternal_Ids.push(arr_Obj['External_Id__c']);
    }

    console.log('SV_Eternal_Ids : ' , SV_Eternal_Ids.length);

    sfdc.con.sobject("CTMS__Subjects_Visit__c")
    .find(["Id","External_Id__c"],null) 
    .execute(function (error, Results) 
    { 
        console.log('Results : ', Results.length);
        for(let i=0;i< Results.length;i++){

            //console.log( 'Results EXT : ', Results[i]['External_Id__c']);
            sfdc_Eternal_Ids.push(Results[i]['External_Id__c']);
            
        }

        console.log('sfdc_Eternal_Ids : ' ,sfdc_Eternal_Ids.length);
        
        let difference = SV_Eternal_Ids.filter(x => !sfdc_Eternal_Ids.includes(x));
        console.log('difference : ' ,difference);

    });


};

//---------------------------- Subject visit  END ------------------------------------------------------

const IBM_studyId = (sfdc,studyExternalId) =>{

    let studyData={};
    
    return new Promise((resolve,reject)=>
    {
        try{
            
            let studyId;
            sfdc.con.sobject("CTMS__Program__c")
            .find([{ CTMS__External_ID__c : studyExternalId }],["Id","CTMS__External_ID__c"],null) 
            .execute(function (error, studyResults) { 
                //console.log('studyResults : ', studyResults);

                if(studyResults){

                    for(let key in studyResults){
                        studyId = studyResults[key].Id;
                    }
                    studyData['status']='success';
                    studyData['result']= studyId;
                    resolve(studyData);

                }else{
                    studyData['status']='error';
                    studyData['result']= 'Error fetching study id.';
                    resolve(studyData);
                }
                if(error){

                    studyData['status']='error';
                    studyData['result']= 'Error fetching study id.';
                    resolve(studyData);

                }
                
            });

            
        }catch(error){

            console.log('eror::',error);
            
            studyData['status']='error';
            studyData['result']= error;
            reject(studyData);

        }

    });

};

const IBM_parseTemplateData = (sfdc,studyRecId) =>{

    let templateObj = {};
    
    return new Promise((resolve,reject)=>
    {
        try{
        
            let templateData = {};
            sfdc.con.sobject("CTMS__eCRF_Template__c")
            .find([{ Clinical_Study__c : studyRecId}],["Id","Clinical_Study__c","Type__c"],null) 
            .execute(function (error, templateResults) { 
                //console.log('templateResults : ', templateResults);

                if(templateResults){

                    for(let key in templateResults){
                    
                        templateData[templateResults[key].Id] =  templateResults[key].Type__c;
                    
                    }

                    templateObj['status']='success';
                    templateObj['result']= templateData;
                    resolve(templateObj);

                }else{
                    templateObj['status']='error';
                    templateObj['result']= 'Error fetching Template Data.';
                    resolve(templateObj);
                }

            });


        }catch(error){

            console.log('eror::',error);
            
            templateObj['status']='error';
            templateObj['result']= error;
            reject(templateObj);

        }

    });
}

const IBM_parseTemplateContentData = (sfdc,templateData) =>{

    let templateContentObj = {};
    
    return new Promise((resolve,reject)=>
    {
        try{

            let templateContentData = {};
            sfdc.con.sobject("CTMS__eCRF_Template_Content__c")
            .find([{ eCRF_Template__c : Object.keys(templateData)}],["Id","Field_Object_Identifier__c","Question__c","CTMS_Check_List_Question__c","CTMS__Sequence_ID__c","eCRF_Template__c"],null)
            .orderby("CTMS__Sequence_ID__c", "ASC")
            .execute(function (error, templateContentResults) { 
                
                if(templateContentResults){

                    for(let key in templateContentResults){
                        //console.log('template Content Results : ', templateData[templateContentResults[key].eCRF_Template__c]);

                        if(templateContentData.hasOwnProperty(templateData[templateContentResults[key].eCRF_Template__c])){
                            
                            let childObjMain = {};
                            let childObj = {};
                        
                            childObj['Field_Object_Identifier__c'] = templateContentResults[key].Field_Object_Identifier__c;
                            childObj['Question__c'] = templateContentResults[key].CTMS_Check_List_Question__c;
                            //childObj['CTMS__Sequence_ID__c'] = templateContentResults[key].CTMS__Sequence_ID__c;

                            childObjMain[templateContentResults[key].Field_Object_Identifier__c] =childObj;

                            let childArry = templateContentData[templateData[templateContentResults[key].eCRF_Template__c]];
                            
                            childArry.push(childObjMain);

                            templateContentData[templateData[templateContentResults[key].eCRF_Template__c]] =  childArry;

                        }else{

                            let childObjMain = {};
                            let childObj = {};
                            let childArry = [];
                            
                            childObj['Field_Object_Identifier__c'] = templateContentResults[key].Field_Object_Identifier__c;
                            childObj['Question__c'] = templateContentResults[key].CTMS_Check_List_Question__c;
                            //childObj['CTMS__Sequence_ID__c'] = templateContentResults[key].CTMS__Sequence_ID__c;
                            
                            childObjMain[templateContentResults[key].Field_Object_Identifier__c] =childObj;
                            
                            //console.log('childObjMain : ' , childObjMain)
                            childArry.push(childObjMain);

                            templateContentData[templateData[templateContentResults[key].eCRF_Template__c]] =  childArry;

                        }
                    
                    }

                    templateContentObj['status']='success';
                    templateContentObj['result']= templateContentData;
                    resolve(templateContentObj);

                }else{
                    templateContentObj['status']='error';
                    templateContentObj['result']= 'Error fetching Template content Data.';
                    resolve(templateContentObj);
                }

                //console.log('template Content Obj : ', templateContentObj['result']);

            });


        }catch(error){

            console.log('eror::',error);
            
            templateContentObj['status']='error';
            templateContentObj['result']= error;
            reject(templateContentObj);

        }

    });
}

//---------------------------- AE Items  START ------------------------------------------------------

const SFDC_IBM_Codelist_AE = (sfdc)=>{

    let final_Codelist_Obj={};
    let IBM_Codelist_Obj={};

    return new Promise((resolve,reject)=>
    {   
        try{
            let Picklist_Field_APIs= ['Visit_Page_Status__c','AE_Clasification__c','Specify__c','Please_choose_one__c','choose_one__c','AE_Code_Bleeding_Anemia__c',
                                    'AE_Code_Pulmonary__c','AE_Code_Cardiac__c','AE_Code_Renal__c','AE_Code_Surgical_Site_Wound__c','AE_Code_Bowel__c',
                                    'AE_Code_Neurological__c','AE_Code_Vascular__c','AE_Code_Nelix_Device__c','AE_Code_Miscellaneous__c',
                                    'AE_Code_Urogenital__c','AE_Code_Malignancies__c','AE_Code_Chimney_Device__c','Blockage_in_Nellix_Device__c',
                                    'Blockage_in_Chimney_Device__c','Outcome__c','Severity__c','Unanticipated_Adverse_Device_Effect__c',
                                    'Death__c','Event_Related_to_Procedure__c','Event_Related_to_Nellix_System__c','Side_of_the_Nellix_device__c',
                                    'Action_Taken__c','Object_Name__c','Status_Id__c','Device_Related_Event_Internal__c',
                                    'UADE_Text__c','Procedure_Related_Event__c','Major_Adverse_Event__c','AE_result_in_aneurysm_rupture__c',
                                    'Does_the_event_need_adjudication__c','Additional_Comments_by_Safety__c','Please_choose_the_SOC__c',
                                    'Procedure_Type__c', 'Reason_for_Procedure__c','Was_this_Procedure_to_Treat_Endoleak__c','Reason_for_Procedure_1M__c',
                                    'Was_this_Procedure_to_Treat_Endoleak_1M__c', 'Did_this_procedure_result_from_migration__c',
                                    'CEC_Specify__c','CEC_AE_Code_Bleeding_Anemia__c','CEC_AE_Code_Pulmonary__c','Serious__c',
                                    'CEC_Please_choose_one__c','CEC_AE_Code_Cardiac__c','CEC_AE_Code_Renal__c','CEC_choose_one__c',
                                    'CEC_AE_Code_Surgical_Site_Wound__c','CEC_AE_Code_Bowel__c','CEC_AE_Code_Nellix_Device__c',
                                    'CEC_Please_choose__c','CEC_AE_Code_Chimney_Device__c','CEC_Please_choose_one_Value__c','CEC_AE_Code_Miscellaneous__c',
                                    'CEC_AE_Code_Urogenital__c','CEC_AE_Code_Malignancies__c','CEC_Severity__c','CEC_AE_Code_Neurological__c',
                                    'CEC_Unanticipated_Adverse_Device_Effect__c','Serious_Event__c','Reason_for_Serious__c','Related_to_Procedure__c',
                                    'Related_to_Nellix_System__c','CEC_Major_Adverse_Event__c','patient_die_as_a_result_of_this_event__c',
                                    'Was_this_death_AAA_related__c','Death_relatedness__c','Indicate_which_MAE__c','CEC_AE_Classification__c'];

            
            //console.log('Picklist_Field_APIs : ' , Picklist_Field_APIs.length);  
            sfdc.con.sobject("IBM_Codelist__c")
            .find([{ Object_Name__c : 'Adverse Event' }],Picklist_Field_APIs,null) 
            .execute(function (error, sfdc_CodeList_Results) { 
                    
                //console.log('sfdc_CodeList_Results : ' , sfdc_CodeList_Results);

                if(sfdc_CodeList_Results.length > 0){
                    for(let i=0;i<sfdc_CodeList_Results.length;i++){

                        let ibm_SFDC_Object_Fields = Object.keys(sfdc_CodeList_Results[i]);
                        
                        //console.log('All  : ' , ibm_SFDC_Object_Fields.length);

                        for(let j=0; j< ibm_SFDC_Object_Fields.length; j++){
                            
                            //console.log('J : ' , ibm_SFDC_Object_Fields[j]); 
                            if(ibm_SFDC_Object_Fields[j] != 'attributes' && ibm_SFDC_Object_Fields[j] != 'Object_Name__c'){
                                
                                let code_key =ibm_SFDC_Object_Fields[j];
                                let code_list = ibmCodelistConverter(sfdc_CodeList_Results[i][code_key].split('___'));

                                IBM_Codelist_Obj[code_key] = code_list;
                                
                            }

                        }
                    }

                    //console.log('IBM_Codelist_Obj :' , IBM_Codelist_Obj);
                    final_Codelist_Obj['status']='success';
                    final_Codelist_Obj['result']= IBM_Codelist_Obj;
                    resolve(final_Codelist_Obj);
                
                }
                if(error){
                    console.log('error : ' , error);
                    final_Codelist_Obj['status']='error';
                    final_Codelist_Obj['result']= error;
                    reject(final_Codelist_Obj);
                }
                
            });

        }catch(error){

            console.log('eror::',err);
        
            final_Codelist_Obj['status']='error';
            final_Codelist_Obj['result']= err;
            reject(final_Codelist_Obj);

        }
    });
}

const IBM_Parse_AE_Data = (AE_Data,IBM_CEC_Data,SFDC_Codelist_Data)=>{

    let final_AE_obj={};

    //AE_Data : IBM REINT Table Data for AE.
    let AE_AEItems_Obj=[];

    return new Promise((resolve,reject)=>
    {   
        try{

            console.log('SFDC_Codelist_Data : ',Object.keys(SFDC_Codelist_Data).length);

            let map_Data ={};

            for (let x=0 ;x< Object.keys(AE_Data).length;x++) {
            
                let obj ={};
                let key;

                let subid_Obj = AE_Data[x]['value'].find(x=> (x['colname'] == 'SUBID'));
                let subnum =  AE_Data[x]['value'].find(x=> (x['colname'] == 'SUBNUM')); 
                let visitid_Obj =  AE_Data[x]['value'].find(x=> (x['colname'] == 'VISITID')); 
                let visitseq_Obj =  AE_Data[x]['value'].find(x=> (x['colname'] == 'VISITSEQ')); 
                let pageid_Obj =  AE_Data[x]['value'].find(x=> (x['colname'] == 'PAGEID')); 
                let pageseq_Obj =  AE_Data[x]['value'].find(x=> (x['colname'] == 'PAGESEQ'));
                let STATUSID =  AE_Data[x]['value'].find(x=> (x['colname'] == 'STATUSID'));
                
                key = subid_Obj['$t']+'_'+visitid_Obj['$t']+'_'+visitseq_Obj['$t'];

                if(visitid_Obj['$t'] == '130' && pageid_Obj['$t'] == '10'){

                    let AESEQ =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AESEQ'));   
                    let AECAT =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECAT'));   
                    let AECATSUB =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECATSUB'));   
                    let AECATSUBSP =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECATSUBSP'));   
                    let RESPFLR =  AE_Data[x]['value'].find(x=> (x['colname'] == 'RESPFLR'));   
                    let AEDOCSTN =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AEDOCSTN'));   
                    let AECODE01 =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECODE01'));   
                    let AECODE02 =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECODE02'));   
                    let AECODE03 =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECODE03'));   
                    let AECODE04 =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECODE04'));   
                    let AECODE05 =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECODE05'));   
                    let AECODE06 =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECODE06'));   
                    let AECODE07 =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECODE07'));   
                    let AECODE08 =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECODE08'));   
                    let AECODE09 =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECODE09'));  
                    let AECODE10 =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECODE10'));   
                    let AECODE11 =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECODE11'));   
                    let AECODE12 =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECODE12'));   
                    let AECODE14 =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECODE14'));
                    let AEOCSTN =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AEOCSTN'));   
                    let AECOCSTN =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AECOCSTN'));    
                    let AEOTHSP =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AEOTHSP'));   
                    let AEDESC =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AEDESC'));   
                    let AESTDT =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AESTDT'));  
                    let DAYSPO =  AE_Data[x]['value'].find(x=> (x['colname'] == 'DAYSPO'));   
                    let AEOUT =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AEOUT'));   
                    let AEENDT =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AEENDT'));   
                    let AESEV =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AESEV'));   
                    let UADE =  AE_Data[x]['value'].find(x=> (x['colname'] == 'UADE'));
                    let UADEDT =  AE_Data[x]['value'].find(x=> (x['colname'] == 'UADEDT'));   
                    let AESAE =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AESAE')); 
                    let AESAERS =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AESAERS'));     
                    let MLTSER =  AE_Data[x]['value'].find(x=> (x['colname'] == 'MLTSER'));   
                    let AESAEOT =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AESAEOT'));   
                    let RELPROC =  AE_Data[x]['value'].find(x=> (x['colname'] == 'RELPROC'));   
                    let PROCDEATH =  AE_Data[x]['value'].find(x=> (x['colname'] == 'PROCDEATH'));   
                    let RELDEV =  AE_Data[x]['value'].find(x=> (x['colname'] == 'RELDEV'));   
                    let DEVDEATH =  AE_Data[x]['value'].find(x=> (x['colname'] == 'DEVDEATH'));   
                    let NLXSIDE =  AE_Data[x]['value'].find(x=> (x['colname'] == 'NLXSIDE'));   
                    let AEACN =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AEACN'));   
                    let AEACNOT =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AEACNOT'));   
                    let PXADPXN =  AE_Data[x]['value'].find(x=> (x['colname'] == 'PXADPXN'));   
                    let MLTACT =  AE_Data[x]['value'].find(x=> (x['colname'] == 'MLTACT'));   
                    let AENAR =  AE_Data[x]['value'].find(x=> (x['colname'] == 'AENAR'));  
                    
                    obj['AE_sequence_Number__c'] =  AESEQ['$t'] != undefined ? AESEQ['$t'] : '';
                    obj['Comments_for_multiple_reasons__c'] = MLTSER['$t'] != undefined ? MLTSER['$t'] : '';
                    obj['AE_other_specify__c'] = AESAEOT['$t'] != undefined ? AESAEOT['$t'] : '';
                    obj['Death_Related_to_Procedure__c'] = PROCDEATH['$t'] != undefined ? PROCDEATH['$t'] : '';
                    obj['Death_Related_to_Device__c'] = DEVDEATH['$t'] != undefined ? DEVDEATH['$t'] : '';
                    obj['other_specify__c'] =  AECATSUBSP['$t'] != undefined ? AECATSUBSP['$t'] : '';
                    obj['AE_If_other_specify__c'] = AEOTHSP['$t'] != undefined ? AEOTHSP['$t'] : '';
                    obj['AE_Description__c'] = AEDESC['$t'] != undefined ? AEDESC['$t'] : '';
                    obj['Onset_Date__c'] = AESTDT['$t'] != undefined ? AESTDT['$t'] : '';
                    obj['Days_Post_Op__c'] = DAYSPO['$t'] != undefined ? DAYSPO['$t'] : '';
                    obj['Resolution_Date__c'] = AEENDT['$t'] != undefined ? AEENDT['$t'] : '';
                    obj['Date_reported_to_Sponsor__c'] = UADEDT['$t'] != undefined ? UADEDT['$t'] : '';
                    obj['Adverse_Event_other_Specify__c'] = AEACNOT['$t'] != undefined ? AEACNOT['$t'] : '';
                    obj['AAA_Related_secondary_procedures__c'] = PXADPXN['$t'] != undefined ? PXADPXN['$t'] : '';
                    obj['Comments_for_multiple_actions_taken__c'] = MLTACT['$t'] != undefined ? MLTACT['$t'] : '';
                    obj['Narrative__c'] = AENAR['$t'] != undefined ? AENAR['$t'] : '';

                    obj['Visit_Page_Status__c'] = STATUSID['$t'] != undefined ? SFDC_Codelist_Mapping(STATUSID,'Visit_Page_Status__c',SFDC_Codelist_Data) : '';
                    obj['AE_Clasification__c'] = AECAT['$t'] != undefined ? SFDC_Codelist_Mapping(AECAT,'AE_Clasification__c',SFDC_Codelist_Data) : '';
                    //obj['Specify__c'] = AECATSUB['$t'];
                    obj['Please_choose_one__c'] =  RESPFLR['$t'] != undefined ? SFDC_Codelist_Mapping(RESPFLR,'Please_choose_one__c',SFDC_Codelist_Data) : '';
                    obj['choose_one__c'] =  AEDOCSTN['$t'] != undefined ? SFDC_Codelist_Mapping(AEDOCSTN,'choose_one__c',SFDC_Codelist_Data) : '';
                    obj['AE_Code_Bleeding_Anemia__c'] =  AECODE01['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE01,'AE_Code_Bleeding_Anemia__c',SFDC_Codelist_Data) : '';
                    obj['AE_Code_Pulmonary__c'] =  AECODE02['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE02,'AE_Code_Pulmonary__c',SFDC_Codelist_Data) : '';
                    obj['AE_Code_Cardiac__c'] =  AECODE03['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE03,'AE_Code_Cardiac__c',SFDC_Codelist_Data) : '';
                    obj['AE_Code_Renal__c'] =  AECODE04['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE04,'AE_Code_Renal__c',SFDC_Codelist_Data) : '';
                    obj['AE_Code_Surgical_Site_Wound__c'] =  AECODE05['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE05,'AE_Code_Surgical_Site_Wound__c',SFDC_Codelist_Data) : '';
                    obj['AE_Code_Bowel__c'] =  AECODE06['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE06,'AE_Code_Bowel__c',SFDC_Codelist_Data) : '';
                    obj['AE_Code_Neurological__c'] =  AECODE07['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE07,'AE_Code_Neurological__c',SFDC_Codelist_Data) : '';
                    obj['AE_Code_Vascular__c'] =  AECODE08['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE08,'AE_Code_Vascular__c',SFDC_Codelist_Data) : '';
                    obj['AE_Code_Nelix_Device__c'] =  AECODE09['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE09,'AE_Code_Nelix_Device__c',SFDC_Codelist_Data) : '';
                    obj['AE_Code_Miscellaneous__c'] =  AECODE10['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE10,'AE_Code_Miscellaneous__c',SFDC_Codelist_Data) : '';
                    obj['AE_Code_Urogenital__c'] =  AECODE11['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE11,'AE_Code_Urogenital__c',SFDC_Codelist_Data) : '';
                    obj['AE_Code_Malignancies__c'] =  AECODE12['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE12,'AE_Code_Malignancies__c',SFDC_Codelist_Data) : '';
                    obj['AE_Code_Chimney_Device__c'] =  AECODE14['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE14,'AE_Code_Chimney_Device__c',SFDC_Codelist_Data) : '';
                    obj['Blockage_in_Nellix_Device__c'] =  AEOCSTN['$t'] != undefined ? SFDC_Codelist_Mapping(AEOCSTN,'Blockage_in_Nellix_Device__c',SFDC_Codelist_Data) : '';
                    obj['Blockage_in_Chimney_Device__c'] =  AECOCSTN['$t'] != undefined ? SFDC_Codelist_Mapping(AECOCSTN,'Blockage_in_Chimney_Device__c',SFDC_Codelist_Data) : '';
                    obj['Outcome__c'] =  AEOUT['$t'] != undefined ? SFDC_Codelist_Mapping(AEOUT,'Outcome__c',SFDC_Codelist_Data) : '';
                    obj['Severity__c'] =  AESEV['$t'] != undefined ? SFDC_Codelist_Mapping(AESEV,'Severity__c',SFDC_Codelist_Data) : '';
                    obj['Unanticipated_Adverse_Device_Effect__c'] =  UADE['$t'] != undefined ? SFDC_Codelist_Mapping(UADE,'Unanticipated_Adverse_Device_Effect__c',SFDC_Codelist_Data) : '';
                    obj['CTMS__Serious__c'] =  AESAE['$t'] != undefined ? SFDC_Codelist_Mapping(AESAE,'Serious__c',SFDC_Codelist_Data) : '';
                    obj['Death__c'] =  AESAERS['$t'] != undefined ? SFDC_Codelist_Mapping(AESAERS,'Death__c',SFDC_Codelist_Data) : '';
                    obj['Event_Related_to_Procedure__c'] =  RELPROC['$t'] != undefined ? SFDC_Codelist_Mapping(RELPROC,'Event_Related_to_Procedure__c',SFDC_Codelist_Data) : '';
                    obj['Event_Related_to_Nellix_System__c'] =  RELDEV['$t'] != undefined ? SFDC_Codelist_Mapping(RELDEV,'Event_Related_to_Nellix_System__c',SFDC_Codelist_Data) : '';
                    obj['Side_of_the_Nellix_device__c'] =  NLXSIDE['$t'] != undefined ? SFDC_Codelist_Mapping(NLXSIDE,'Side_of_the_Nellix_device__c',SFDC_Codelist_Data) : '';
                    obj['Action_Taken__c'] =  AEACN['$t'] != undefined ? SFDC_Codelist_Mapping(AEACN,'Action_Taken__c',SFDC_Codelist_Data) : '';
                    obj['CTMS__Subject__c'] = subid_Obj['$t'];
                    obj['CTMS__External_ID__c'] = key;

                }else if(visitid_Obj['$t'] == '130' && pageid_Obj['$t'] == '30'){

                    let SOC = AE_Data[x]['value'].find(x=> (x['colname'] == 'SOC'));   
                    let DEVRELS = AE_Data[x]['value'].find(x=> (x['colname'] == 'DEVRELS'));   
                    let UADE = AE_Data[x]['value'].find(x=> (x['colname'] == 'UADE'));   
                    let PXRELS = AE_Data[x]['value'].find(x=> (x['colname'] == 'PXRELS'));   
                    let MAES = AE_Data[x]['value'].find(x=> (x['colname'] == 'MAES'));   
                    let RSLTRPTR = AE_Data[x]['value'].find(x=> (x['colname'] == 'RSLTRPTR'));   
                    let ADJYN = AE_Data[x]['value'].find(x=> (x['colname'] == 'ADJYN'));   
                    let REV = AE_Data[x]['value'].find(x=> (x['colname'] == 'REV'));   
                    let COMS = AE_Data[x]['value'].find(x=> (x['colname'] == 'COMS'));   

                    obj['Date_Review_by_Safety__c'] =  REV['$t'] != undefined ? REV['$t'] : '';

                    obj['Additional_Comments_by_Safety__c'] =  COMS['$t'] != undefined ? COMS['$t'] : '';
                    obj['Please_choose_the_SOC__c'] =  SOC['$t'] != undefined ? SFDC_Codelist_Mapping(SOC,'Please_choose_the_SOC__c',SFDC_Codelist_Data) : '';
                    obj['Device_Related_Event_Internal__c'] =  DEVRELS['$t'] != undefined ? SFDC_Codelist_Mapping(DEVRELS,'Device_Related_Event_Internal__c',SFDC_Codelist_Data) : '';
                    obj['UADE_Text__c'] =  UADE['$t'] != undefined ? SFDC_Codelist_Mapping(UADE,'UADE_Text__c',SFDC_Codelist_Data) : '';
                    obj['Procedure_Related_Event__c'] =  PXRELS['$t'] != undefined ? SFDC_Codelist_Mapping(PXRELS,'Procedure_Related_Event__c',SFDC_Codelist_Data) : '';
                    obj['Major_Adverse_Event__c'] =  MAES['$t'] != undefined ? SFDC_Codelist_Mapping(MAES,'Major_Adverse_Event__c',SFDC_Codelist_Data) : '';
                    obj['AE_result_in_aneurysm_rupture__c'] =  RSLTRPTR['$t'] != undefined ? SFDC_Codelist_Mapping(RSLTRPTR,'AE_result_in_aneurysm_rupture__c',SFDC_Codelist_Data) : '';
                    obj['Does_the_event_need_adjudication__c'] =  ADJYN['$t'] != undefined ? SFDC_Codelist_Mapping(ADJYN,'Does_the_event_need_adjudication__c',SFDC_Codelist_Data) : '';
                    obj['CTMS__Subject__c'] = subid_Obj['$t'];
                    obj['CTMS__External_ID__c'] = key;
                
                }

                if(visitid_Obj['$t'] == '130' && (pageid_Obj['$t'] == '10' || pageid_Obj['$t'] == '30')){

                    if(map_Data.hasOwnProperty(key)){

                        let merge_Obj = {...map_Data[key],...obj};
                        map_Data[key] = merge_Obj;
                    
                    }else{
                        if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                            map_Data[key] = obj;
                        }
                    
                    }

                }
                
            }

            //console.log('AE :' , map_Data['646708_40_0']);
            //console.log('AE :' , map_Data['575316_130_1']);

            //IBM_CEC_Data

            for (let x=0 ;x< Object.keys(IBM_CEC_Data).length;x++) {
            
                let obj ={};
                let key;

                let SUBID = IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'SUBID'));
                let SUBNUM =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'SUBNUM')); 
                let VISITID =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'VISITID')); 
                let VISITSEQ =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'VISITSEQ')); 
                let PAGEID =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'PAGEID')); 
                let PAGESEQ =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'PAGESEQ'));
                let STATUSID =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'STATUSID'));

                key = SUBID['$t']+'_'+VISITID['$t']+'_'+VISITSEQ['$t'];

                if(VISITID['$t'] == '130' && PAGEID['$t'] == '90'){

                    let CECDT =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'CECDT'));
                    let AECAT =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECAT'));
                    let AECATSUB =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECATSUB'));
                    let AECATSUBSP =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECATSUBSP'));
                    let AECODE01 =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECODE01'));
                    let AECODE02 =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECODE02'));
                    let RESPFLR =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'RESPFLR'));
                    let AECODE03 =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECODE03'));
                    let AECODE04 =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECODE04'));
                    let AEDOCSTN =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AEDOCSTN'));
                    let AECODE05 =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECODE05'));
                    let AECODE06 =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECODE06'));
                    let AECODE07 =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECODE07'));
                    let AECODE09 =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECODE09'));
                    let AEOCSTN =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AEOCSTN'));
                    let AECODE14 =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECODE14'));
                    let AECOCSTN =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECOCSTN'));
                    let AECODE10 =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECODE10'));
                    let AECODE11 =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECODE11'));
                    let AECODE12 =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AECODE12'));
                    let AEOTHSP =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AEOTHSP'));
                    let SEV =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'SEV'));
                    let UADE =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'UADE'));
                    let SAE =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'SAE'));
                    let AESAERS =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AESAERS'));
                    let RELPROC =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'RELPROC'));
                    let RELDEV =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'RELDEV'));
                    let MAE =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'MAE'));
                    let MAEDTHYN =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'MAEDTHYN'));
                    let AAADTHYN =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'AAADTHYN'));
                    let DEATHREL =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'DEATHREL'));
                    let MAETY =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'MAETY'));
                    let NAR1 =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'NAR1'));
                    let NAR2 =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'NAR2'));
                    let NAR3 =  IBM_CEC_Data[x]['value'].find(x=> (x['colname'] == 'NAR3'));

                    obj['Date_of_Adjudication__c'] =  CECDT['$t'] != undefined ? CECDT['$t'] : '';
                    obj['CEC_If_other_specify__c'] =  AEOTHSP['$t'] != undefined ? AEOTHSP['$t'] : '';
                    obj['CEC_other_specify__c'] =  AECATSUBSP['$t'] != undefined ?  AECATSUBSP['$t']  : '';
                    obj['Narrative_Adjudicator_1__c'] =  NAR1['$t'] != undefined ? NAR1['$t'] : '';
                    obj['Narrative_Adjudicator_2__c'] =  NAR2['$t'] != undefined ? NAR2['$t'] : '';
                    obj['Narrative_Adjudicator_3__c'] =  NAR3['$t'] != undefined ? NAR3['$t'] : '';

                    obj['CEC_AE_Classification__c'] =  AECAT['$t'] != undefined ? SFDC_Codelist_Mapping(AECAT,'CEC_AE_Classification__c',SFDC_Codelist_Data) : '';
                    obj['CEC_Specify__c'] =  AECATSUB['$t'] != undefined ? SFDC_Codelist_Mapping(AECATSUB,'CEC_Specify__c',SFDC_Codelist_Data) : '';
                    obj['CEC_AE_Code_Bleeding_Anemia__c'] =  AECODE01['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE01,'CEC_AE_Code_Bleeding_Anemia__c',SFDC_Codelist_Data) : '';
                    obj['CEC_AE_Code_Pulmonary__c'] =  AECODE02['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE02,'CEC_AE_Code_Pulmonary__c',SFDC_Codelist_Data) : '';
                    obj['CEC_Please_choose_one__c'] =  RESPFLR['$t'] != undefined ? SFDC_Codelist_Mapping(RESPFLR,'CEC_Please_choose_one__c',SFDC_Codelist_Data) : '';
                    obj['CEC_AE_Code_Cardiac__c'] =  AECODE03['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE03,'CEC_AE_Code_Cardiac__c',SFDC_Codelist_Data) : '';
                    obj['CEC_AE_Code_Renal__c'] =  AECODE04['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE04,'CEC_AE_Code_Renal__c',SFDC_Codelist_Data) : '';
                    obj['CEC_choose_one__c'] =  AEDOCSTN['$t'] != undefined ? SFDC_Codelist_Mapping(AEDOCSTN,'CEC_choose_one__c',SFDC_Codelist_Data) : '';
                    obj['CEC_AE_Code_Surgical_Site_Wound__c'] =  AECODE05['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE05,'CEC_AE_Code_Surgical_Site_Wound__c',SFDC_Codelist_Data) : '';
                    obj['CEC_AE_Code_Bowel__c'] =  AECODE06['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE06,'CEC_AE_Code_Bowel__c',SFDC_Codelist_Data) : '';
                    obj['CEC_AE_Code_Neurological__c'] =  AECODE07['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE07,'CEC_AE_Code_Neurological__c',SFDC_Codelist_Data) : '';
                    obj['CEC_AE_Code_Nellix_Device__c'] =  AECODE09['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE09,'CEC_AE_Code_Nellix_Device__c',SFDC_Codelist_Data) : '';
                    obj['CEC_Please_choose__c'] =  AEOCSTN['$t'] != undefined ? SFDC_Codelist_Mapping(AEOCSTN,'CEC_Please_choose__c',SFDC_Codelist_Data) : '';
                    obj['CEC_AE_Code_Chimney_Device__c'] =  AECODE14['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE14,'CEC_AE_Code_Chimney_Device__c',SFDC_Codelist_Data) : '';
                    obj['CEC_Please_choose_one_Value__c'] =  AECOCSTN['$t'] != undefined ? SFDC_Codelist_Mapping(AECOCSTN,'CEC_Please_choose_one_Value__c',SFDC_Codelist_Data) : '';
                    obj['CEC_AE_Code_Miscellaneous__c'] =  AECODE10['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE10,'CEC_AE_Code_Miscellaneous__c',SFDC_Codelist_Data) : '';
                    obj['CEC_AE_Code_Urogenital__c'] =  AECODE11['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE11,'CEC_AE_Code_Urogenital__c',SFDC_Codelist_Data) : '';
                    obj['CEC_AE_Code_Malignancies__c'] =  AECODE12['$t'] != undefined ? SFDC_Codelist_Mapping(AECODE12,'CEC_AE_Code_Malignancies__c',SFDC_Codelist_Data) : '';
                    obj['CEC_Severity__c'] =  SEV['$t'] != undefined ? SFDC_Codelist_Mapping(SEV,'CEC_Severity__c',SFDC_Codelist_Data) : '';
                    obj['CEC_Unanticipated_Adverse_Device_Effect__c'] =  UADE['$t'] != undefined ? SFDC_Codelist_Mapping(UADE,'CEC_Unanticipated_Adverse_Device_Effect__c',SFDC_Codelist_Data) : '';
                    obj['Serious_Event__c'] =  SAE['$t'] != undefined ? SFDC_Codelist_Mapping(SAE,'Serious_Event__c',SFDC_Codelist_Data) : '';
                    obj['Reason_for_Serious__c'] =  AESAERS['$t'] != undefined ? SFDC_Codelist_Mapping(AESAERS,'Reason_for_Serious__c',SFDC_Codelist_Data) : '';
                    obj['Related_to_Procedure__c'] =  RELPROC['$t'] != undefined ? SFDC_Codelist_Mapping(RELPROC,'Related_to_Procedure__c',SFDC_Codelist_Data) : '';
                    obj['Related_to_Nellix_System__c'] =  RELDEV['$t'] != undefined ? SFDC_Codelist_Mapping(RELDEV,'Related_to_Nellix_System__c',SFDC_Codelist_Data) : '';
                    obj['CEC_Major_Adverse_Event__c'] =  MAE['$t'] != undefined ? SFDC_Codelist_Mapping(MAE,'CEC_Major_Adverse_Event__c',SFDC_Codelist_Data) : '';
                    obj['patient_die_as_a_result_of_this_event__c'] =  MAEDTHYN['$t'] != undefined ?SFDC_Codelist_Mapping(MAEDTHYN,'patient_die_as_a_result_of_this_event__c',SFDC_Codelist_Data) : '';
                    obj['Was_this_death_AAA_related__c'] =  AAADTHYN['$t'] != undefined ? SFDC_Codelist_Mapping(AAADTHYN,'Was_this_death_AAA_related__c',SFDC_Codelist_Data) : '';
                    obj['Death_relatedness__c'] =  DEATHREL['$t'] != undefined ? SFDC_Codelist_Mapping(DEATHREL,'Death_relatedness__c',SFDC_Codelist_Data) : '';
                    obj['Indicate_which_MAE__c'] =  MAETY['$t'] != undefined ? SFDC_Codelist_Mapping(MAETY,'Indicate_which_MAE__c',SFDC_Codelist_Data) : '';
                    obj['CTMS__Subject__c'] = SUBID['$t'];
                    obj['CTMS__External_ID__c'] = key;

                    if(map_Data.hasOwnProperty(key)){
                    
                        //console.log('contains key : ' , key);
                        let merge_Obj = {...map_Data[key],...obj};
                        map_Data[key] = merge_Obj;
                    
                    }else{
                        
                        //console.log('key : ' , key);
                        if(!(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)){
                            map_Data[key] = obj;
                        }
                    }
                }
            }

            //console.log('REINT :' , map_Data['633377_130_3']);
            //console.log('REINT :' , map_Data['575316_130_1_0']);
            //console.log('REINT :' , map_Data['575316_130_1_1']);
            //console.log('map_Data :' , map_Data );
            for(let x=0 ;x< Object.keys(map_Data).length;x++){

                let each_key = Object.keys(map_Data)[x];
                AE_AEItems_Obj.push(map_Data[each_key]);
            }
            final_AE_obj['status']='success';
            final_AE_obj['result']= AE_AEItems_Obj;
            resolve(final_AE_obj);

        }catch(err){
            console.log('eror::',err);
        
            final_AE_obj['status']='error';
            final_AE_obj['result']= err;
            reject(final_AE_obj);
        }
    });
};

const get_Subject_Details_AE = (sfdc,Final_Data_Array)=>{
    let subjectDetails={};
    let subject_Data_Mapping_Details=[];
    return new Promise((resolve,reject)=>
    {
        try{

            let subIds = [];
            console.log('Final_Data_Array : ' , Final_Data_Array.length);

            for(let i =0;i< Final_Data_Array.length;i++){

                if(Final_Data_Array[i] != undefined){
                    subIds.push(Final_Data_Array[i]['CTMS__Subject__c']);
                }
            }
            let unique_subIds = [...new Set(subIds)];
            if(unique_subIds.length > 0){
                console.log('subIds len : ' , unique_subIds.length);

                sfdc.con.sobject("CTMS__Subject__c")
                .find([{ CTMS__External_ID__c : unique_subIds }],["Id","CTMS__Site__c","CTMS__Program__c","CTMS__External_ID__c"],null) 
                .execute(function (err, SFDC_SubjectVisit_Data) { 

                    //console.log('SFDC_SubjectVisit_Data : ' , SFDC_SubjectVisit_Data);

                    if(SFDC_SubjectVisit_Data){

                        for(let i =0;i< Final_Data_Array.length;i++){

                            let Obj ={};
                            let sub_Obj ={};

                            Obj = Final_Data_Array[i];
                            let sv_Id = Final_Data_Array[i]['CTMS__Subject__c'];

                            let subject = SFDC_SubjectVisit_Data.find(x=> (x['CTMS__External_ID__c'] == sv_Id));

                            sub_Obj['CTMS__Program__c'] = subject['CTMS__Program__c'] != undefined ? subject['CTMS__Program__c'] : null;
                            sub_Obj['CTMS__Site__c'] = subject['CTMS__Site__c'] != undefined ? subject['CTMS__Site__c'] : null;
                            sub_Obj['CTMS__Subject__c'] = subject['Id']!= undefined ? subject['Id'] : null;

                            let merge_Obj = {...Obj,...sub_Obj};

                            subject_Data_Mapping_Details.push(merge_Obj);
                        
                        }
                        
                        //console.log('subject_Data_Mapping_Details : ' , subject_Data_Mapping_Details);
                        subjectDetails['status']='success';
                        subjectDetails['result']= subject_Data_Mapping_Details;
                        resolve(subjectDetails);

                    }

                    if(err){
                        console.log('eror::',err);
                
                        subjectDetails['status']='error';
                        subjectDetails['result']= err;
                        reject(subjectDetails);
                    }
                });

            }

        }catch(error){
            console.log('catch Error : ',error);
            
            subjectDetails['status']='error';
            subjectDetails['result']= error;
            reject(subjectDetails);
        }
    });

};

const AE_Data_Upsert = (sfdc,AdverseEvent_Final_Data_Mapping,Obj_Name)=>{

    let ObjCodelist = {};
    return new Promise((resolve,reject)=>
    {
        try{

            sfdc.con.bulk.pollInterval = 5000;
            sfdc.con.bulk.PollingTimeout = 60000;

            sfdc.con.sobject(Obj_Name).upsertBulk(AdverseEvent_Final_Data_Mapping, "CTMS__External_ID__c", (error, result) => {
                
                if (error) {
                    console.log('error : ' , error);
                    if (error.name =='PollingTimeout') {

                        ObjCodelist['status']='PollingTimeout';
                        ObjCodelist['result']= 'PollingTimeout';
                        reject(ObjCodelist);
                    } 
                    else {

                        ObjCodelist['status']='error';
                        ObjCodelist['result']= 'Some other error in sfdc';
                        reject(ObjCodelist);
                    }
                }
                if(result){
                    //console.log('result : ' , result);

                    ObjCodelist['status']='success';
                    ObjCodelist['result']= 'IBM Fecthing Data is success!!';
                    resolve(ObjCodelist);
                
                } 
            });

            
        }catch(error){
            console.log('eror::',error);
            
            ObjCodelist['status']='error';
            ObjCodelist['result']= error;
            reject(ObjCodelist);

        }
    });

};

const AE_Promises = (all_Promises) =>{

    let ObjCodelist ={};
    let Failed_Promises = [];

    return new Promise((resolve,reject)=>
    {
        try{

            Promise.allSettled(all_Promises).then((results) => 
    
                results.forEach((result) => {
    
                    console.log('Res : ' , result);
                
                    if(result['status'] == 'rejected'){
    
                        //let failed_Res = result;
                        console.log('failed_Res : ', result['reason']['chunk']);
                        //console.log('failed_Res Reason : ', failed_Res['reason']);
                        //console.log('failed_Res chunk : ', failed_Res['reason']['chunk']);
                        Failed_Promises.push(result['reason']['chunk']);
                        //insert_AE_InBatches(sfdc,result['reason']['chunk']);
                        //retry_Promise.push(promis);
                    
                    }

                    ObjCodelist['status']='success';
                    ObjCodelist['result']= Failed_Promises;
                    resolve(ObjCodelist);
                })
            );
    
        //console.log('retry_Promise : ' , retry_Promise.length);
        }catch (error){
    
            console.log('error : ' , error);
            ObjCodelist['status']='error';
            ObjCodelist['result']= error;
            reject(ObjCodelist);

    
        }
    });
};

//++++++++++++++++++++++++++++++++ SI for AE Start ++++++++++++++++++++++++++++++++ 

const get_AE_Details = (sfdc,AE_Table_Data_arry)=>{

    let AE_Details={};
    let AE_Data_Mapping_Details={};

    return new Promise((resolve,reject)=>
    {
        try{

            let AE_External_Ids = [];
            console.log('AE_Table_Data_arry : ' , AE_Table_Data_arry.length);

            for(let i =0;i< AE_Table_Data_arry.length;i++){

                if(AE_Table_Data_arry[i] != undefined){
                    AE_External_Ids.push(AE_Table_Data_arry[i]['CTMS__External_ID__c']);
                }
            }
            let unique_AE_External_Ids = [...new Set(AE_External_Ids)];


            if(unique_AE_External_Ids.length > 0){
                console.log('subIds len : ' , unique_AE_External_Ids.length);

                sfdc.con.sobject("CTMS__Adverse_Event__c")
                .find([{ CTMS__External_ID__c : unique_AE_External_Ids }],["Id","CTMS__Site__c","CTMS__Subject__c","CTMS__Program__c","CTMS__External_ID__c"],null) 
                .execute(function (err, SFDC_AE_Data) { 

                    //console.log('SFDC_AE_Data : ' , SFDC_AE_Data);

                    if(SFDC_AE_Data){

                        for(let i =0;i< SFDC_AE_Data.length;i++){

                            let AE_Obj ={};
                            
                            let AE_Key = SFDC_AE_Data[i]['CTMS__External_ID__c']
                            AE_Obj['Adverse_Event__c'] = SFDC_AE_Data[i]['Id'] != undefined ? SFDC_AE_Data[i]['Id'] : null;
                            AE_Obj['Subject__c'] = SFDC_AE_Data[i]['CTMS__Subject__c'] != undefined ? SFDC_AE_Data[i]['CTMS__Subject__c'] : null;

                            AE_Data_Mapping_Details[AE_Key] = AE_Obj;
                        
                        }
                        
                        //console.log('AE_Data_Mapping_Details : ' , AE_Data_Mapping_Details);
                        AE_Details['status']='success';
                        AE_Details['result']= AE_Data_Mapping_Details;
                        resolve(AE_Details);

                    }

                    if(err){
                        console.log('eror::',err);
                
                        AE_Details['status']='error';
                        AE_Details['result']= err;
                        reject(AE_Details);
                    }
                });

            }

        }catch(error){
            console.log('catch Error : ',error);
            
            AE_Details['status']='error';
            AE_Details['result']= error;
            reject(AE_Details);
        }
    });

};

const IBM_Parse_SI_Data = (IBM_REINT_Data,AE_Details_data,SFDC_Codelist_Data)=>{

    let final_AE_obj={};

    //AE_Data : IBM REINT Table Data for AE.
    let AE_AEItems_Obj=[];

    return new Promise((resolve,reject)=>
    {   
        try{

            console.log('SFDC_Codelist_Data : ',Object.keys(SFDC_Codelist_Data).length);

            let map_Data ={};

            for (let x=0 ;x< Object.keys(IBM_REINT_Data).length;x++) {
            
                let obj ={};
                let key;

                let SUBID = IBM_REINT_Data[x]['value'].find(x=> (x['colname'] == 'SUBID'));
                let SUBNUM =  IBM_REINT_Data[x]['value'].find(x=> (x['colname'] == 'SUBNUM')); 
                let VISITID =  IBM_REINT_Data[x]['value'].find(x=> (x['colname'] == 'VISITID')); 
                let VISITSEQ =  IBM_REINT_Data[x]['value'].find(x=> (x['colname'] == 'VISITSEQ')); 
                let PAGEID =  IBM_REINT_Data[x]['value'].find(x=> (x['colname'] == 'PAGEID')); 
                let PAGESEQ =  IBM_REINT_Data[x]['value'].find(x=> (x['colname'] == 'PAGESEQ'));
                let STATUSID =  IBM_REINT_Data[x]['value'].find(x=> (x['colname'] == 'STATUSID'));
                
                key = SUBID['$t']+'_'+VISITID['$t']+'_'+VISITSEQ['$t']+'_'+PAGESEQ['$t'];
                AE_Key = SUBID['$t']+'_'+VISITID['$t']+'_'+VISITSEQ['$t'];

                if(VISITID['$t'] == '130' && PAGEID['$t'] == '40'){
                    //console.log('key : ' , key);

                    let PXTY1 = IBM_REINT_Data[x]['value'].find(x=> (x['colname'] == 'PXTY1'));
                    let PXDT1 = IBM_REINT_Data[x]['value'].find(x=> (x['colname'] == 'PXDT1'));
                    let PXTXNEED1 = IBM_REINT_Data[x]['value'].find(x=> (x['colname'] == 'PXTXNEED1'));
                    let PXTXNEEDOT = IBM_REINT_Data[x]['value'].find(x=> (x['colname'] == 'PXTXNEEDOT'));
                    let PXPXTXYN1 = IBM_REINT_Data[x]['value'].find(x=> (x['colname'] == 'PXPXTXYN1'));
                    let PXTXNEED1M = IBM_REINT_Data[x]['value'].find(x=> (x['colname'] == 'PXTXNEED1M'));
                    let PXPXTXYN1M = IBM_REINT_Data[x]['value'].find(x=> (x['colname'] == 'PXPXTXYN1M'));
                    let PXRELMIG = IBM_REINT_Data[x]['value'].find(x=> (x['colname'] == 'PXRELMIG'));

                    obj['Date_of_Procedure__c'] =  PXDT1['$t'] != undefined ? PXDT1['$t'] : '';
                    obj['Please_specify_Other_intend__c'] =  PXTXNEEDOT['$t'] != undefined ? PXTXNEEDOT['$t'] : '';
                    
                    obj['Procedure_Type__c'] = PXTY1['$t'] != undefined ? SFDC_Codelist_Mapping(PXTY1,'Procedure_Type__c',SFDC_Codelist_Data) : '';
                    obj['Reason_for_Procedure__c'] = PXTXNEED1['$t'] != undefined ? SFDC_Codelist_Mapping(PXTXNEED1,'Reason_for_Procedure__c',SFDC_Codelist_Data) : '';
                    obj['Was_this_Procedure_to_Treat_Endoleak__c'] = PXPXTXYN1['$t'] != undefined ? SFDC_Codelist_Mapping(PXPXTXYN1,'Was_this_Procedure_to_Treat_Endoleak__c',SFDC_Codelist_Data) : '';
                    obj['Reason_for_Procedure_1M__c'] = PXTXNEED1M['$t'] != undefined ? SFDC_Codelist_Mapping(PXTXNEED1M,'Reason_for_Procedure_1M__c',SFDC_Codelist_Data) : '';
                    obj['Was_this_Procedure_to_Treat_Endoleak_1M__c'] = PXPXTXYN1M['$t'] != undefined ? SFDC_Codelist_Mapping(PXPXTXYN1M,'Was_this_Procedure_to_Treat_Endoleak_1M__c',SFDC_Codelist_Data) : '';
                    obj['Did_this_procedure_result_from_migration__c'] = PXRELMIG['$t'] != undefined ? SFDC_Codelist_Mapping(PXRELMIG,'Did_this_procedure_result_from_migration__c',SFDC_Codelist_Data) : '';
                    //obj['CTMS__Subject__c'] = SUBID['$t'];
                    obj['External_Id__c'] = key;

                    let AE_Obj = {};
                    let REINT_Obj ={};

                    if(AE_Details_data.hasOwnProperty(AE_Key)){
                        AE_Obj = AE_Details_data[AE_Key];

                        REINT_Obj = {...AE_Obj,...obj};
                    }else{
                        REINT_Obj = obj;
                    }

                    if(map_Data.hasOwnProperty(key)){
                    
                        let merge_Obj = {...map_Data[key],...REINT_Obj};
                        map_Data[key] = merge_Obj;
                    
                    }else{
    
                        //console.log('key : ' , key);
    
                        if(!(REINT_Obj && Object.keys(REINT_Obj).length === 0 && Object.getPrototypeOf(REINT_Obj) === Object.prototype)){
                            map_Data[key] = REINT_Obj;
                        }
                    }
                }
            }
            
            //console.log('REINT :' , map_Data['611751_130_1']);
            //console.log('REINT :' , map_Data['575316_130_1_0']);
            //console.log('REINT :' , map_Data['575316_130_1_1']);
            //console.log('map_Data :' , map_Data );

            for(let x=0 ;x< Object.keys(map_Data).length;x++){

                let each_key = Object.keys(map_Data)[x];
                AE_AEItems_Obj.push(map_Data[each_key]);
            }

            
            final_AE_obj['status']='success';
            final_AE_obj['result']= AE_AEItems_Obj;
            resolve(final_AE_obj);

        }catch(err){
            //console.log('eror::',err);
        
            final_AE_obj['status']='error';
            final_AE_obj['result']= err;
            reject(final_AE_obj);
        }
    });
};

const SI_Data_Upsert = (sfdc,SI_Data_Mapping_Arry,Obj_Name)=>{

    let ObjCodelist = {};

    return new Promise((resolve,reject)=>
    {
        try{

            sfdc.con.bulk.pollInterval = 5000;
            sfdc.con.bulk.PollingTimeout = 60000;

            sfdc.con.sobject(Obj_Name).upsertBulk(SI_Data_Mapping_Arry, "External_Id__c", (error, result) => {
                
                if (error) {

                    console.log('error SI : ' , error);

                    if (error.name =='PollingTimeout') {

                        ObjCodelist['status']='PollingTimeout';
                        ObjCodelist['result']= 'PollingTimeout';
                        reject(ObjCodelist);
                    } 
                    else {

                        ObjCodelist['status']='error';
                        ObjCodelist['result']= 'Some other error in sfdc';
                        reject(ObjCodelist);
                    }
                }
                if(result){
                    console.log('result : ' , result);

                    ObjCodelist['status']='success';
                    ObjCodelist['result']= 'IBM Fecthing Data is success!!';
                    resolve(ObjCodelist);
                
                } 
            });

            
        }catch(error){
            console.log('eror::',error);
            
            ObjCodelist['status']='error';
            ObjCodelist['result']= error;
            reject(ObjCodelist);

        }
    });

};

const SI_Promises = (all_Promises) =>{

    let ObjCodelist ={};
    let Failed_Promises = [];

    return new Promise((resolve,reject)=>
    {
        try{

            console.log('SI all_Promises : ' ,all_Promises);

            Promise.allSettled(all_Promises).then((results) => 
    
                results.forEach((result) => {
    
                    console.log('SI : ' , result);  
                
                    if(result['status'] == 'rejected'){
    
                        console.log('failed_Res : ', result['reason']['chunk']);
                        
                    
                    }

                    ObjCodelist['status']='success';
                    ObjCodelist['result']= Failed_Promises;
                    resolve(ObjCodelist);
                })
            );
    
        //console.log('retry_Promise : ' , retry_Promise.length);
        }catch (error){
    
            console.log('error : ' , error);
            ObjCodelist['status']='error';
            ObjCodelist['result']= error;
            reject(ObjCodelist);

    
        }
    });
};

//++++++++++++++++++++++++++++++++  SI for AE END ++++++++++++++++++++++++++++++++ 

//---------------------------- AE Items  END ------------------------------------------------------

//------------------------------------------- PD start ---------------------------------------------

function SFDC_Codelist_Mapping(value,sfdc_field,sfdc_IBM_Codelist){

    let val =value['$t'];

    /*console.log('value : ', value);
    console.log('sfdc_field : ', sfdc_field);
    console.log('sfdc_IBM_Codelist' , sfdc_IBM_Codelist[sfdc_field]);*/
    
    if( val != undefined){
        return sfdc_IBM_Codelist[sfdc_field][val];
    }
}

const get_Subject_Details_PD = (sfdc,Final_Data_Array)=>{
    let subjectDetails={};
    let subject_Data_Mapping_Details=[];
    return new Promise((resolve,reject)=>
    {
        try{

            let subIds = [];
            //console.log('Final_Data_Array : ' , Final_Data_Array);

            for(let i =0;i< Final_Data_Array.length;i++){

                if(Final_Data_Array[i] != undefined){
                    subIds.push(Final_Data_Array[i]['CTMS__Subject__c']);
                }
            }
            
    
            if(subIds.length > 0){
                console.log('subIds len : ' , subIds.length);

                sfdc.con.sobject("CTMS__Subject__c")
                .find([{ CTMS__External_ID__c : subIds }],["Id","CTMS__Site__c","CTMS__Program__c","CTMS__External_ID__c"],null) 
                .execute(function (err, SFDC_SubjectVisit_Data) { 

                    //console.log('SFDC_SubjectVisit_Data : ' , SFDC_SubjectVisit_Data);

                    if(SFDC_SubjectVisit_Data){

                        for(let i =0;i< Final_Data_Array.length;i++){

                            let Obj ={};
                            let sub_Obj ={};

                            Obj = Final_Data_Array[i];
                            let sv_Id = Final_Data_Array[i]['CTMS__Subject__c'];

                            let subject = SFDC_SubjectVisit_Data.find(x=> (x['CTMS__External_ID__c'] == sv_Id));

                            sub_Obj['CTMS__Program__c'] = subject['CTMS__Program__c'] != undefined ? subject['CTMS__Program__c'] : null;
                            sub_Obj['CTMS__Clinical_Site__c'] = subject['CTMS__Site__c'] != undefined ? subject['CTMS__Site__c'] : null;
                            sub_Obj['CTMS__Subject__c'] = subject['Id']!= undefined ? subject['Id'] : null;

                            let merge_Obj = {...Obj,...sub_Obj};

                            subject_Data_Mapping_Details.push(merge_Obj);
                        
                        }
                        
                        console.log('subject_Data_Mapping_Details : ' , subject_Data_Mapping_Details);
                        subjectDetails['status']='success';
                        subjectDetails['result']= subject_Data_Mapping_Details;
                        resolve(subjectDetails);

                    }

                    if(err){
                        console.log('eror::',err);
                
                        subjectDetails['status']='error';
                        subjectDetails['result']= err;
                        reject(subjectDetails);
                    }
                });

            }

        }catch(error){
            console.log('catch Error : ',error);
            
            subjectDetails['status']='error';
            subjectDetails['result']= error;
            reject(subjectDetails);
        }
    });

};

const IBM_Parse_PD_Data = (PD_Table_Data,sfdc_IBM_Codelist)=>{

    let final_PD_obj={};
    let PD_Final_Data ={};

    return new Promise((resolve,reject)=>
    {
        try{

            //console.log('sfdc_IBM_Codelist :' , sfdc_IBM_Codelist);
                //PD_Table_Data.length
            for (let x=0 ;x<PD_Table_Data.length ;x++) {

                let SUBID = PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'SUBID'));
                let SUBNUM =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'SUBNUM')); 
                let VISITID =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'VISITID')); 
                let VISITSEQ =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'VISITSEQ')); 
                let PAGEID =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PAGEID')); 
                let PAGESEQ =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PAGESEQ'));
                let STATUSID =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'STATUSID'));  

                let key = SUBID['$t']+'_'+VISITID['$t']+'_'+PAGESEQ['$t'];

                if(VISITID['$t'] =='150' && PAGEID['$t'] =='10'){
                    let Obj={};
                    
                    let PDVIS =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDVIS'));   
                    let PDFORM =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDFORM'));
                    let PDA =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDA'));   
                    let PDB =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDB')); 
                    let PDC =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDC'));     
                    let PDD =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDD'));   
                    let PDE =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDE'));   
                    let PDF =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDF'));   
                    let PDG =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDG'));   
                    let PDGA =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDGA'));   
                    let PDGB =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDGB'));   
                    let PDH =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDH'));   
                    let PDHOT =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDHOT'));   
                    let PDDEVOT =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDDEVOT'));   
                    let PDRESN =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDRESN'));   
                    let PDPREVACT =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDPREVACT'));   
                    let PDCOM =  PD_Table_Data[x]['value'].find(x=> (x['colname'] == 'PDCOM'));  

                    Obj ['Visit__c'] = PDVIS['$t'] != undefined ? SFDC_Codelist_Mapping(PDVIS,'Visit__c',sfdc_IBM_Codelist) : '';
                    Obj ['Deviation_Type__c'] =  PDFORM['$t'] != undefined ? SFDC_Codelist_Mapping(PDFORM,'Deviation_Type__c',sfdc_IBM_Codelist) : '';
                    Obj ['Reported_Informed_Consent_Deviation__c'] =  PDA['$t'] != undefined ? SFDC_Codelist_Mapping(PDA,'Reported_Informed_Consent_Deviation__c',sfdc_IBM_Codelist) : '';   
                    Obj ['Reported_Pt_Eligibility_Deviation__c'] =  PDB['$t'] != undefined ? SFDC_Codelist_Mapping(PDB,'Reported_Pt_Eligibility_Deviation__c',sfdc_IBM_Codelist) : ''; 
                    Obj ['Reported_IRB_EC_related_Deviation__c'] =  PDC['$t'] != undefined ? SFDC_Codelist_Mapping(PDC,'Reported_IRB_EC_related_Deviation__c',sfdc_IBM_Codelist) : '';     
                    Obj ['Reported_Site_Training_related_Deviation__c'] =  PDD['$t'] != undefined ? SFDC_Codelist_Mapping(PDD,'Reported_Site_Training_related_Deviation__c',sfdc_IBM_Codelist)  : '';   
                    Obj ['Reported_AE_reporting_related_Deviation__c'] =  PDE['$t'] != undefined ? SFDC_Codelist_Mapping(PDE,'Reported_AE_reporting_related_Deviation__c',sfdc_IBM_Codelist) : '';   
                    Obj ['Reported_Protocol_Implementation_related__c'] =  PDF['$t'] != undefined ? SFDC_Codelist_Mapping(PDF,'Reported_Protocol_Implementation_related__c',sfdc_IBM_Codelist): '';   
                    Obj ['Reported_Visit_related_Deviation__c'] =  PDG['$t'] != undefined ? SFDC_Codelist_Mapping(PDG,'Reported_Visit_related_Deviation__c',sfdc_IBM_Codelist) : '';   
                    Obj ['Missed_assessment__c'] =  PDGA['$t'] != undefined ? SFDC_Codelist_Mapping(PDGA,'Missed_assessment__c',sfdc_IBM_Codelist) : '';   
                    Obj ['Assessment_done_outside_of_visit_window__c'] =  PDGB['$t'] != undefined ? SFDC_Codelist_Mapping(PDGB,'Assessment_done_outside_of_visit_window__c',sfdc_IBM_Codelist) : '';   
                    Obj ['Reported_CT_related_Deviation__c'] =  PDH['$t'] != undefined ? SFDC_Codelist_Mapping(PDH,'Reported_CT_related_Deviation__c',sfdc_IBM_Codelist)  : '';   
                    Obj ['Other_Deviations__c'] =  PDHOT['$t'] != undefined ? PDHOT['$t'] : '';   
                    Obj ['PD_Other_Specify__c'] =  PDDEVOT['$t'] != undefined ? PDDEVOT['$t'] : '';   
                    Obj ['Reason_for_deviation__c'] =  PDRESN['$t'] != undefined ? PDRESN['$t'] : '';   
                    Obj ['Preventative_action_to_future_deviation__c'] =  PDPREVACT['$t'] != undefined ? PDPREVACT['$t'] : '';   
                    Obj ['Optional_Comments__c'] =  PDCOM['$t'] != undefined ? PDCOM['$t'] : '';  
                    Obj ['External_Id__c'] = key; 
                    Obj['CTMS__Subject__c'] = SUBID['$t']!= undefined ? SUBID['$t'] : '';

                    if(PD_Final_Data.hasOwnProperty(key)){

                        let exist_Obj = PD_Final_Data[key];
                        let final_PD_merge = {...exist_Obj,...obj};

                        PD_Final_Data[key] = final_PD_merge;
                        
                    }else{
                        PD_Final_Data[key] = Obj;
                    }
                }
            }

            //console.log('PD_Final_Data :: ' , PD_Final_Data);
            
            final_PD_obj['status']='success';
            final_PD_obj['result']= PD_Final_Data;
            resolve(final_PD_obj);

        }catch(err){
            console.log('eror::',err);
        
            final_PD_obj['status']='error';
            final_PD_obj['result']= err;
            reject(final_PD_obj);
        }    
    });
};

const SFDC_IBM_Codelist = (sfdc)=>{

    let Obj_Code_Lst ={};

    let IBM_Codelist_Obj ={};

    return new Promise((resolve,reject)=>
    {
        try{

            sfdc.con.sobject("IBM_Codelist__c")
            .find([{ Object_Name__c : 'Protocol Deviation' }],["Visit__c","Deviation_Type__c","Reported_Informed_Consent_Deviation__c",
            "Reported_Pt_Eligibility_Deviation__c","Reported_IRB_EC_related_Deviation__c","Reported_Site_Training_related_Deviation__c",
            "Reported_AE_reporting_related_Deviation__c","Reported_Protocol_Implementation_related__c","Reported_Visit_related_Deviation__c",
            "Missed_assessment__c","Assessment_done_outside_of_visit_window__c","Reported_CT_related_Deviation__c"],null) 
            .execute(function (err, ibmResults) { 

                //console.log('ibmResults : ' , ibmResults);
                if(ibmResults.length > 0){
                    for(let i=0;i<ibmResults.length;i++){

                        let ibm_SFDC_Object_Fields = Object.keys(ibmResults[i]);
                        
                        //console.log('All  : ' , ibm_SFDC_Object_Fields.length);

                        for(let j=0; j< ibm_SFDC_Object_Fields.length; j++){
                        
                            if(ibm_SFDC_Object_Fields[j] != 'attributes'){
                                let code_key =ibm_SFDC_Object_Fields[j];
                                //console.log('J : ' , ibmResults[i][code_key]); 

                                let code_list = ibmCodelistConverter(ibmResults[i][code_key].split(';'));

                                IBM_Codelist_Obj[code_key] = code_list;
                                
                            }

                        }
                    }
                
                }
                //console.log('IBM_Codelist_Obj : ',IBM_Codelist_Obj);  

                Obj_Code_Lst['status']='success';
                Obj_Code_Lst['result']= IBM_Codelist_Obj;
                resolve(Obj_Code_Lst);

            });

        }catch(error){

            console.log('error : ' , error);

            Obj_Code_Lst['status']='error';
            Obj_Code_Lst['result']= error;
            reject(Obj_Code_Lst);
        }
    });

}

const PD_Setup_Data = (PD_Final_Data)=>{

    let Final_PD = {};
    let Final_PD_arry =[];

    return new Promise((resolve,reject)=>
    {
        try{

            for(let i=0; i < Object.keys(PD_Final_Data).length;i++){
                let PD_Arry = PD_Final_Data[Object.keys(PD_Final_Data)[i]];

                Final_PD_arry.push(PD_Arry);
            }

            Final_PD['status']='success';
            Final_PD['result']= Final_PD_arry;
            resolve(Final_PD);
            
        }catch(error){
            console.log('eror::',error);
            
            Final_PD['status']='error';
            Final_PD['result']= error;
            reject(Final_PD);

        }
    });
};

const SFDC_PD_Upsert = (sfdc,PD_Final_Arry)=>{

    let ObjCodelist ={};

    return new Promise((resolve,reject)=>
    {
        try{

            sfdc.con.bulk.pollInterval = 5000;
            sfdc.con.bulk.PollingTimeout = 60000;

            sfdc.con.sobject("CTMS__Protocol_Deviation__c").upsertBulk(PD_Final_Arry, "External_Id__c", (error, result) => {
                    
                if (error) {

                    console.log('error : ' , error);

                    if (error.name =='PollingTimeout') {

                        ObjCodelist['status']='PollingTimeout';
                        ObjCodelist['result']= 'PollingTimeout';
                        ObjCodelist['chunk']= PD_Final_Arry;
                        reject(ObjCodelist);
                    } 
                    else {
                        ObjCodelist['status']='error';
                        ObjCodelist['result']= 'Some other error';
                        reject(ObjCodelist);
                    }
                }
                if(result){
                
                    ObjCodelist['status']='success';
                    ObjCodelist['result']= 'IBM Fecthing Data is success!!';
                    resolve(ObjCodelist);
                
                } 
            }); 

        }catch(error){
            console.log('eror::',error);
            
            ObjCodelist['status']='error';
            ObjCodelist['result']= error;
            reject(ObjCodelist);

        }
    });
};

//------------------------------------------- PD END ---------------------------------------------

//------------------------------------------- Query Start ---------------------------------------------

const SFDC_IBM_Codelist_Query = (sfdc,ObjName)=>{

    let Obj_Code_Lst ={};

    let IBM_Codelist_Obj ={};

    return new Promise((resolve,reject)=>
    {
        try{

            sfdc.con.sobject("IBM_Codelist__c")
            .find([{ Object_Name__c : ObjName }],["CRB_UShFU_AE_NiNA_ChEVAS_EFU_visits__c","Page__c"],null) 
            .execute(function (err, ibmResults) { 

                //console.log('ibmResults : ' , ibmResults);
                if(ibmResults.length > 0){
                    for(let i=0;i<ibmResults.length;i++){

                        let ibm_SFDC_Object_Fields = Object.keys(ibmResults[i]);
                        
                        //console.log('All  : ' , ibm_SFDC_Object_Fields.length);

                        for(let j=0; j< ibm_SFDC_Object_Fields.length; j++){
                        
                            if(ibm_SFDC_Object_Fields[j] != 'attributes'){
                                let code_key =ibm_SFDC_Object_Fields[j];
                                //console.log('J : ' , ibmResults[i][code_key]); 

                                let code_list = ibmCodelistConverter(ibmResults[i][code_key].split(','));

                                IBM_Codelist_Obj[code_key] = code_list;
                                
                            }

                        }
                    }
                
                }
                //console.log('IBM_Codelist_Obj : ',IBM_Codelist_Obj);  

                Obj_Code_Lst['status']='success';
                Obj_Code_Lst['result']= IBM_Codelist_Obj;
                resolve(Obj_Code_Lst);

            });

        }catch(error){

            console.log('error : ' , error);

            Obj_Code_Lst['status']='error';
            Obj_Code_Lst['result']= error;
            reject(Obj_Code_Lst);
        }
    });

}

function SFDC_Codelist_Mapping_Qurey(value,sfdc_field,sfdc_IBM_Codelist){
    let val =value;
    if( val!= undefined){
        return sfdc_IBM_Codelist[sfdc_field][val];
    }
}

const IBM_Parse_Query_Data = (Querylist_Table_Data,sfdc_IBM_Codelist)=>{

    let final_Query_obj={};
    let Query_Final_Data ={};

    return new Promise((resolve,reject)=>
    {
        try{

            //console.log('sfdc_IBM_Codelist :' , sfdc_IBM_Codelist); 

            for (let x=0 ;x< Querylist_Table_Data.length ;x++) {

                //console.log('each :' , Querylist_Table_Data[x]);

                let id = Querylist_Table_Data[x]['id'];
                let subid = Querylist_Table_Data[x]['subid'];
                let subnum =  Querylist_Table_Data[x]['subnum']; 
                let visitid =  Querylist_Table_Data[x]['visitid']; 
                let visitseq =  Querylist_Table_Data[x]['visitseq']; 
                let pageid =  Querylist_Table_Data[x]['pageid']; 
                let pageseq =  Querylist_Table_Data[x]['pageseq'];
                let typename =  Querylist_Table_Data[x]['typename'];
                let subline =  Querylist_Table_Data[x]['subline'];
                let answered =  Querylist_Table_Data[x]['answered'];   
                let closed =  Querylist_Table_Data[x]['closed']; 
                let sysqname =  Querylist_Table_Data[x]['sysqname'];     
                let lastmby =  Querylist_Table_Data[x]['lastmby'];   
                let lastmdt =  Querylist_Table_Data[x]['lastmdt'];  
                let qclastmdt = '';
                let qclastmdt_array =[];
                

                qclastmdt_array = Querylist_Table_Data[x]['querycomments']['querycomment'] != undefined ? Querylist_Table_Data[x]['querycomments']['querycomment'] : [];

                //console.log('qclastmdt_array :: ' , qclastmdt_array);

                for(let mk=0;mk < qclastmdt_array.length;mk++){
                    let revision = qclastmdt_array[mk]['revision'];

                    if(revision == '1');
                    {
                        qclastmdt = qclastmdt_array[mk]['lastmdt'];
                    }
                    //console.log('revision :: ' , revision);
                }   
                
                let lastmdt1 = lastmdt.split(' ');
                let qclastmdt1  = qclastmdt.split(' ');

                //console.log('lastmdt1 : ' , lastmdt1);
                //console.log('qclastmdt1 : ' , qclastmdt1);

                let key = subid+'_'+id;
            
                let Obj={};

                Obj ['ID__c'] = id != undefined ? id : '';
                Obj ['Subject__c'] =  subid != undefined ? subid : '';
                Obj ['Type__c'] =  typename != undefined ? typename : '';   
                Obj ['CRB_UShFU_AE_NiNA_ChEVAS_EFU_visits__c'] =  visitid != undefined ? SFDC_Codelist_Mapping_Qurey(visitid,'CRB_UShFU_AE_NiNA_ChEVAS_EFU_visits__c',sfdc_IBM_Codelist) : ''; 
                Obj ['Visit_Seq__c'] =  visitseq != undefined ? visitseq : '';     
                Obj ['Page__c'] =  pageid != undefined ? SFDC_Codelist_Mapping_Qurey(visitid+'_'+pageid,'Page__c',sfdc_IBM_Codelist)  : '';   
                Obj ['Page_Seq__c'] =  pageseq != undefined ? pageseq : '';   
                Obj ['Issue__c'] =  subline != undefined ? subline : '';   
                Obj ['Answered__c'] =  answered != undefined ? answered == 't' ? true : false : false;   
                Obj ['Closed__c'] =  closed != undefined ? closed == 't' ? true : false : false;   
                Obj ['System_Query__c'] =  sysqname != undefined ? sysqname : '';   
                Obj ['Last_Modified_By__c'] =  lastmby != undefined ? lastmby : '';   
                Obj ['Last_Modified_Date__c'] =  lastmdt1.length>0 ? lastmdt1[0] : '';   
                Obj ['Created_Date__c'] =  qclastmdt1.length>0  ? qclastmdt1[0] : ''; 
                Obj['External_Id__c'] = key;

                if(Query_Final_Data.hasOwnProperty(key)){

                    let exist_Obj = Query_Final_Data[key];
                    let final_PD_merge = {...exist_Obj,...obj};

                    Query_Final_Data[key] = final_PD_merge;
                    
                }else{
                    Query_Final_Data[key] = Obj;
                }
                
            }

            //console.log('Query_Final_Data :: ' , Query_Final_Data);
            
            final_Query_obj['status']='success';
            final_Query_obj['result']= Query_Final_Data;
            resolve(final_Query_obj);

        }catch(err){
            console.log('eror::',err);
        
            final_Query_obj['status']='error';
            final_Query_obj['result']= err;
            reject(final_Query_obj);
        }    
    });
};

const Query_Setup_Data = (Query_List_Final_Data) =>{

    let Final_Query = {};
    let Final_Query_arry =[];

    return new Promise((resolve,reject)=>
    {
        try{

            for(let i=0; i < Object.keys(Query_List_Final_Data).length;i++){
                let Query_Arry = Query_List_Final_Data[Object.keys(Query_List_Final_Data)[i]];

                Final_Query_arry.push(Query_Arry);
            }

            Final_Query['status']='success';
            Final_Query['result']= Final_Query_arry;
            resolve(Final_Query);
            
        }catch(error){
            console.log('eror::',error);
            
            Final_Query['status']='error';
            Final_Query['result']= error;
            reject(Final_Query);

        }
    });
};

const get_Subject_Details_Query = (sfdc,Final_Data_Array)=>{
    let subjectDetails={};
    let subject_Data_Mapping_Details=[];
    return new Promise((resolve,reject)=>
    {
        try{

            let subIds = [];
            //console.log('Final_Data_Array : ' , Final_Data_Array);

            for(let i =0;i< Final_Data_Array.length;i++){

                if(Final_Data_Array[i] != undefined){
                    subIds.push(Final_Data_Array[i]['Subject__c']);
                }
            }
            
            let unique_subIds = [...new Set(subIds)];

            if(unique_subIds.length > 0){
                //console.log('unique_subIds len : ' , unique_subIds.length);

                sfdc.con.sobject("CTMS__Subject__c")
                .find([{ CTMS__External_ID__c : unique_subIds }],["Id","CTMS__Site__c","CTMS__Program__c","CTMS__External_ID__c"],null) 
                .execute(function (err, SFDC_SubjectVisit_Data) { 

                    //console.log('SFDC_SubjectVisit_Data : ' , SFDC_SubjectVisit_Data);

                    if(SFDC_SubjectVisit_Data){

                        for(let i =0;i< Final_Data_Array.length;i++){

                            let Obj ={};
                            let sub_Obj ={};

                            Obj = Final_Data_Array[i];
                            let sv_Id = Final_Data_Array[i]['Subject__c'];

                            let subject = SFDC_SubjectVisit_Data.find(x=> (x['CTMS__External_ID__c'] == sv_Id));

                            sub_Obj['CTMS__Clinical_Study__c'] = subject['CTMS__Program__c'] != undefined ? subject['CTMS__Program__c'] : null;
                            sub_Obj['CTMS__Site__c'] = subject['CTMS__Site__c'] != undefined ? subject['CTMS__Site__c'] : null;
                            sub_Obj['Subject__c'] = subject['Id']!= undefined ? subject['Id'] : null;

                            let merge_Obj = {...Obj,...sub_Obj};

                            subject_Data_Mapping_Details.push(merge_Obj);
                        
                        }
                        
                        //console.log('subject_Data_Mapping_Details : ' , subject_Data_Mapping_Details);
                        subjectDetails['status']='success';
                        subjectDetails['result']= subject_Data_Mapping_Details;
                        resolve(subjectDetails);

                    }

                    if(err){
                        console.log('eror::',err);
                
                        subjectDetails['status']='error';
                        subjectDetails['result']= err;
                        reject(subjectDetails);
                    }
                });

            }

        }catch(error){
            console.log('catch Error : ',error);
            
            subjectDetails['status']='error';
            subjectDetails['result']= error;
            reject(subjectDetails);
        }
    });

};

const SFDC_Query_Upsert = (sfdc,Final_Arry,Obj_Name)=>{

    let ObjCodelist ={};

    return new Promise((resolve,reject)=>
    {
        try{

            sfdc.con.bulk.pollInterval = 5000;
            sfdc.con.bulk.PollingTimeout = 60000;

            sfdc.con.sobject(Obj_Name).upsertBulk(Final_Arry, "External_Id__c", (error, result) => {
                    
                if (error) {

                    console.log('error : ' , error);

                    if (error.name =='PollingTimeout') {

                        ObjCodelist['status']='PollingTimeout';
                        ObjCodelist['result']= 'PollingTimeout';
                        ObjCodelist['chunk']= Final_Arry;
                        reject(ObjCodelist);
                    } 
                    else {
                        ObjCodelist['status']='error';
                        ObjCodelist['result']= 'Some other error';
                        reject(ObjCodelist);
                    }
                }
                if(result){
                
                    ObjCodelist['status']='success';
                    ObjCodelist['result']= 'IBM Fecthing Data is success!!';
                    resolve(ObjCodelist);
                
                } 
            }); 

        }catch(error){
            console.log('eror::',error);
            
            ObjCodelist['status']='error';
            ObjCodelist['result']= error;
            reject(ObjCodelist);

            

        }
    });
};

const check_Query_Data = (sfdc,fs,csv,Query_Final_Arry) =>{

    let Obj_Missing_list ={};
    let Sfdc_ext_Ids = [];
    let missing_ext_Ids = [];
    let missing_Queries_Data =[];

    return new Promise((resolve,reject)=>
    {
        try{
            
            let ext_Ids = [];
            
            for(let i=0;i<Query_Final_Arry.length;i++){
                //console.log('i : ', Query_Final_Arry[i]['Subject__c']); 
                ext_Ids.push(Query_Final_Arry[i]['External_Id__c']);
            }

            console.log('ext_Ids : ', ext_Ids.length); 

            console.log('Query_Final_Arry : ', Query_Final_Arry.length); 
            let unique_Ids = [...new Set(ext_Ids)];
            console.log('unique_Ids : ', unique_Ids.length); 

            let records =[];
            (async () => {
                // We still need recordStream to listen for errors. We'll access the stream
                // directly though, bypassing jsforce's RecordStream.Parsable
                const recordStream = sfdc.con.bulk.query(
                    "SELECT Id, External_Id__c FROM CTMS__Queries__c"
                );
                const readStream = recordStream.stream();
                const csvToJsonParser = csv({flatKeys: false, checkType: true});
                readStream.pipe(csvToJsonParser);
            
                csvToJsonParser.on("data", (data) => {
                    records.push(JSON.parse(data.toString('utf8')));
                }); 
            
                new Promise((resolve, reject) => {
                    recordStream.on("error", (error) => {
                    console.error(error);
                    reject(new Error(`Couldn't download results from Salesforce Bulk API`));
                });
            
                csvToJsonParser.on("error", (error) => {
                    console.error(error);
                    reject(new Error(`Couldn't parse results from Salesforce Bulk API`));
                });
            
                    csvToJsonParser.on("done", async () => {
                    resolve(records);
                });
                }).then((records) => { 
                    console.log('records :: ',records.length);

                    for(let jj=0;jj<records.length;jj++){
                        //console.log('EXT :: ',records[jj]['External_Id__c']);
                        Sfdc_ext_Ids.push(records[jj]['External_Id__c']);
                    }

                    console.log('Sfdc_ext_Ids :: ',Sfdc_ext_Ids.length);

                    missing_ext_Ids = ext_Ids.filter(x => Sfdc_ext_Ids.indexOf(x) === -1);

                    console.log('missing_ext_Ids :: ',missing_ext_Ids.length);

                    missing_Queries_Data = Query_Final_Arry.filter(x => missing_ext_Ids.includes(x['External_Id__c']));

                    console.log('missing_Queries_Data :: ',missing_Queries_Data);

                    Obj_Missing_list['status']='success';
                    Obj_Missing_list['result']= missing_Queries_Data;
                    resolve(Obj_Missing_list);

                });
            })();


        }catch(error){

            Obj_Missing_list['status']='error';
            Obj_Missing_list['result']= error;
            reject(Obj_Missing_list);


        }
    });

}

//------------------------------------------- Query End ---------------------------------------------


module.exports = {
    IBM_Auth,
    IBM_getSubjectVisit_CT,
    IBM_Codelist_SV,
    IBM_parseFUData,
    IBM_parseELIGData,
    IBM_parseCASEREVData,
    IBM_parseCTData,
    IBM_parseSCRCTData,
    IBM_parseIDXPData,
    IBM_parseIDXHData,
    IBM_parseEXITData,
    IBM_parseDEATHData,
    SubjectVisitScreening,
    SubjectVisit30Days,
    SubjectVisit6months,
    SubjectVisit1year,
    SubjectVisit2years,
    SubjectVisit3years,
    SubjectVisit4years,
    SubjectVisit5years,
    SubjectVisitUnScheduledVisit,
    SubjectVisitEnhancedFollowUp,
    SubjectVisitIndexProcedure,
    SubjectVisitChevasProcedure,
    SubjectVisitNinaProcedure,
    SubjectVisitStudyExit,
    sfdcConnFn,
    IBMCodlist,
    finalSubjectVisitInsertion,
    SV_Promises,
    missing_SV_Data_Find,
    IBM_studyId,
    IBM_parseTemplateData,
    IBM_parseTemplateContentData,
    IBM_Parse_AE_Data,
    get_Subject_Details_AE,
    SFDC_IBM_Codelist_AE,
    AE_Data_Upsert,
    AE_Promises,
    get_AE_Details,
    IBM_Parse_SI_Data,
    SI_Data_Upsert,
    SI_Promises,
    IBM_Parse_PD_Data,
    SFDC_IBM_Codelist,
    PD_Setup_Data,
    get_Subject_Details_PD,
    SFDC_PD_Upsert,
    SFDC_IBM_Codelist_Query,
    IBM_Parse_Query_Data,
    Query_Setup_Data,
    get_Subject_Details_Query,
    SFDC_Query_Upsert,
    check_Query_Data};