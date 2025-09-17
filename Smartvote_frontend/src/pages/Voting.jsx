import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Loaders } from "../utils/Loaders";

const Voting = () => {
  const navigate = useNavigate();
  const { electionId } = useParams();
  const [loading, setLoading] = useState(false);
  const [election, setElection] = useState(null);
  const [positions, setPositions] = useState([]);
  const [candidates, setCandidates] = useState({});
  const [votes, setVotes] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const [userData, setUserData] = useState(null);

  // Get user data and check if they can vote
  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("userData");
      const parsedUser = rawUser ? JSON.parse(rawUser) : null;
      
      if (!parsedUser || parsedUser.firstname === "Admin") {
        navigate("/");
        return;
      }
      
      setUserData(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/");
    }
  }, [navigate]);

  // Fetch election details
  const fetchElection = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/elections/${electionId}`);
      setElection(response.data);
    } catch (error) {
      console.error("Error fetching election:", error);
      toast.error("Failed to fetch election details");
      navigate("/user-dashboard");
    }
  };

  // Check if user has already voted
  const checkVotingStatus = async () => {
    if (!userData) return;
    
    try {
      const response = await axios.get(
        `http://localhost:3000/api/elections/${userData.id}/${electionId}/has-voted`
      );
      const votingStatus = response.data;
      setHasVoted(votingStatus.has_voted === 1);
      
      // If user has partially voted, show progress
      if (votingStatus.total_positions > 0 && votingStatus.voted_positions > 0) {
        console.log(`Voting progress: ${votingStatus.voted_positions}/${votingStatus.total_positions} positions voted`);
      }
    } catch (error) {
      console.error("Error checking voting status:", error);
    }
  };

  // Fetch positions for the election
  const fetchPositions = async () => {
    try {
      console.log(`Fetching positions for election: ${electionId}`);
      const response = await axios.get(`http://localhost:3000/api/elections/${electionId}/positions`);
      console.log("Election positions:", response.data);
      setPositions(response.data);
    } catch (error) {
      console.error("Error fetching positions:", error);
      toast.error("Failed to fetch election positions");
    }
  };

  // Fetch candidates for each position
  const fetchCandidates = async () => {
    try {
      const candidatesData = {};
      
      console.log("Fetching candidates for positions:", positions);
      
      for (const position of positions) {
        console.log(`Fetching candidates for position: ${position.position}`);
        const response = await axios.get(
          `http://localhost:3000/api/elections/${electionId}/${position.position}/candidates`
        );
        console.log(`Candidates for ${position.position}:`, response.data);
        candidatesData[position.position] = response.data;
      }
      
      console.log("All candidates data:", candidatesData);
      setCandidates(candidatesData);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      toast.error("Failed to fetch candidates");
    }
  };

  useEffect(() => {
    if (electionId) {
      fetchElection();
      fetchPositions();
    }
  }, [electionId]);

  useEffect(() => {
    if (positions.length > 0) {
      fetchCandidates();
    }
  }, [positions]);

  useEffect(() => {
    if (userData) {
      checkVotingStatus();
    }
  }, [userData]);

  const handleVoteChange = (position, candidateId) => {
    setVotes(prev => ({
      ...prev,
      [position]: candidateId
    }));
  };

  const handleSubmitVote = async () => {
    if (!userData) {
      toast.error("User data not found");
      return;
    }

    // Check if all positions have been voted for
    const votedPositions = Object.keys(votes);
    if (votedPositions.length !== positions.length) {
      toast.error("Please vote for all positions");
      return;
    }

    try {
      setLoading(true);
      
      // Submit votes for each position
      for (const [position, candidateId] of Object.entries(votes)) {
        console.log("Submitting vote:", {
          voter_id: userData.id,
          election_id: electionId,
          candidate_id: candidateId,
          position: position
        });

        const response = await axios.post("http://localhost:3000/api/elections/vote", {
          voter_id: userData.id,
          election_id: electionId,
          candidate_id: candidateId,
          position: position
        });

        console.log("Vote response:", response.data);

        if (response.data.retVal !== 1) {
          throw new Error(response.data.resmsg || "Failed to cast vote");
        }
      }

      // Check if user has completed voting for all positions
      const votingStatusResponse = await axios.get(
        `http://localhost:3000/api/elections/${userData.id}/${electionId}/has-voted`
      );
      
      if (votingStatusResponse.data.has_voted === 1) {
        toast.success("All votes cast successfully! You have completed voting for this election.");
        setHasVoted(true);
        navigate("/user-dashboard");
      } else {
        toast.success("Vote cast successfully! Please continue voting for remaining positions.");
        // Refresh the page to show updated voting status
        window.location.reload();
      }
      
    } catch (error) {
      console.error("Error casting vote:", error);
      console.error("Error details:", error.response?.data);
      toast.error(error.response?.data?.resmsg || error.message || "Failed to cast vote");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const isElectionActive = () => {
    if (!election) return false;
    const now = new Date();
    const startDate = new Date(election.start_date);
    const endDate = new Date(election.end_date);
    return now >= startDate && now <= endDate && election.status === "ACTIVE";
  };

  if (hasVoted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl text-green-600 justify-center">
              ✓ Vote Already Cast
            </h2>
            <p className="text-gray-600">
              You have already voted in this election. Thank you for your participation!
            </p>
            <div className="card-actions justify-center mt-4">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/user-dashboard")}
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isElectionActive()) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl text-red-600 justify-center">
              Election Not Active
            </h2>
            <p className="text-gray-600">
              This election is not currently active for voting.
            </p>
            {election && (
              <div className="text-sm text-gray-500 mt-2">
                <p>Start: {formatDate(election.start_date)}</p>
                <p>End: {formatDate(election.end_date)}</p>
                <p>Status: {election.status}</p>
              </div>
            )}
            <div className="card-actions justify-center mt-4">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/user-dashboard")}
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {loading && (
        <div className="absolute inset-0 z-30 bg-transparent flex items-center justify-center">
          <Loaders />
        </div>
      )}

      {election && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{election.title}</h1>
          {election.description && (
            <p className="text-gray-600 mb-4">{election.description}</p>
          )}
          <div className="text-sm text-gray-500">
            <p>Organization: {election.organization}</p>
            <p>Voting Period: {formatDate(election.start_date)} - {formatDate(election.end_date)}</p>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {positions.map((position) => (
          <div key={position.position} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl text-primary">
                {position.position}
              </h2>
              <p className="text-gray-600 mb-4">
                Select your preferred candidate for {position.position}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {candidates[position.position]?.map((candidate) => (
                  <div
                    key={candidate.id}
                    className={`card bg-base-200 shadow-md cursor-pointer transition-all ${
                      votes[position.position] === candidate.id
                        ? "ring-2 ring-primary bg-primary/10"
                        : "hover:shadow-lg"
                    }`}
                    onClick={() => handleVoteChange(position.position, candidate.id)}
                  >
                    <div className="card-body p-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name={position.position}
                          value={candidate.id}
                          checked={votes[position.position] === candidate.id}
                          onChange={() => handleVoteChange(position.position, candidate.id)}
                          className="radio radio-primary"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">
                            {candidate.firstname} {candidate.lastname}
                          </h3>
                          <p className="text-sm text-gray-600">{candidate.course}</p>
                          {candidate.advocacy && (
                            <p className="text-sm text-gray-500 mt-1">
                              <strong>Advocacy:</strong> {candidate.advocacy}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {candidates[position.position]?.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No candidates available for this position
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {positions.length > 0 && (
        <div className="mt-8 text-center">
          <button
            className="btn btn-primary btn-lg"
            onClick={handleSubmitVote}
            disabled={Object.keys(votes).length !== positions.length}
          >
            Submit Vote
          </button>
          <p className="text-sm text-gray-500 mt-2">
            You have voted for {Object.keys(votes).length} out of {positions.length} positions
          </p>
        </div>
      )}

      {positions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No positions available for this election</p>
        </div>
      )}
    </div>
  );
};

export default Voting;
