const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminControllers');

//Admin routes
router.post('/openfiling', adminController.updateFilingofCandidacy); // Assuming this is the route for filing candidacy
router.get('/getfilingstatus', adminController.getFilingStatus); // Route to get filing status

module.exports = router;
