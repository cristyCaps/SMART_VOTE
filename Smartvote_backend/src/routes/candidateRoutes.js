
const express = require('express');
const router = express.Router();
const candidatesController = require('../controllers/candidatesControllers');


router.post('/', candidatesController.createCandidates);
router.get('/get-candidates', candidatesController.getAllCandidates)
router.post('/get-candidate', candidatesController.getCandidatesById);
router.post('/update-filed-coc', candidatesController.updateFiledCoC);

module.exports = router;
