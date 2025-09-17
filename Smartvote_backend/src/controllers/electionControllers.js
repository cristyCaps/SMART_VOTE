const Election = require("../models/electionModel");

// Create a new election (Admin only)
exports.createElection = async (req, res) => {
  try {
    const {
      title,
      description,
      start_date,
      end_date,
      admin_id,
      organization
    } = req.body;

    // Validate required fields
    if (!title || !start_date || !end_date || !organization) {
      return res.status(400).json({ 
        retVal: 0, 
        resmsg: "Title, start date, end date, and organization are required" 
      });
    }

    // Validate dates
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    
    if (startDate >= endDate) {
      return res.status(400).json({ 
        retVal: 0, 
        resmsg: "End date must be after start date" 
      });
    }

    const election = await Election.createElection(
      title,
      description || "",
      start_date,
      end_date,
      admin_id || "Admin",
      organization
    );

    res.status(201).json(election);
  } catch (error) {
    console.error("Error creating election:", error);
    res.status(500).json({ 
      retVal: 0, 
      resmsg: "Internal server error" 
    });
  }
};

// Get all elections
exports.getAllElections = async (req, res) => {
  try {
    const elections = await Election.getAllElections();
    res.json(elections);
  } catch (error) {
    console.error("Error fetching elections:", error);
    res.status(500).json({ 
      retVal: 0, 
      resmsg: "Internal server error" 
    });
  }
};

// Get active elections
exports.getActiveElections = async (req, res) => {
  try {
    const elections = await Election.getActiveElections();
    res.json(elections);
  } catch (error) {
    console.error("Error fetching active elections:", error);
    res.status(500).json({ 
      retVal: 0, 
      resmsg: "Internal server error" 
    });
  }
};

// Get election by ID
exports.getElectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const election = await Election.getElectionById(id);
    
    if (!election) {
      return res.status(404).json({ 
        retVal: 0, 
        resmsg: "Election not found" 
      });
    }

    res.json(election);
  } catch (error) {
    console.error("Error fetching election:", error);
    res.status(500).json({ 
      retVal: 0, 
      resmsg: "Internal server error" 
    });
  }
};

// Update election status (Admin only)
exports.updateElectionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_id } = req.body;

    if (!status) {
      return res.status(400).json({ 
        retVal: 0, 
        resmsg: "Status is required" 
      });
    }

    const result = await Election.updateElectionStatus(
      id,
      status,
      admin_id || "Admin"
    );

    res.json(result);
  } catch (error) {
    console.error("Error updating election status:", error);
    res.status(500).json({ 
      retVal: 0, 
      resmsg: "Internal server error" 
    });
  }
};

// Cast a vote
exports.castVote = async (req, res) => {
  try {
    const {
      voter_id,
      election_id,
      candidate_id,
      position
    } = req.body;

    console.log("Cast vote request:", { voter_id, election_id, candidate_id, position });

    // Validate required fields
    if (!voter_id || !election_id || !candidate_id || !position) {
      console.log("Missing required fields");
      return res.status(400).json({ 
        retVal: 0, 
        resmsg: "All voting fields are required" 
      });
    }

    const result = await Election.castVote(
      voter_id,
      election_id,
      candidate_id,
      position
    );

    console.log("Cast vote result:", result);
    res.json(result);
  } catch (error) {
    console.error("Error casting vote:", error);
    res.status(500).json({ 
      retVal: 0, 
      resmsg: "Internal server error: " + error.message 
    });
  }
};

// Check if voter has voted
exports.hasVoted = async (req, res) => {
  try {
    const { voter_id, election_id } = req.params;
    const result = await Election.hasVoted(voter_id, election_id);
    res.json(result);
  } catch (error) {
    console.error("Error checking vote status:", error);
    res.status(500).json({ 
      retVal: 0, 
      resmsg: "Internal server error" 
    });
  }
};

// Get election results
exports.getElectionResults = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Election.getElectionResults(id);
    res.json(results);
  } catch (error) {
    console.error("Error fetching election results:", error);
    res.status(500).json({ 
      retVal: 0, 
      resmsg: "Internal server error" 
    });
  }
};

// Get candidates for election
exports.getCandidatesForElection = async (req, res) => {
  try {
    const { election_id, position } = req.params;
    const candidates = await Election.getCandidatesForElection(election_id, position);
    res.json(candidates);
  } catch (error) {
    console.error("Error fetching candidates for election:", error);
    res.status(500).json({ 
      retVal: 0, 
      resmsg: "Internal server error" 
    });
  }
};

// Get election positions
exports.getElectionPositions = async (req, res) => {
  try {
    const { id } = req.params;
    const positions = await Election.getElectionPositions(id);
    res.json(positions);
  } catch (error) {
    console.error("Error fetching election positions:", error);
    res.status(500).json({ 
      retVal: 0, 
      resmsg: "Internal server error" 
    });
  }
};

// Get voter history
exports.getVoterHistory = async (req, res) => {
  try {
    const { voter_id } = req.params;
    const history = await Election.getVoterHistory(voter_id);
    res.json(history);
  } catch (error) {
    console.error("Error fetching voter history:", error);
    res.status(500).json({ 
      retVal: 0, 
      resmsg: "Internal server error" 
    });
  }
};
