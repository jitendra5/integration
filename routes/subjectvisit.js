const express = require('express'); //import express

const router  = express.Router(); 

const subjectvisitController = require('../controllers/subjectvisit'); 
const testController = require('../controllers/test'); 
const aeController = require('../controllers/ae'); 
const pdController = require('../controllers/pd'); 
const queriesController = require('../controllers/queries'); 

router.get('/subjectvisit', subjectvisitController.processSVData); 

router.get('/test', testController.mockTest); 

router.get('/ae', aeController.processAEData); 
router.get('/pd', pdController.processPDData);
router.get('/queries', queriesController.processQueriesData);

module.exports = router; // export to use in server.js