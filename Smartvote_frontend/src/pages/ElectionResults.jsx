import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Loaders } from "../utils/Loaders";

const ElectionResults = () => {
  const navigate = useNavigate();
  const { electionId } = useParams();
  const [loading, setLoading] = useState(false);
  const [election, setElection] = useState(null);
  const [results, setResults] = useState([]);
  const [positions, setPositions] = useState([]);

  // Admin guard
  try {
    const rawUser = localStorage.getItem("userData");
    const parsedUser = rawUser ? JSON.parse(rawUser) : null;
    if (parsedUser && parsedUser.firstname !== "Admin") {
      navigate("/user-dashboard");
      return null;
    }
  } catch {}

  // Fetch election details
  const fetchElection = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/elections/${electionId}`);
      setElection(response.data);
    } catch (error) {
      console.error("Error fetching election:", error);
      toast.error("Failed to fetch election details");
      navigate("/election");
    }
  };

  // Fetch election results
  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/elections/${electionId}/results`);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
      toast.error("Failed to fetch election results");
    } finally {
      setLoading(false);
    }
  };

  // Fetch positions
  const fetchPositions = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/elections/${electionId}/positions`);
      setPositions(response.data);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  useEffect(() => {
    if (electionId) {
      fetchElection();
      fetchPositions();
      fetchResults();
    }
  }, [electionId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getResultsByPosition = (position) => {
    return results.filter(result => result.position === position);
  };

  const getWinner = (positionResults) => {
    if (positionResults.length === 0) return null;
    return positionResults.reduce((prev, current) => 
      (prev.vote_count > current.vote_count) ? prev : current
    );
  };

  const getTotalVotes = (positionResults) => {
    return positionResults.reduce((total, result) => total + result.vote_count, 0);
  };

  const getPercentage = (votes, total) => {
    if (total === 0) return 0;
    return ((votes / total) * 100).toFixed(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {loading && (
        <div className="absolute inset-0 z-30 bg-transparent flex items-center justify-center">
          <Loaders />
        </div>
      )}

      <div className="mb-8">
        <button
          className="btn btn-outline mb-4"
          onClick={() => navigate("/election")}
        >
          ← Back to Elections
        </button>
        
        {election && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {election.title} - Results
            </h1>
            {election.description && (
              <p className="text-gray-600 mb-4">{election.description}</p>
            )}
            <div className="text-sm text-gray-500">
              <p>Organization: {election.organization}</p>
              <p>Election Period: {formatDate(election.start_date)} - {formatDate(election.end_date)}</p>
              <p>Status: <span className={`badge ${election.status === 'COMPLETED' ? 'badge-success' : 'badge-warning'}`}>{election.status}</span></p>
            </div>
          </div>
        )}
      </div>

      {positions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No positions found for this election</p>
        </div>
      ) : (
        <div className="space-y-8">
          {positions.map((position) => {
            const positionResults = getResultsByPosition(position.position);
            const winner = getWinner(positionResults);
            const totalVotes = getTotalVotes(positionResults);

            return (
              <div key={position.position} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl text-primary mb-4">
                    {position.position}
                  </h2>
                  
                  {winner && (
                    <div className="alert alert-success mb-4">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <strong>Winner:</strong> {winner.firstname} {winner.lastname} 
                          <span className="ml-2 text-sm">({winner.vote_count} votes - {getPercentage(winner.vote_count, totalVotes)}%)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Candidate</th>
                          <th>Course</th>
                          <th>Votes</th>
                          <th>Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {positionResults
                          .sort((a, b) => b.vote_count - a.vote_count)
                          .map((result, index) => (
                            <tr 
                              key={result.candidate_id}
                              className={index === 0 ? "bg-success/10" : ""}
                            >
                              <td>
                                <div className="flex items-center">
                                  {index === 0 && (
                                    <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  )}
                                  <span className="font-bold">#{index + 1}</span>
                                </div>
                              </td>
                              <td>
                                <div className="font-semibold">
                                  {result.firstname} {result.lastname}
                                </div>
                              </td>
                              <td>{result.course}</td>
                              <td>
                                <div className="flex items-center">
                                  <span className="font-bold">{result.vote_count}</span>
                                  <div className="w-20 bg-gray-200 rounded-full h-2 ml-2">
                                    <div 
                                      className="bg-primary h-2 rounded-full" 
                                      style={{ width: `${getPercentage(result.vote_count, totalVotes)}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td className="font-semibold">
                                {getPercentage(result.vote_count, totalVotes)}%
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  {positionResults.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      No votes cast for this position
                    </p>
                  )}

                  <div className="mt-4 text-sm text-gray-600">
                    Total votes cast: <strong>{totalVotes}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {results.length === 0 && positions.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No results available yet</p>
        </div>
      )}
    </div>
  );
};

export default ElectionResults;


