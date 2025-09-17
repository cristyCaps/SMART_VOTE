import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Loaders } from "../utils/Loaders";

const Election = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [elections, setElections] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [electionForm, setElectionForm] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    organization: "SSG"
  });

  // Admin guard
  try {
    const rawUser = localStorage.getItem("userData");
    const parsedUser = rawUser ? JSON.parse(rawUser) : null;
    if (parsedUser && parsedUser.firstname !== "Admin") {
      navigate("/user-dashboard");
      return null;
    }
  } catch {}

  // Fetch all elections
  const fetchElections = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/elections/all");
      setElections(response.data);
    } catch (error) {
      console.error("Error fetching elections:", error);
      toast.error("Failed to fetch elections");
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElectionForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateElection = async (e) => {
    e.preventDefault();
    
    if (!electionForm.title || !electionForm.start_date || !electionForm.end_date) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (new Date(electionForm.start_date) >= new Date(electionForm.end_date)) {
      toast.error("End date must be after start date");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/elections/create", {
        ...electionForm,
        admin_id: "Admin"
      });

      if (response.data.retVal === 1) {
        toast.success("Election created successfully!");
        setShowCreateForm(false);
        setElectionForm({
          title: "",
          description: "",
          start_date: "",
          end_date: "",
          organization: "SSG"
        });
        fetchElections();
      } else {
        toast.error(response.data.resmsg || "Failed to create election");
      }
    } catch (error) {
      console.error("Error creating election:", error);
      toast.error("Failed to create election");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (electionId, newStatus) => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3000/api/elections/${electionId}/status`, {
        status: newStatus,
        admin_id: "Admin"
      });

      if (response.data.retVal === 1) {
        toast.success(`Election ${newStatus.toLowerCase()} successfully!`);
        fetchElections();
      } else {
        toast.error(response.data.resmsg || "Failed to update election status");
      }
    } catch (error) {
      console.error("Error updating election status:", error);
      toast.error("Failed to update election status");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE": return "badge-success";
      case "INACTIVE": return "badge-error";
      case "COMPLETED": return "badge-info";
      default: return "badge-neutral";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {loading && (
        <div className="absolute inset-0 z-30 bg-transparent flex items-center justify-center">
          <Loaders />
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">SSG Elections Management</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateForm(true)}
        >
          Create New Election
        </button>
      </div>

      {/* Create Election Modal */}
      {showCreateForm && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Create New SSG Election</h3>
            <form onSubmit={handleCreateElection} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Election Title *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={electionForm.title}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="e.g., SSG Election 2024"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  value={electionForm.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full"
                  placeholder="Brief description of the election"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Start Date & Time *</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="start_date"
                    value={electionForm.start_date}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">End Date & Time *</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="end_date"
                    value={electionForm.end_date}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Organization</span>
                </label>
                <select
                  name="organization"
                  value={electionForm.organization}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value="SSG">SSG (Supreme Student Government)</option>
                  <option value="CCS">CCS (College of Computer Studies)</option>
                  <option value="CJE">CJE (College of Justice Education)</option>
                  <option value="CBE">CBE (College of Business Education)</option>
                  <option value="PSYCHOLOGY">Psychology</option>
                  <option value="HTM">HTM (Hospitality and Tourism Management)</option>
                  <option value="CTE">CTE (College of Teacher Education)</option>
                </select>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Election
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Elections List */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Organization</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {elections.map((election) => (
              <tr key={election.id}>
                <td>{election.id}</td>
                <td>
                  <div>
                    <div className="font-bold">{election.title}</div>
                    {election.description && (
                      <div className="text-sm text-gray-500">{election.description}</div>
                    )}
                  </div>
                </td>
                <td>{election.organization}</td>
                <td>{formatDate(election.start_date)}</td>
                <td>{formatDate(election.end_date)}</td>
                <td>
                  <span className={`badge ${getStatusColor(election.status)}`}>
                    {election.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    {election.status === "INACTIVE" && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleUpdateStatus(election.id, "ACTIVE")}
                      >
                        Activate
                      </button>
                    )}
                    {election.status === "ACTIVE" && (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleUpdateStatus(election.id, "COMPLETED")}
                      >
                        Complete
                      </button>
                    )}
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => navigate(`/election-results/${election.id}`)}
                    >
                      Results
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {elections.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No elections found. Create your first election!</p>
        </div>
      )}
    </div>
  );
};

export default Election;


