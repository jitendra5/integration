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


const processSVData = async (req, res, next) => {
    try
    {
        axios.defaults.withCredentials = true;
        const instance = axios.create({
            withCredentials: true
        })

        //cookie request
        //let cookie = await helper.IBM_Auth(instance,https);
        let FinalSubjectVisitData = {};
        let cookie = 'JSESSIONID=2B334C8ADBCE7B2D08D1FCAE60A1FE43; Path=/; Secure; HttpOnly;ICDINGRESS=ee1b821bd2610f4cb94c663033eaba8abd1bd9cb;';
        console.log('coo : ' ,cookie);

        let sfdc_Con= await helper.sfdcConnFn(jsforce);
        if(sfdc_Con.status =='200'){
            console.log('SFDC Connection success.');
        }

        let Picklist_Field_APIs= 
        ['IBM_Visit_ID__c','Visit_Page_Status__c','PI_Assessed_Eligibility__c','Eligibility_based_on_re_evaluation__c','Object_Name__c',
        'CT_Core_Lab_Assessed_Eligibility__c','CT_Page_Status__c','IG_Eligibility_based_on_re_evaluation__c','IG_CT_Core_Lab_Assessed_Eligibility__c',
        'CRB_Determination__c','Neck__c','Neck_angulation__c','Insufficient_landing_zone_10mm__c','Irregular_or_excessive_thrombus__c',	
        'Unhealthy_aorta_proximal__c','Existing_Anatomical_Dissection__c','Excessive_Calcification__c','Narrowing_in_Neck_Distal__c',
        'Occlusion_of_Arteries__c','Suprarenal_Neck_Diameter_18mm__c','Aneurysm__c','Irregular_flow_lumen__c','Insufficient_Distal_Landing_Zone__c',
        'Narrow_aortoiliac_bifurcation__c','Narrowing_in_iliacs__c','Access__c','Potential_dislodgement_of_existing_stent__c',
        'Excessive_iliac_tortuosity__c','Other__c','Conditionally_Approved_Left__c','Conditionally_Approved_Right__c',
        'Conditionally_Approved_Bilateral__c','Common_Iliac_Artery__c','Left_Internal_Iliac_Artery__c','right_internal_iliac_artery__c',
        'Conditionally_approved_Other__c','Male_or_female_at_least_18_years_old__c','Informed_consent_form_understood__c',
        'Patient_agrees_to_all_follow_up_visits__c','Abdominal_aortic_aneurysm__c','Is_the_subject_eligible_for_enrollment__c',
        'Adequate_iliac_femoral_access__c','Aneurysm_blood_lumen_diameter_60mm__c','Excessive_Calcifications__c',
        'Proximal_non_aneurysmal_aortic_neck__c','Most_caudal_renal_artery__c',
        'Common_iliac_artery_lumen_diameter__c','Distal_iliac_artery_seal_zone__c',
        'Ability_to_preserve_hypogastric_artery__c','Ratio_of_maximum_aortic_aneurysm__c',
        'Life_expectancy_judged_by_Investigator__c','Psychiatric_or_other_condition__c',
        'Participating_in_another_clinical_study__c','Known_allergy_or_contraindication__c',
        'Coagulopathy_or_uncontrolled_bleeding__c',
        'Ruptured_leaking__c','Stent_Graft_Stenosis__c','Extent_of_thrombus_R__c','Extent_of_thrombus_L__c','Type_IA_90__c',
        'Serum_creatinine_S_Cr_level_2_0_mg_dL__c',
        'CVA__c','Unknown__c',
        'Aneurysmal_disease_of_thoracic_aorta__c',
        'Clinically_significant_mural_thrombus__c',
        'Connective_tissue_diseases__c',
        'Unsuitable_vascular_anatomy__c',
        'Pregnant__c',
        'PI_withdrew_subject_from_study__c',
        'Visit_Type__c',
        'Visit_Performed__c',
        'Imaging_Type__c',
        'Was_there_evidence_of_Endoleak_10__c',
        'Type_IA_10__c',
        'Type_IB_R_10__c',
        'Type_IB_L_10__c',
        'Type_II_Lumbar_10__c',
        'Type_II_IMA_10__c',
        'Type_II_Sacralis_Mediana_10__c',
        'Type_IIIa_R_10__c',
        'Type_IIIa_L_10__c',
        'Type_IIIb_R_10__c',
        'Type_IIIb_L_10__c',
        'Type_IV_R_10__c',
        'Type_IV_L_10__c',
        'Evidence_of_index_Stent_Graft_Migration__c',
        'Right__c',
        'Direction__c',
        'Left__c',
        'Direction_Left__c',
        'Was_there_evidence_of_Endoleak__c',
        'Type_IA__c',
        'Type_IB_R__c',
        'Type_IB_L__c',
        'Type_II_Lumbar__c',
        'Type_II_IMA__c','Was_the_Nellix_device_s_explanted__c',
        'Type_II_Sacralis_Mediana__c','Primary_Cause_of_Death__c',
        'Type_IIIa_R__c','Exit_Page_Status__c','Written_correspondence_sent__c',
        'Type_IIIa_L__c','Type_IIIb_R__c','Type_IIIb_L__c','Type_IV_R__c','Type_IV_L__c',
        'Procedure_Completion_Status__c','Did_Adverse_Event_occur_during_procedure__c',
        'concomitant_procedures_performed__c','subject_converted_to_Open_Surgery__c',
        'Procedure_Page_Status__c','Anesthesia_Type__c','Reason_for_Study_Exit__c',
        'Nellix_access_type__c','Is_the_aneuysm_s_systomatic__c',
        'Pre_fill__c','Arterial_repair_during_procedure__c',
        'Residual_Endoleak_post_procedure__c'

        ];

        let sfdc_Obj_Name ='IBM_Codelist__c';
        let sfdc_Pickl_Val ='Subject Visit';

        let IBM_Codlist_SV_Result = await helper.IBM_Codelist_SV(sfdc_Con,Picklist_Field_APIs,sfdc_Pickl_Val,sfdc_Obj_Name);
        let IBM_Codlist_SV_Data ={};

        if(IBM_Codlist_SV_Result['status'] == 'success'){
            IBM_Codlist_SV_Data = IBM_Codlist_SV_Result['result'];
            
        }else{
            throw 'Subject visit IBM codelist data parsing failed.';
        }

        //console.log('IBM_Codlist_SV_Data : ' , Object.keys(IBM_Codlist_SV_Data).length);
        //getSubject visits 
        // ---------------------------------- FU Table ----------------------------------
        let svDataFU = await helper.IBM_getSubjectVisit_CT(instance,https,cookie,request,'data_datatable&param1=FU');
        let finalJSON = JSON.parse(xmlParser.toJson(svDataFU.data))['reply']['data']['datarow'];
        //console.log('finalJSON FU : ',finalJSON);
        let FUObj = await helper.IBM_parseFUData(finalJSON);
        let FUFinalData ={};

        if(FUObj['status'] == 'success'){
            FUFinalData = FUObj['result'];
            
        }else{
            throw 'FU IBM data parsing failed.';
        }
        //console.log('FUFinalData : ',FUFinalData);
        //console.log('FUFinalData : ',Object.keys(FUFinalData).length);
        
        // ---------------------------------- ELIG Table ----------------------------------
        let svDataELIG = await helper.IBM_getSubjectVisit_CT(instance,https,cookie,request,'data_datatable&param1=ELIG');

        //console.log('svDataELIG' , svDataELIG);
        finalJSON = JSON.parse(xmlParser.toJson(svDataELIG.data))['reply']['data']['datarow'];
        let ELIGObj = await helper.IBM_parseELIGData(finalJSON); 
        let ELIGFinalData ={};

        if(ELIGObj['status'] == 'success'){
            ELIGFinalData = ELIGObj['result'];
        }else{
            throw 'ELIG IBM data parsing failed.';
        }

        //console.log('ELIGFinalData data : ',ELIGFinalData); 
        //console.log('ELIGFinalData : ',Object.keys(ELIGFinalData).length);
        
        // ---------------------------------- CASEREV Table ----------------------------------
        let svDataCASEREV = await helper.IBM_getSubjectVisit_CT(instance,https,cookie,request,'data_datatable&param1=CASEREV');
        //console.log('dd : ' , JSON.parse(xmlParser.toJson(svDataPageStatus.data)));
        finalJSON = JSON.parse(xmlParser.toJson(svDataCASEREV.data))['reply']['data']['datarow'];

        let CASEREVObj = await helper.IBM_parseCASEREVData(finalJSON); 
        let CASEREVFinalData ={};

        if(CASEREVObj['status'] == 'success'){
            CASEREVFinalData = CASEREVObj['result'];
            
        }else{
            throw 'CASEREV IBM data parsing failed.';
        }

        //console.log('CASEREVFinalData data : ',CASEREVFinalData);
        //console.log('CASEREVFinalData : ',Object.keys(CASEREVFinalData).length);
        
       // ---------------------------------- CT Table ----------------------------------
        let svDataCT = await helper.IBM_getSubjectVisit_CT(instance,https,cookie,request,'data_datatable&param1=CT');
        
        finalJSON = JSON.parse(xmlParser.toJson(svDataCT.data))['reply']['data']['datarow'];
        
        let CTObj = await helper.IBM_parseCTData(finalJSON); 
        let CTFinalobj ={};

        if(CTObj['status'] == 'success'){
            CTFinalobj = CTObj['result'];
            
        }else{
            throw 'CT IBM data parsing failed.';
        }

        //console.log('CTFinalobj : ',CTFinalobj);
        //console.log('CTFinalobj : ',Object.keys(CTFinalobj).length);
        
        // ---------------------------------- SCRCT Table ----------------------------------
        let svDataSCRCT = await helper.IBM_getSubjectVisit_CT(instance,https,cookie,request,'data_datatable&param1=SCRCT');
        
        finalJSON = JSON.parse(xmlParser.toJson(svDataSCRCT.data))['reply']['data']['datarow'];

        let SCRCTObj = await helper.IBM_parseSCRCTData(finalJSON); 
        let SCRCTFinalobj ={};

        if(SCRCTObj['status'] == 'success'){
            SCRCTFinalobj = SCRCTObj['result'];
            
        }else{
            throw 'SCRCT IBM data parsing failed.';
        }

        //console.log('SCRCTFinalobj : ',SCRCTFinalobj);
        //console.log('SCRCTFinalobj data : ',Object.keys(SCRCTFinalobj).length);

        // ---------------------------------- IDXP Table ----------------------------------
        let svDataIDXP = await helper.IBM_getSubjectVisit_CT(instance,https,cookie,request,'data_datatable&param1=IDXP');
        
        finalJSON = JSON.parse(xmlParser.toJson(svDataIDXP.data))['reply']['data']['datarow'];

        let IDXPObj = await helper.IBM_parseIDXPData(finalJSON); 
        let IDXPFinalobj={}; 

        if(IDXPObj['status'] == 'success'){
            IDXPFinalobj = IDXPObj['result'];
            
        }else{
            throw 'IDXP IBM data parsing failed.';
        }


        //console.log('IDXPFinalobj : ',IDXPFinalobj);
        //console.log('IDXPFinalobj data : ',Object.keys(IDXPFinalobj).length);

        // ---------------------------------- IDXH Table ----------------------------------
        let svDataIDXH = await helper.IBM_getSubjectVisit_CT(instance,https,cookie,request,'data_datatable&param1=IDXH');
        
        finalJSON = JSON.parse(xmlParser.toJson(svDataIDXH.data))['reply']['data']['datarow'];
        
        let IDXHObj = await helper.IBM_parseIDXHData(finalJSON); 
        let IDXHFinalobj={}; 

        if(IDXHObj['status'] == 'success'){
            IDXHFinalobj = IDXHObj['result'];
            
        }else{
            throw 'IDXH IBM data parsing failed.';
        }

        //console.log('IDXHFinalobj : ',IDXHFinalobj);
        //console.log('IDXHFinalobj data : ',Object.keys(IDXHFinalobj).length);

        // ---------------------------------- EXIT Table ----------------------------------

        let svDataEXIT = await helper.IBM_getSubjectVisit_CT(instance,https,cookie,request,'data_datatable&param1=EXIT');
        finalJSON = JSON.parse(xmlParser.toJson(svDataEXIT.data))['reply']['data']['datarow'];

        let EXITObj = await helper.IBM_parseEXITData(finalJSON); 
        let EXITFinalobj={}; 
        if(EXITObj['status'] == 'success'){
            EXITFinalobj = EXITObj['result'];
            
        }else{
            throw 'EXITF IBM data parsing failed.';
        }
        //console.log('EXITFinalobj : ',EXITFinalobj);
        //console.log('EXITFinalobj data : ',Object.keys(EXITFinalobj).length);

        // ---------------------------------- DEATH Table ----------------------------------
        let svDataDEATH = await helper.IBM_getSubjectVisit_CT(instance,https,cookie,request,'data_datatable&param1=DEATH');
        
        finalJSON = JSON.parse(xmlParser.toJson(svDataDEATH.data))['reply']['data']['datarow'];

        let DEATHObj = await helper.IBM_parseDEATHData(finalJSON); 
        let DEATHFinalobj={}; 

        if(DEATHObj['status'] == 'success'){
            DEATHFinalobj = DEATHObj['result'];
            
        }else{   
            throw 'DEATH IBM data parsing failed.';
        }

        //console.log('DEATHFinalobj : ',DEATHFinalobj);
        //console.log('DEATHFinalobj data : ',Object.keys(DEATHFinalobj).length);

    // -------------------------------------------------------------------- Screening START --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        let Final_Subject_Visit_Screening_Data = {};

        let Subject_Visit_Screening = await helper.SubjectVisitScreening(SCRCTFinalobj , CTFinalobj , ELIGFinalData , CASEREVFinalData,IBM_Codlist_SV_Data);
        //console.log('Subject_Visit_Screening : ' , Subject_Visit_Screening['539205']);
        //console.log('Subject_Visit_Screening : ',Object.keys(Subject_Visit_Screening).length );

        for(let yh=0;yh<Object.keys(Subject_Visit_Screening).length;yh++){
            
            let key = Object.keys(Subject_Visit_Screening)[yh];
            if(key != undefined && Object.keys(Final_Subject_Visit_Screening_Data).includes(key)){
                
                let child = Subject_Visit_Screening[key];
                let finalchild = Final_Subject_Visit_Screening_Data[key].concat(child);
                Final_Subject_Visit_Screening_Data[key] = finalchild;
                
            }else{
                let child = Subject_Visit_Screening[key];
                
                Final_Subject_Visit_Screening_Data[key] = child;
            
            }

        }

        let screening_SV_Obj = await helper.IBMCodlist(sfdc_Con,Final_Subject_Visit_Screening_Data); 
        
        let Final_Subject_Visit_Screening_Array=[];
        if(screening_SV_Obj['status'] == 'success'){
            Final_Subject_Visit_Screening_Array = screening_SV_Obj['result'];
            
        }else{
            throw 'Final IBM data parsing failed.';
        }
        //console.log('Final_Subject_Visit_Screening_Array : ' , Final_Subject_Visit_Screening_Array);
        console.log('Final_Subject_Visit_Screening_Array : ' , Final_Subject_Visit_Screening_Array.length);

        if(Final_Subject_Visit_Screening_Array.length>0){
            let Screening_SV_Promise = await insert_SV_InBatches(sfdc_Con, Final_Subject_Visit_Screening_Array);
            console.log('Screening_SV_Promise : ' , Screening_SV_Promise.length);

            let Screening_SV_Promise_Result = await helper.SV_Promises(Screening_SV_Promise);
            //let missing_Data_Find = await helper.missing_SV_Data_Find(sfdc_Con, Final_Subject_Visit_Screening_Array);
        }
        

    // -------------------------------------------------------------------- Screening END ------------------------------------------------------------------------------------------------------

    //-------------------------------------------------------------------- 30 Days Subject Visit------------------------------------------------------------------------------------------------

        let Final_Subject_Visit_30_Days_Data = {};
        let Subject_Visit_30Days = await helper.SubjectVisit30Days(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data);
        //console.log('Subject_Visit_30Days : ' , Subject_Visit_30Days);
        //console.log('Subject_Visit_30Days : ',Object.keys(Subject_Visit_30Days).length );

        for(let yh=0;yh<Object.keys(Subject_Visit_30Days).length;yh++){
            
            let key = Object.keys(Subject_Visit_30Days)[yh];
            if(key != undefined && Object.keys(Final_Subject_Visit_30_Days_Data).includes(key)){
                
                let child = Subject_Visit_30Days[key];
                let finalchild = Final_Subject_Visit_30_Days_Data[key].concat(child);
                Final_Subject_Visit_30_Days_Data[key] = finalchild;
                
            }else{
                let child = Subject_Visit_30Days[key];
                
                Final_Subject_Visit_30_Days_Data[key] = child;
            
            }

        }

        let SV_30_Days_Obj = await helper.IBMCodlist(sfdc_Con,Final_Subject_Visit_30_Days_Data); 
        
        let SV_30_Days_Array=[];
        if(SV_30_Days_Obj['status'] == 'success'){
            SV_30_Days_Array = SV_30_Days_Obj['result'];
            
        }else{
            throw 'Final IBM data parsing failed.';
        }
        //console.log('SV_30_Days_Array : ' , SV_30_Days_Array);
        console.log('SV_30_Days_Array : ' , SV_30_Days_Array.length);

        if(SV_30_Days_Array.length>0){
            let SV_30_Days_Promise = await insert_SV_InBatches(sfdc_Con, SV_30_Days_Array);
            console.log('SV_30_Days_Promise : ' , SV_30_Days_Promise.length);

            let SV_30_Days_Promise_Result = await helper.SV_Promises(SV_30_Days_Promise);
        }
        // ---------------------------------- 30 Days Data END ----------------------------------

        // ---------------------------------- 6 Months Data Start ----------------------------------

        let Final_Subject_Visit_6_Months_Data = {};
        let Subject_Visit_6months = await helper.SubjectVisit6months(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data);
        //console.log('Subject_Visit_6months : ' , Subject_Visit_6months);
        //console.log('Subject_Visit_6months : ',Object.keys(Subject_Visit_6months).length );

        for(let yh=0;yh<Object.keys(Subject_Visit_6months).length;yh++){
            
            let key = Object.keys(Subject_Visit_6months)[yh];
            if(key != undefined && Object.keys(Final_Subject_Visit_6_Months_Data).includes(key)){
                
                let child = Subject_Visit_6months[key];
                let finalchild = Final_Subject_Visit_6_Months_Data[key].concat(child);
                Final_Subject_Visit_6_Months_Data[key] = finalchild;
                
            }else{
                let child = Subject_Visit_6months[key];
                Final_Subject_Visit_6_Months_Data[key] = child;
            
            }

        }

        let SV_6_Months_Obj = await helper.IBMCodlist(sfdc_Con,Final_Subject_Visit_6_Months_Data); 
        
        let SV_6_Months_Array=[];
        if(SV_6_Months_Obj['status'] == 'success'){
            SV_6_Months_Array = SV_6_Months_Obj['result'];
            
        }else{
            throw 'Final IBM data parsing failed.';
        }
        //console.log('SV_6_Months_Array : ' , SV_6_Months_Array);
        console.log('SV_6_Months_Array : ' , SV_6_Months_Array.length);
        
        if(SV_6_Months_Array.length>0){
            let SV_6_Months_Promise = await insert_SV_InBatches(sfdc_Con, SV_6_Months_Array);
            console.log('SV_6_Months_Promise : ' , SV_6_Months_Promise.length);

            let SV_6_Months_Promise_Result = await helper.SV_Promises(SV_6_Months_Promise);
        }
        // ---------------------------------- 6 Months Data END  ----------------------------------


        // ---------------------------------- 1 Year Data Start ----------------------------------

        let Final_Subject_Visit_1_Year_Data = {};

        let Subject_Visit_1_year = await helper.SubjectVisit1year(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data);
        //console.log('Subject_Visit_1_year : ' , Subject_Visit_1_year);
        //console.log('Subject_Visit_1_year : ',Object.keys(Subject_Visit_1_year).length );

        for(let yh=0;yh<Object.keys(Subject_Visit_1_year).length;yh++){
            
            let key = Object.keys(Subject_Visit_1_year)[yh];
            if(key != undefined && Object.keys(Final_Subject_Visit_1_Year_Data).includes(key)){
                
                let child = Subject_Visit_1_year[key];
                let finalchild = Final_Subject_Visit_1_Year_Data[key].concat(child);
                Final_Subject_Visit_1_Year_Data[key] = finalchild;
                
            }else{
                let child = Subject_Visit_1_year[key];
                
                Final_Subject_Visit_1_Year_Data[key] = child;
            
            }

        }

        let SV_1_Year_Obj = await helper.IBMCodlist(sfdc_Con,Final_Subject_Visit_1_Year_Data); 
        
        let SV_1_Year_Array=[];
        if(SV_1_Year_Obj['status'] == 'success'){
            SV_1_Year_Array = SV_1_Year_Obj['result'];
            
        }else{
            throw 'Final IBM data parsing failed.';
        }
        //console.log('SV_1_Year_Array : ' , SV_1_Year_Array);
        console.log('SV_1_Year_Array : ' , SV_1_Year_Array.length);

        if(SV_1_Year_Array.length>0){
            let SV_1_Year_Promise = await insert_SV_InBatches(sfdc_Con, SV_1_Year_Array);
            console.log('SV_1_Year_Promise : ' , SV_1_Year_Promise.length);

            let SV_1_Year_Promise_Result = await helper.SV_Promises(SV_1_Year_Promise);
        }
        // ---------------------------------- 1 Year Data END ----------------------------------
        
        // ---------------------------------- 2 Year Data Start --------------------------------------------------------------------------------------
        
        let Final_Subject_Visit_2_Years_Data = {};
        let Subject_Visit_2_years = await helper.SubjectVisit2years(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data);
        //console.log('Subject_Visit_2_years : ' , Subject_Visit_2_years);
        //console.log('Subject_Visit_2_years : ',Object.keys(Subject_Visit_2_years).length );

        for(let yh=0;yh<Object.keys(Subject_Visit_2_years).length;yh++){
            
            let key = Object.keys(Subject_Visit_2_years)[yh];
            if(key != undefined && Object.keys(Final_Subject_Visit_2_Years_Data).includes(key)){
                
                let child = Subject_Visit_2_years[key];
                let finalchild = Final_Subject_Visit_2_Years_Data[key].concat(child);
                Final_Subject_Visit_2_Years_Data[key] = finalchild;
                
            }else{
                let child = Subject_Visit_2_years[key];
                
                Final_Subject_Visit_2_Years_Data[key] = child;
            
            }

        }

        let SV_2_Years_Obj = await helper.IBMCodlist(sfdc_Con,Final_Subject_Visit_2_Years_Data); 
        
        let SV_2_Years_Array=[];
        if(SV_2_Years_Obj['status'] == 'success'){
            SV_2_Years_Array = SV_2_Years_Obj['result'];
            
        }else{
            throw 'Final IBM data parsing failed.';
        }
        //console.log('SV_2_Years_Array : ' , SV_2_Years_Array);
        console.log('SV_2_Years_Array : ' , SV_2_Years_Array.length);

        if(SV_2_Years_Array.length>0){
            let SV_2_Years_Promise = await insert_SV_InBatches(sfdc_Con, SV_2_Years_Array);
            console.log('SV_2_Years_Promise : ' , SV_2_Years_Promise.length);

            let SV_2_Years_Promise_Result = await helper.SV_Promises(SV_2_Years_Promise);
        }
        // ---------------------------------- 2 Year Data END --------------------------------------------------------------------------------------

        // ---------------------------------- 3 Year Data Start --------------------------------------------------------------------------------------

        let Final_Subject_Visit_3_Years_Data = {};

        let Subject_Visit_3_years = await helper.SubjectVisit3years(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data);
        //console.log('Subject_Visit_3_years : ' , Subject_Visit_3_years);
        //console.log('Subject_Visit_3_years : ',Object.keys(Subject_Visit_3_years).length );

        for(let yh=0;yh<Object.keys(Subject_Visit_3_years).length;yh++){
            
            let key = Object.keys(Subject_Visit_3_years)[yh];
            if(key != undefined && Object.keys(Final_Subject_Visit_3_Years_Data).includes(key)){
                
                let child = Subject_Visit_3_years[key];
                let finalchild = Final_Subject_Visit_3_Years_Data[key].concat(child);
                Final_Subject_Visit_3_Years_Data[key] = finalchild;
                
            }else{
                let child = Subject_Visit_3_years[key];
                
                Final_Subject_Visit_3_Years_Data[key] = child;
            
            }

        }

        let SV_3_Years_Obj = await helper.IBMCodlist(sfdc_Con,Final_Subject_Visit_3_Years_Data); 
        
        let SV_3_Years_Array=[];
        if(SV_3_Years_Obj['status'] == 'success'){
            SV_3_Years_Array = SV_3_Years_Obj['result'];
            
        }else{
            throw 'Final IBM data parsing failed.';
        }
        //console.log('SV_3_Years_Array : ' , SV_3_Years_Array);
        console.log('SV_3_Years_Array : ' , SV_3_Years_Array.length);
        if(SV_3_Years_Array.length>0){
            let SV_3_Years_Promise = await insert_SV_InBatches(sfdc_Con, SV_3_Years_Array);
            console.log('SV_3_Years_Promise : ' , SV_3_Years_Promise.length);

            let SV_3_Years_Promise_Result = await helper.SV_Promises(SV_3_Years_Promise);
        }
        // ---------------------------------- 3 Year Data END --------------------------------------------------------------------------------------

        // ---------------------------------- 4 Year Data Start --------------------------------------------------------------------------------------

        let Final_Subject_Visit_4_Years_Data = {};

        let Subject_Visit_4_years = await helper.SubjectVisit4years(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data);
        //console.log('Subject_Visit_4_years : ' , Subject_Visit_4_years);
        //console.log('Subject_Visit_4_years : ',Object.keys(Subject_Visit_4_years).length );

        for(let yh=0;yh<Object.keys(Subject_Visit_4_years).length;yh++){
            
            let key = Object.keys(Subject_Visit_4_years)[yh];
            if(key != undefined && Object.keys(Final_Subject_Visit_4_Years_Data).includes(key)){
                
                let child = Subject_Visit_4_years[key];
                let finalchild = Final_Subject_Visit_4_Years_Data[key].concat(child);
                Final_Subject_Visit_4_Years_Data[key] = finalchild;
                
            }else{
                let child = Subject_Visit_4_years[key];
                
                Final_Subject_Visit_4_Years_Data[key] = child;
            
            }

        }

        let SV_4_Years_Obj = await helper.IBMCodlist(sfdc_Con,Final_Subject_Visit_4_Years_Data); 
        
        let SV_4_Years_Array=[];
        if(SV_4_Years_Obj['status'] == 'success'){
            SV_4_Years_Array = SV_4_Years_Obj['result'];
            
        }else{
            throw 'Final IBM data parsing failed.';
        }
        //console.log('SV_4_Years_Array : ' , SV_4_Years_Array);
        console.log('SV_4_Years_Array : ' , SV_4_Years_Array.length);

        if(SV_4_Years_Array.length>0){
            let SV_4_Years_Promise = await insert_SV_InBatches(sfdc_Con, SV_4_Years_Array);
            console.log('SV_4_Years_Promise : ' , SV_4_Years_Promise.length);

            let SV_4_Years_Promise_Result = await helper.SV_Promises(SV_4_Years_Promise);
        }
    // ---------------------------------- 4 Year Data END --------------------------------------------------------------------------------------

    // ---------------------------------- 5 Year Data START --------------------------------------------------------------------------------------

        let Final_Subject_Visit_5_Years_Data = {};

        let Subject_Visit_5_years = await helper.SubjectVisit5years(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data);
        //console.log('Subject_Visit_5_years : ' , Subject_Visit_5_years);
        //console.log('Subject_Visit_5_years : ',Object.keys(Subject_Visit_5_years).length );

        for(let yh=0;yh<Object.keys(Subject_Visit_5_years).length;yh++){
            
            let key = Object.keys(Subject_Visit_5_years)[yh];
            if(key != undefined && Object.keys(Final_Subject_Visit_5_Years_Data).includes(key)){
                
                let child = Subject_Visit_5_years[key];
                let finalchild = Final_Subject_Visit_5_Years_Data[key].concat(child);
                Final_Subject_Visit_5_Years_Data[key] = finalchild;
                
            }else{
                let child = Subject_Visit_5_years[key];
                
                Final_Subject_Visit_5_Years_Data[key] = child;
            
            }

        }

        let SV_5_Years_Obj = await helper.IBMCodlist(sfdc_Con,Final_Subject_Visit_5_Years_Data); 
        
        let SV_5_Years_Array=[];
        if(SV_5_Years_Obj['status'] == 'success'){
            SV_5_Years_Array = SV_5_Years_Obj['result'];
            
        }else{
            throw 'Final IBM data parsing failed.';
        }
        //console.log('SV_5_Years_Array : ' , SV_5_Years_Array);
        console.log('SV_5_Years_Array : ' , SV_5_Years_Array.length);

        if(SV_5_Years_Array.length>0){

            let SV_5_Years_Promise = await insert_SV_InBatches(sfdc_Con, SV_5_Years_Array);
            console.log('SV_5_Years_Promise : ' , SV_5_Years_Promise.length);
    
            let SV_5_Years_Promise_Result = await helper.SV_Promises(SV_5_Years_Promise);

        }
    

     // ---------------------------------- 5 Year Data END --------------------------------------------------------------------------------------

     // ---------------------------------- UNSCHEDULED VISIT START --------------------------------------------------------------------------------------

        let Final_SV_Unscheduled_Visit_Data = {};
    
        let Subject_Visit_UnScheduled_Visit = await helper.SubjectVisitUnScheduledVisit(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data);
        //console.log('Subject_Visit_UnScheduled_Visit : ' , Subject_Visit_UnScheduled_Visit);
        //console.log('Subject_Visit_UnScheduled_Visit : ',Object.keys(Subject_Visit_UnScheduled_Visit).length );

        for(let ye=0;ye<Object.keys(Subject_Visit_UnScheduled_Visit).length;ye++){  
            
            let key = Object.keys(Subject_Visit_UnScheduled_Visit)[ye];
            if(key != undefined && Object.keys(Final_SV_Unscheduled_Visit_Data).includes(key)){
                
                let child = Subject_Visit_UnScheduled_Visit[key];
                let finalchild = Final_SV_Unscheduled_Visit_Data[key].concat(child);
                Final_SV_Unscheduled_Visit_Data[key] = finalchild;
                
            }else{
                let child = Subject_Visit_UnScheduled_Visit[key];
                
                Final_SV_Unscheduled_Visit_Data[key] = child;
            
            }

        }

        let SV_Unscheduled_Visit_Obj = await helper.IBMCodlist(sfdc_Con,Final_SV_Unscheduled_Visit_Data); 
        
        let SV_Unscheduled_Visit_Array=[];
        if(SV_Unscheduled_Visit_Obj['status'] == 'success'){
            SV_Unscheduled_Visit_Array = SV_Unscheduled_Visit_Obj['result'];
            
        }else{
            throw 'Final IBM data parsing failed.';
        }
        //console.log('SV_Unscheduled_Visit_Array : ' , SV_Unscheduled_Visit_Array);
        console.log('SV_Unscheduled_Visit_Array : ' , SV_Unscheduled_Visit_Array.length);

        if(SV_Unscheduled_Visit_Array.length>0){
            let SV_Unscheduled_Visit_Promise = await insert_SV_InBatches(sfdc_Con, SV_Unscheduled_Visit_Array);
            console.log('SV_Unscheduled_Visit_Promise : ' , SV_Unscheduled_Visit_Promise.length);

            let SV_Unscheduled_Visit_Promise_Result = await helper.SV_Promises(SV_Unscheduled_Visit_Promise);
        }
        // ---------------------------------- UNSCHEDULED VISIT END --------------------------------------------------------------------------------------

        // ---------------------------------- Enhanced FollowUp STRAT --------------------------------------------------------------------------------------

        let Final_SV_Enhanced_FollowUp_Data = {};

        let Subject_Visit_Enhanced_FollowUp = await helper.SubjectVisitEnhancedFollowUp(FUFinalData,CTFinalobj,IBM_Codlist_SV_Data);
        //console.log('Subject_Visit_Enhanced_FollowUp : ' , Subject_Visit_Enhanced_FollowUp);

        for(let yf=0;yf<Object.keys(Subject_Visit_Enhanced_FollowUp).length;yf++){  
            
            let key = Object.keys(Subject_Visit_Enhanced_FollowUp)[yf];
            if(key != undefined && Object.keys(Final_SV_Enhanced_FollowUp_Data).includes(key)){
                
                let child = Subject_Visit_Enhanced_FollowUp[key];
                let finalchild = Final_SV_Enhanced_FollowUp_Data[key].concat(child);
                Final_SV_Enhanced_FollowUp_Data[key] = finalchild;
                
            }else{
                let child = Subject_Visit_Enhanced_FollowUp[key];
                
                Final_SV_Enhanced_FollowUp_Data[key] = child;
            }
        }

        let SV_Enhanced_FollowUp_Obj = await helper.IBMCodlist(sfdc_Con,Final_SV_Enhanced_FollowUp_Data); 
        
        let SV_Enhanced_FollowUp_Array=[];
        if(SV_Enhanced_FollowUp_Obj['status'] == 'success'){
            SV_Enhanced_FollowUp_Array = SV_Enhanced_FollowUp_Obj['result'];
            
        }else{
            throw 'Final IBM data parsing failed.';
        }
        //console.log('SV_Enhanced_FollowUp_Array : ' , SV_Enhanced_FollowUp_Array);
        console.log('SV_Enhanced_FollowUp_Array : ' , SV_Enhanced_FollowUp_Array.length);
        
        if(SV_Enhanced_FollowUp_Array.length>0){
            let SV_Enhanced_FollowUp_Promise = await insert_SV_InBatches(sfdc_Con, SV_Enhanced_FollowUp_Array);
            console.log('SV_Enhanced_FollowUp_Promise : ' , SV_Enhanced_FollowUp_Promise.length);

            let SV_Enhanced_FollowUp_Promise_Result = await helper.SV_Promises(SV_Enhanced_FollowUp_Promise);
        }

    // ---------------------------------- Enhanced_FollowUp END --------------------------------------------------------------------------------------

    // ---------------------------------- Index_Procedure STRAT --------------------------------------------------------------------------------------
    
        let Final_SV_Index_Procedure_Data = {};
        let Subject_Visit_Index_Procedure = await helper.SubjectVisitIndexProcedure(FUFinalData,CTFinalobj,IDXPFinalobj,IDXHFinalobj,IBM_Codlist_SV_Data);
        //console.log('Subject_Visit_Index_Procedure : ' , Subject_Visit_Index_Procedure);

        for(let yg=0;yg < Object.keys(Subject_Visit_Index_Procedure).length;yg++){ 
            
            let key = Object.keys(Subject_Visit_Index_Procedure)[yg];
            if(key != undefined && Object.keys(Final_SV_Index_Procedure_Data).includes(key)){
                
                let child = Subject_Visit_Index_Procedure[key];
                let finalchild = Final_SV_Index_Procedure_Data[key].concat(child);
                Final_SV_Index_Procedure_Data[key] = finalchild;
                
            }else{
                let child = Subject_Visit_Index_Procedure[key];
                
                Final_SV_Index_Procedure_Data[key] = child;
            
            }

        }
        let SV_Index_Procedure_Obj = await helper.IBMCodlist(sfdc_Con,Final_SV_Index_Procedure_Data); 
        
        let SV_Index_Procedure_Array=[];
        if(SV_Index_Procedure_Obj['status'] == 'success'){
            SV_Index_Procedure_Array = SV_Index_Procedure_Obj['result'];
            
        }else{
            throw 'Final IBM data parsing failed.';
        }
        //console.log('SV_Index_Procedure_Array : ' , SV_Index_Procedure_Array);
        console.log('SV_Index_Procedure_Array : ' , SV_Index_Procedure_Array.length);
        if(SV_Index_Procedure_Array.length>0){

            let SV_Index_Procedure_Promise = await insert_SV_InBatches(sfdc_Con, SV_Index_Procedure_Array);
            console.log('SV_Index_Procedure_Promise : ' , SV_Index_Procedure_Promise.length);

            let SV_Index_Procedure_Promise_Result = await helper.SV_Promises(SV_Index_Procedure_Promise); 
            //let missing_Data_Find = await helper.missing_SV_Data_Find(sfdc_Con, SV_Index_Procedure_Array);

        }
        
        
    // ---------------------------------- Index_Procedure END --------------------------------------------------------------------------------------

    // ---------------------------------- Chevas_Procedure STRAT --------------------------------------------------------------------------------------
        
        let Final_SV_Chevas_Procedure_Data = {};
        let Subject_Visit_Chevas_Procedure = await helper.SubjectVisitChevasProcedure(FUFinalData,CTFinalobj,IDXPFinalobj,IDXHFinalobj,IBM_Codlist_SV_Data);
        //console.log('Subject_Visit_Chevas_Procedure : ' , Subject_Visit_Chevas_Procedure); 

        for(let yh=0;yh<Object.keys(Subject_Visit_Chevas_Procedure).length;yh++){  
            
            let key = Object.keys(Subject_Visit_Chevas_Procedure)[yh];
            if(key != undefined && Object.keys(Final_SV_Chevas_Procedure_Data).includes(key)){
                
                let child = Subject_Visit_Chevas_Procedure[key];
                let finalchild = Final_SV_Chevas_Procedure_Data[key].concat(child);
                Final_SV_Chevas_Procedure_Data[key] = finalchild;
                
            }else{

                let child = Subject_Visit_Chevas_Procedure[key];
                Final_SV_Chevas_Procedure_Data[key] = child;
            }
        }

        let SV_Chevas_Procedure_Obj = await helper.IBMCodlist(sfdc_Con,Final_SV_Chevas_Procedure_Data); 
        
        let SV_Chevas_Procedure_Array=[];
        if(SV_Chevas_Procedure_Obj['status'] == 'success'){
            SV_Chevas_Procedure_Array = SV_Chevas_Procedure_Obj['result'];
            
        }else{
            throw 'Final IBM data parsing failed.';
        }
        //console.log('SV_Chevas_Procedure_Array : ' , SV_Chevas_Procedure_Array);
        console.log('SV_Chevas_Procedure_Array : ' , SV_Chevas_Procedure_Array.length);

        if(SV_Chevas_Procedure_Array.length >0){
            let SV_Chevas_Procedure_Promise = await insert_SV_InBatches(sfdc_Con, SV_Chevas_Procedure_Array);
            console.log('SV_Chevas_Procedure_Promise : ' , SV_Chevas_Procedure_Promise.length);

            let SV_Chevas_Procedure_Promise_Result = await helper.SV_Promises(SV_Chevas_Procedure_Promise); 
            //let missing_Data_Find = await helper.missing_SV_Data_Find(sfdc_Con, SV_Chevas_Procedure_Array);
        }

    // ---------------------------------- Chevas_Procedure END --------------------------------------------------------------------------------------

    // ---------------------------------- Nina_Procedure STRAT --------------------------------------------------------------------------------------

        let Final_SV_Nina_Procedure_Data = {};

        let Subject_Visit_Nina_Procedure = await helper.SubjectVisitNinaProcedure(FUFinalData,CTFinalobj,IDXPFinalobj,IDXHFinalobj,IBM_Codlist_SV_Data);
        //console.log('Subject_Visit_Nina_Procedure : ' , Subject_Visit_Nina_Procedure);

        for(let yi=0;yi<Object.keys(Subject_Visit_Nina_Procedure).length;yi++){  
            
            let key = Object.keys(Subject_Visit_Nina_Procedure)[yi];
            if(key != undefined && Object.keys(Final_SV_Nina_Procedure_Data).includes(key)){
                
                let child = Subject_Visit_Nina_Procedure[key];
                let finalchild = Final_SV_Nina_Procedure_Data[key].concat(child);
                Final_SV_Nina_Procedure_Data[key] = finalchild;
                
            }else{
                let child = Subject_Visit_Nina_Procedure[key];
                Final_SV_Nina_Procedure_Data[key] = child;
            
            }

        }

        let SV_Nina_Procedure_Obj = await helper.IBMCodlist(sfdc_Con,Final_SV_Nina_Procedure_Data); 
        
        let SV_Nina_Procedure_Array=[];
        if(SV_Nina_Procedure_Obj['status'] == 'success'){
            SV_Nina_Procedure_Array = SV_Nina_Procedure_Obj['result'];
            
        }else{
            throw 'Final IBM data parsing failed.';
        }
        //console.log('SV_Nina_Procedure_Array : ' , SV_Nina_Procedure_Array);
        console.log('SV_Nina_Procedure_Array : ' , SV_Nina_Procedure_Array.length);

        if(SV_Nina_Procedure_Array.length>0){

            let SV_Nina_Procedure_Promise = await insert_SV_InBatches(sfdc_Con, SV_Nina_Procedure_Array);
            console.log('SV_Nina_Procedure_Promise : ' , SV_Nina_Procedure_Promise.length);

            let SV_Nina_Procedure_Promise_Result = await helper.SV_Promises(SV_Nina_Procedure_Promise); 

        }
        

    // ---------------------------------- Nina_Procedure END --------------------------------------------------------------------------------------

    // ---------------------------------- Study_Exit STRAT --------------------------------------------------------------------------------------
        
        let Final_SV_Study_Exit_Data = {};

        let Subject_Visit_Study_Exit = await helper.SubjectVisitStudyExit(FUFinalData,EXITFinalobj,DEATHFinalobj,IBM_Codlist_SV_Data);
        //console.log('Subject_Visit_Study_Exit : ' , Subject_Visit_Study_Exit);

        for(let yj=0;yj<Object.keys(Subject_Visit_Study_Exit).length;yj++){  
            
            let key = Object.keys(Subject_Visit_Study_Exit)[yj];
            if(key != undefined && Object.keys(Final_SV_Study_Exit_Data).includes(key)){
                
                let child = Subject_Visit_Study_Exit[key];
                let finalchild = Final_SV_Study_Exit_Data[key].concat(child);
                Final_SV_Study_Exit_Data[key] = finalchild;
                
            }else{
                let child = Subject_Visit_Study_Exit[key];
                Final_SV_Study_Exit_Data[key] = child;
            }
        }

        let SV_Study_Exit_Obj = await helper.IBMCodlist(sfdc_Con,Final_SV_Study_Exit_Data); 
        
        let SV_Study_Exit_Array=[];
        if(SV_Study_Exit_Obj['status'] == 'success'){
            SV_Study_Exit_Array = SV_Study_Exit_Obj['result'];
            
        }else{
            throw 'Final IBM data parsing failed.';
        }
        //console.log('SV_Study_Exit_Array : ' , SV_Study_Exit_Array);
        console.log('SV_Study_Exit_Array : ' , SV_Study_Exit_Array.length);

        if(SV_Study_Exit_Array.length >0){

            let SV_Study_Exit_Promise = await insert_SV_InBatches(sfdc_Con, SV_Study_Exit_Array);
            console.log('SV_Study_Exit_Promise : ' , SV_Study_Exit_Promise.length);

            let SV_Study_Exit_Promise_Result = await helper.SV_Promises(SV_Study_Exit_Promise); 
            //let missing_Data_Find = await helper.missing_SV_Data_Find(sfdc_Con, SV_Study_Exit_Array);
        }
        

    // ---------------------------------- Study_Exit END --------------------------------------------------------------------------------------

    
        console.log('Everything SV is done..');

        res.json({message: "IBM Fecthing Data is success!!"});
    }
    catch (error) 
    {
        console.log('ERROR OCCURED',error);
        res.json({message: "Error occured!!", error :error});
    }

};

async function insert_SV_InBatches(sfdc, data, itemsPerBatch = 50) {

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
                
                let promis = helper.finalSubjectVisitInsertion(sfdc,chunkedData[j],'CTMS__Subjects_Visit__c');
                all_Promises.push(promis);
            }
            resolve(all_Promises);
            

        }catch(error){

            reject(error);

        }
    });
    

};

module.exports = {processSVData};



