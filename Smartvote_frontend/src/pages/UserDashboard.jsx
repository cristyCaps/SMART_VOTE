import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiSparkles, HiArrowRight, HiCheckCircle } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeElections, setActiveElections] = useState([]);
  const [userData, setUserData] = useState(null);
  const [votingStatus, setVotingStatus] = useState({});

  // Get user data
  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("userData");
      const parsedUser = rawUser ? JSON.parse(rawUser) : null;
      setUserData(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  // Fetch active elections
  const fetchActiveElections = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/elections/active");
      console.log("All active elections from API:", response.data);
      let filteredElections = response.data;
      
      // Filter elections based on user's department/course
      if (userData && userData.course) {
        const userCourse = userData.course.toUpperCase();
        
        filteredElections = response.data.filter(election => {
          const electionOrg = election.organization.toUpperCase();
          
          // Department mapping - more flexible matching
          if (electionOrg === 'SSG') return true; // SSG is for all students
          if (electionOrg === 'CCS' && (userCourse === 'BSIT' || userCourse.includes('COMPUTER'))) return true;
          if (electionOrg === 'CJE' && (userCourse.includes('CJE') || userCourse.includes('JUSTICE') || userCourse.includes('CRIMINAL'))) return true;
          if (electionOrg === 'CBE' && (userCourse.includes('CBE') || userCourse.includes('BUSINESS') || userCourse.includes('ACCOUNTING') || userCourse.includes('MARKETING'))) return true;
          if (electionOrg === 'PSYCHOLOGY') {
            const isMatch = userCourse.includes('PSYCHOLOGY') || userCourse.includes('PSYCH') || userCourse.includes('PSY') || userCourse.includes('PHSYCHOLOGY') || userCourse.includes('PSYCHOL');
            console.log(`PSYCHOLOGY election: ${electionOrg}, User course: ${userCourse}, Match: ${isMatch}`);
            if (isMatch) return true;
          }
          if (electionOrg === 'HTM' && (userCourse.includes('HTM') || userCourse.includes('HOSPITALITY') || userCourse.includes('TOURISM'))) return true;
          if (electionOrg === 'CTE' && (userCourse.includes('CTE') || userCourse.includes('EDUCATION') || userCourse.includes('TEACHER'))) return true;
          
          return false;
        });
        
      }
      
      setActiveElections(filteredElections);
      
      // Check voting status for each filtered election
      if (userData && filteredElections.length > 0) {
        const statusPromises = filteredElections.map(async (election) => {
          try {
            const statusResponse = await axios.get(
              `http://localhost:3000/api/elections/${userData.id}/${election.id}/has-voted`
            );
            return { electionId: election.id, status: statusResponse.data };
          } catch (error) {
            console.error(`Error checking voting status for election ${election.id}:`, error);
            return { electionId: election.id, status: { has_voted: 0 } };
          }
        });
        
        const statuses = await Promise.all(statusPromises);
        const statusMap = {};
        statuses.forEach(({ electionId, status }) => {
          statusMap[electionId] = status;
        });
        setVotingStatus(statusMap);
      }
    } catch (error) {
      console.error("Error fetching active elections:", error);
    }
  };

  useEffect(() => {
    fetchActiveElections();
  }, [userData]);

  const handleVoteClick = (electionId) => {
    navigate(`/voting/${electionId}`);
  };

  return (
    <div className="flex justify-center lg:m-h-screen h-screen">
      <div className="flex flex-col  items-center gap-8">
        <div className="text-4xl mt-8 font-bold tracking-wider flex text-black ">
          Smartvote Voting System
        </div>
        <div className="w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-8 shadow-2xl">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <HiSparkles className="text-2xl text-yellow-300" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-2xl font-bold">
                      Student Elections 2025: Your Voice, Your Choice, Your
                      Future!
                    </h2>
                    <HiCheckCircle className="text-green-300 text-xl" />
                  </div>

                  <p className="text-blue-100 text-lg mb-4 leading-relaxed">
                    The time has come again for one of the most important events
                    in our campus community—the student elections! This is more
                    than just casting a vote. It’s about taking part in a
                    movement that will shape the direction of our school, our
                    organizations, and our student body.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                      <span>Every ballot counts.</span>
                    </div>
                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                      <span>Every decision matters. </span>
                    </div>
                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                      <span>
                        your vote has the power to influence real change.
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                      <span>Help create positive change for everyone</span>
                    </div>
                  </div>
                  <p className="text-blue-100 mb-6">
                    👉 Will you be the one to decide who leads us forward? Or
                    will you be the one to stand up and lead the way?
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {activeElections.length > 0 ? (
                      (() => {
                        const firstElection = activeElections[0];
                        const status = votingStatus[firstElection.id];
                        const hasVoted = status?.has_voted === 1;
                        
                        return hasVoted ? (
                          <button
                            disabled
                            className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
                          >
                            ✓ Voting Completed
                          </button>
                        ) : (
                          <button
                            onClick={() => handleVoteClick(firstElection.id)}
                            className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                          >
                            Cast Your Vote
                            <HiArrowRight className="text-lg" />
                          </button>
                        );
                      })()
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center gap-2 bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
                      >
                        No Active Elections
                      </button>
                    )}
                    {activeElections.length > 0 ? (
                      <button
                        disabled
                        className="inline-flex items-center gap-2 bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
                      >
                        Filing Closed (Voting Open)
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate("/filecandidacy")}
                        className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
                      >
                        File Candidacy
                        <HiArrowRight className="text-lg" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Elections Section */}
        {activeElections.length > 0 && (
          <div className="w-full max-w-5xl mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Active Elections</h3>
            <div className="grid grid-cols-1 gap-2">
              {activeElections.map((election) => {
                const status = votingStatus[election.id];
                const hasVoted = status?.has_voted === 1;
                const votedPositions = status?.voted_positions || 0;
                const totalPositions = status?.total_positions || 0;
                
                return (
                  <div key={election.id} className="card bg-base-100 shadow-sm">
                    <div className="card-body p-3">
                      <h4 className="card-title text-sm">{election.title}</h4>
                      <div className="text-xs text-gray-500 mb-2">
                        <p>Org: {election.organization}</p>
                        {totalPositions > 0 && (
                          <p className="mt-1">
                            {hasVoted ? (
                              <span className="text-green-600 font-semibold">✓ Completed</span>
                            ) : (
                              <span className="text-blue-600">
                                {votedPositions}/{totalPositions} positions
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                      <div className="card-actions justify-end">
                        {hasVoted ? (
                          <button
                            className="btn btn-success btn-xs"
                            disabled
                          >
                            ✓ Voted
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary btn-xs"
                            onClick={() => handleVoteClick(election.id)}
                          >
                            {votedPositions > 0 ? "Continue" : "Vote"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeElections.length === 0 && (
          <div className="w-full max-w-5xl mt-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <h3 className="text-xl font-bold text-gray-600">No Active Elections</h3>
                <p className="text-gray-500">There are currently no active elections available for voting.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
