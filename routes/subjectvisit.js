const express = require('express'); //import express

const router  = express.Router(); 

const subjectvisitController = require('../controllers/subjectvisit'); 
const testController = require('../controllers/test'); 

router.get('/subjectvisit', subjectvisitController.processData); 

router.get('/test', testController.mockTest); 
 
module.exports = router; // export to use in server.js