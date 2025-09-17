const express = require('express');
const router = express.Router();
const electionController = require('../controllers/electionControllers');

// Election management routes (Admin)
router.post('/create', electionController.createElection);
router.get('/all', electionController.getAllElections);
router.get('/active', electionController.getActiveElections);
router.get('/:id', electionController.getElectionById);
router.put('/:id/status', electionController.updateElectionStatus);

// Voting routes
router.post('/vote', electionController.castVote);
router.get('/:voter_id/:election_id/has-voted', electionController.hasVoted);

// Results and data routes
router.get('/:id/results', electionController.getElectionResults);
router.get('/:election_id/:position/candidates', electionController.getCandidatesForElection);
router.get('/:id/positions', electionController.getElectionPositions);
router.get('/:voter_id/history', electionController.getVoterHistory);

module.exports = router;


