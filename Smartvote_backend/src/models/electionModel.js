const db = require("../config/db");

const Election = {
  // Create a new SSG election
  createElection: async (
    _title,
    _description,
    _start_date,
    _end_date,
    _admin_id,
    _organization
  ) => {
    try {
      const [result] = await db.execute(
        "INSERT INTO elections (title, description, start_date, end_date, status, admin_id, organization, created_at) VALUES (?, ?, ?, ?, 'INACTIVE', ?, ?, NOW())",
        [_title, _description, _start_date, _end_date, _admin_id, _organization]
      );
      return { retVal: 1, resmsg: 'Election created successfully', election_id: result.insertId };
    } catch (error) {
      console.error("Error in createElection:", error);
      return { retVal: 0, resmsg: 'Error creating election: ' + error.message };
    }
  },

  // Get all elections
  getAllElections: async () => {
    try {
      const [rows] = await db.execute("SELECT * FROM elections ORDER BY created_at DESC");
      return rows;
    } catch (error) {
      console.error("Error in getAllElections:", error);
      return [];
    }
  },

  // Get active elections
  getActiveElections: async () => {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM elections WHERE status = 'ACTIVE' AND start_date <= NOW() AND end_date >= NOW() ORDER BY created_at DESC"
      );
      return rows;
    } catch (error) {
      console.error("Error in getActiveElections:", error);
      return [];
    }
  },

  // Get election by ID
  getElectionById: async (_id) => {
    try {
      const [rows] = await db.execute("SELECT * FROM elections WHERE id = ?", [_id]);
      return rows[0];
    } catch (error) {
      console.error("Error in getElectionById:", error);
      return null;
    }
  },

  // Update election status
  updateElectionStatus: async (_id, _status, _admin_id) => {
    const [rows] = await db.execute("CALL UpdateElectionStatus(?,?,?)", [
      _id,
      _status,
      _admin_id
    ]);
    return rows[0][0];
  },

  // Cast a vote
  castVote: async (
    _voter_id,
    _election_id,
    _candidate_id,
    _position
  ) => {
    try {
      // Check if voter has already voted for this specific position in this election
      const [existingVotes] = await db.execute(
        "SELECT COUNT(*) as count FROM votes WHERE voter_id = ? AND election_id = ? AND position = ?",
        [_voter_id, _election_id, _position]
      );

      if (existingVotes[0].count > 0) {
        return { retVal: 0, resmsg: `You have already voted for ${_position} in this election` };
      }

      // Insert the vote
      const [result] = await db.execute(
        "INSERT INTO votes (voter_id, election_id, candidate_id, position, voted_at) VALUES (?, ?, ?, ?, NOW())",
        [_voter_id, _election_id, _candidate_id, _position]
      );

      return { retVal: 1, resmsg: "Vote cast successfully" };
    } catch (error) {
      console.error("Error in castVote:", error);
      return { retVal: 0, resmsg: "Error casting vote: " + error.message };
    }
  },

  // Check if voter has already voted in an election
  hasVoted: async (_voter_id, _election_id) => {
    try {
      // Get total positions available for this election
      const [positions] = await db.execute(
        "SELECT COUNT(DISTINCT position) as total_positions FROM candidates c WHERE c.status = 'Accepted' AND c.organization = (SELECT organization FROM elections WHERE id = ?)",
        [_election_id]
      );
      
      // Get positions voted by this voter
      const [votedPositions] = await db.execute(
        "SELECT COUNT(DISTINCT position) as voted_positions FROM votes WHERE voter_id = ? AND election_id = ?",
        [_voter_id, _election_id]
      );
      
      const totalPositions = positions[0].total_positions || 0;
      const votedPositionsCount = votedPositions[0].voted_positions || 0;
      
      return { 
        has_voted: votedPositionsCount >= totalPositions ? 1 : 0,
        total_positions: totalPositions,
        voted_positions: votedPositionsCount
      };
    } catch (error) {
      console.error("Error in hasVoted:", error);
      return { has_voted: 0, total_positions: 0, voted_positions: 0 };
    }
  },

  // Get election results
  getElectionResults: async (_election_id) => {
    const [rows] = await db.execute("CALL GetElectionResults(?)", [_election_id]);
    return rows[0];
  },

  // Get candidates for a specific election and position
  getCandidatesForElection: async (_election_id, _position) => {
    try {
      const [rows] = await db.execute(
        `SELECT DISTINCT c.id, c.firstname, c.lastname, c.course, c.advocacy, c.position
         FROM candidates c
         WHERE c.position = ? 
         AND c.status = 'Accepted'
         AND c.organization = (SELECT organization FROM elections WHERE id = ?)
         ORDER BY c.firstname, c.lastname`,
        [_position, _election_id]
      );
      return rows;
    } catch (error) {
      console.error("Error in getCandidatesForElection:", error);
      return [];
    }
  },

  // Get all positions for an election
  getElectionPositions: async (_election_id) => {
    try {
      const [rows] = await db.execute(
        `SELECT DISTINCT position
         FROM candidates c
         WHERE c.status = 'Accepted'
         AND c.organization = (SELECT organization FROM elections WHERE id = ?)
         ORDER BY 
           CASE position
             WHEN 'President' THEN 1
             WHEN 'Vice President' THEN 2
             WHEN 'Secretary' THEN 3
             WHEN 'Treasurer' THEN 4
             WHEN 'Auditor' THEN 5
             WHEN 'PIO' THEN 6
             WHEN 'Business Manager' THEN 7
             ELSE 8
           END`,
        [_election_id]
      );
      return rows;
    } catch (error) {
      console.error("Error in getElectionPositions:", error);
      return [];
    }
  },

  // Get voter's voting history
  getVoterHistory: async (_voter_id) => {
    const [rows] = await db.execute("CALL GetVoterHistory(?)", [_voter_id]);
    return rows[0];
  }
};

module.exports = Election;
