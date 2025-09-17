import axios from "axios";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { toast } from "react-toastify";
import { Loaders } from "../utils/Loaders";
import { useSearchParams, useNavigate } from "react-router-dom";
// import CandidatesForm from "../components/CandidatesForm";

export default function Candidates() {
  // Simple role guard: prevent students from accessing admin Candidates page
  const navigate = useNavigate();
  try {
    const rawUser = localStorage.getItem("userData");
    const parsedUser = rawUser ? JSON.parse(rawUser) : null;
    if (parsedUser && parsedUser.firstname !== "Admin") {
      navigate("/user-dashboard");
      return null;
    }
  } catch {}
  // const [formEnabled, setFormEnabled] = useState(false);
  // const [secretKey, setSecretKey] = useState("");
  // const [storedKey] = useState("12345"); // change this in real use
  // const [deadline, setDeadline] = useState(null);

  const [isOpenFiling, setIsOpenFiling] = useState(false);
  const [endDate, setEndDate] = useState(null);

  const getFilingStatus = async (dept) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/getfilingstatus${dept ? `?dept=${encodeURIComponent(dept)}` : ""}`
      );

      const data = response?.data || {};
      const openStatus = data.status || "CLOSED";
      const end = data.end_date || data.end_at || null;

      const isOpen = openStatus === "OPEN";
      const formattedEnd = end ? formatToLocalIsoString(end) : null;

      // Check localStorage first to preserve state during navigation
      let cachedState = null;
      try {
        const cached = localStorage.getItem(`filingStatus:${dept}`);
        if (cached) cachedState = JSON.parse(cached);
      } catch (e) {
        console.error("Failed to parse cached filing status:", e);
      }

      // Prioritize locally stored OPEN state if deadline is in future
      if (cachedState?.isOpen && cachedState.endDate && new Date(cachedState.endDate) > new Date()) {
        setIsOpenFiling(true);
        setEndDate(cachedState.endDate);
      } else {
        setIsOpenFiling(isOpen);
        setEndDate(formattedEnd);
      }

      // Only update cache if server explicitly says OPEN with a valid end date
      if (isOpen && formattedEnd) {
        try {
          localStorage.setItem(
            `filingStatus:${dept}`,
            JSON.stringify({ isOpen, endDate: formattedEnd })
          );
        } catch {}
      } else if (!isOpen && (!cachedState?.isOpen || new Date(cachedState.endDate) <= new Date())) {
        // If server says closed and local state is also closed or expired, clear local
        try {
          localStorage.removeItem(`filingStatus:${dept}`);
        } catch {}
      }
      console.log("filing status:", data);
    } catch (error) {
      console.error("Error fetching filing status:", error);
      // Fallback to CLOSED if endpoint not ready or no record exists yet
      setIsOpenFiling(false);
      setEndDate(null);
      try {
        localStorage.removeItem(`filingStatus:${dept}`);
      } catch {}
    }
  };

  useEffect(() => {
    // Filing status is loaded per department in a later effect once dept is known
  }, []);

  function formatDateTimeReadable(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);

    const pad = (n) => String(n).padStart(2, "0");

    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mm = pad(date.getMinutes());
    const ss = pad(date.getSeconds());

    return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
  }

  function formatToLocalIsoString(dateString) {
    // Robustly parse MySQL-style "YYYY-MM-DD HH:mm:ss" or ISO strings to local time
    let date;
    if (typeof dateString === "string" && dateString.includes(" ")) {
      const [d, t] = dateString.split(" ");
      const [yyyy, MM, dd] = d.split("-").map((n) => parseInt(n, 10));
      const [hh, mm, ss] = (t || "0:0:0").split(":").map((n) => parseInt(n, 10));
      date = new Date(yyyy, (MM || 1) - 1, dd || 1, hh || 0, mm || 0, ss || 0);
    } else {
      date = new Date(dateString);
    }

    const pad = (n) => String(n).padStart(2, "0");

    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mm = pad(date.getMinutes());
    const ss = pad(date.getSeconds());

    return `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`;
  }

  const [data, setData] = useState({
    secretkey: "",
    admin_id: "testAdmin",
    start_date: new Date().toISOString(),
    end_date: "",
    status: "OPEN",
    department: "",
  });

  function toDatetimeLocal(value) {
    const date = new Date(value);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: name === "end_date" ? new Date(value).toISOString() : value,
    }));
  };

  const handleSumbit = async () => {
    if (data.secretkey == "") {
      alert("Secret key is required.");
      return;
    }

    if (data.end_date == "") {
      alert("Please set a deadline.");
      return;
    }
    console.log(formatDateTimeReadable(data.end_date));

    // Simulate form submission

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/admin/openfiling",
        {
          ...data,
          start_date: formatDateTimeReadable(data.start_date),
          end_date: formatDateTimeReadable(data.end_date),
          department: selectedDept,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.retVal === 1) {
        setLoading(false);
        toast.success("Filing of Candidacy is now offcially open.");
        const formattedEnd = data.end_date ? formatToLocalIsoString(data.end_date) : null;
        setIsOpenFiling(true);
        setEndDate(formattedEnd);
        try {
          localStorage.setItem(
            `filingStatus:${selectedDept}`,
            JSON.stringify({ isOpen: true, endDate: formattedEnd })
          );
          localStorage.setItem("lastOpenFilingDept", selectedDept);
        } catch {}
      } else {
        toast.error(response.data.resmsg);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  // console.log(endDate);

  const [timeLeft, setTimeLeft] = useState({ total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  function getTimeRemaining(endTime) {
    const total = endTime - new Date();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
  }

  useEffect(() => {
    if (!endDate) {
      setTimeLeft({ total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    const target = new Date(endDate);
    const tick = () => {
      const newTime = getTimeRemaining(target);
      if (newTime.total <= 0) {
        setTimeLeft({ total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft(newTime);
    };
    // initial tick to avoid 1s delay
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  //Get all candidates
  const [candidates, setCandidates] = useState([]);
  const getCandidates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/candidates/get-candidates"
      );
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      alert("An error occurred while fetching candidates.");
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  const [loading, setLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [showEditDeadline, setShowEditDeadline] = useState(false);
  const [editEndDate, setEditEndDate] = useState("");
  const [editSecretkey, setEditSecretkey] = useState("");
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [closeSecretkey, setCloseSecretkey] = useState("");
  const handleActionFiledCoC = async (
    id,
    firstname,
    lastname,
    email,
    course,
    position,
    organization,
    newStatus,
    remarks
  ) => {
    const statusActions = newStatus === "Accepted" ? "Accept" : "Reject";

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/candidates/update-filed-coc",
        {
          id,
          firstname,
          lastname,
          email,
          course,
          position,
          organization,
          status: newStatus,
          approver_remarks: remarks,
          approved_by: "Admin", // Replace with actual admin ID if needed
        }
      );
      if (response.data.retVal === 1) {
        setTimeout(() => {
          setLoading(false);
          toast.success(`Candidate has been ${newStatus.toLowerCase()}.`);
          getCandidates(); // Refresh candidates list
        }, 3000);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenEditDeadline = () => {
    setEditEndDate(endDate ? toDatetimeLocal(endDate) : "");
    setEditSecretkey("");
    setShowEditDeadline(true);
  };

  const handleUpdateDeadline = async () => {
    if (editSecretkey === "") {
      toast.error("Secret key is required.");
      return;
    }
    if (!editEndDate) {
      toast.error("Please select a new deadline.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/admin/openfiling",
        {
          secretkey: editSecretkey,
          admin_id: "testAdmin",
          start_date: formatDateTimeReadable(new Date().toISOString()),
          end_date: formatDateTimeReadable(new Date(editEndDate).toISOString()),
          status: "OPEN",
          department: selectedDept,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.retVal === 1) {
        toast.success("Deadline updated.");
        setShowEditDeadline(false);
        await getFilingStatus(selectedDept);
      } else {
        toast.error(response.data.resmsg || "Failed to update deadline.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating deadline.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseFiling = () => {
    setCloseSecretkey("");
    setShowCloseModal(true);
  };

  const submitCloseFiling = async () => {
    if (!closeSecretkey) {
      toast.error("Secret key is required.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/admin/openfiling",
        {
          secretkey: closeSecretkey,
          admin_id: "testAdmin",
          start_date: formatDateTimeReadable(new Date().toISOString()),
          end_date: formatDateTimeReadable(new Date().toISOString()),
          status: "CLOSED",
          department: selectedDept,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.retVal === 1) {
        toast.success("Filing closed.");
        // Immediately stop timer and show form
        setEndDate(null);
        setTimeLeft({ total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsOpenFiling(false);
        setShowCloseModal(false);
        // Clear localStorage for this department
        try {
          localStorage.removeItem(`filingStatus:${selectedDept}`);
        } catch {}
        // Refresh from server to keep state in sync
        await getFilingStatus(selectedDept);
      } else {
        toast.error(response.data.resmsg || "Failed to close filing.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error closing filing.");
    } finally {
      setLoading(false);
    }
  };

  const [filterStatus, setFilterStatus] = useState("Pending");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Read department from query string or fallback to last opened dept
  const [searchParams] = useSearchParams();
  const queryDept = (searchParams.get("dept") || "").toUpperCase();
  const lastOpenDept = (() => {
    try { return (localStorage.getItem("lastOpenFilingDept") || "").toUpperCase(); } catch { return ""; }
  })();
  const selectedDept = (queryDept || lastOpenDept || "SSG").toUpperCase();

  useEffect(() => {
    try {
      const cached = localStorage.getItem(`filingStatus:${selectedDept}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (typeof parsed?.isOpen === "boolean") setIsOpenFiling(parsed.isOpen);
        if (parsed?.endDate) setEndDate(parsed.endDate);
      } else {
        setIsOpenFiling(false);
        setEndDate(null);
      }
    } catch {}
    getFilingStatus(selectedDept);
  }, [selectedDept]);

  // Department-specific filter: SSG → all students; CCS → BSIT only by request
  function matchesDepartment(person) {
    if (!person) return false;
    const course = (person.course || "").toUpperCase();
    const organization = (person.organization || "").toUpperCase();

    if (selectedDept === "SSG") return true;
    if (selectedDept === "CCS") return course === "BSIT";
    if (organization === selectedDept) return true;

    return false;
  }

  const filteredCandidates = candidates.filter(
    (person) => person.status == filterStatus && matchesDepartment(person)
  );

  // const lengthStus = candidates.filter(
  //   (item) => item.status === "Pend"
  // );
  // console.log(filteredlength.length);

  return (
    <div
      className="relative text-white
    "
    >
      {/* <Sidebar/> */}
      {loading && (
        <div className="absolute inset-0 z-30  bg-transparent  flex items-center justify-center">
          <Loaders />
        </div>
      )}
      {isOpenFiling ? (
        <div className="flex flex-col items-center h-screen">
          <div className="text-2xl font-bold mt-4">
            Filing Of Candidacy End in
          </div>
          <div className="flex gap-3 mt-3">
            <button className="btn btn-sm" onClick={handleOpenEditDeadline}>Edit Deadline</button>
            <button className="btn btn-sm btn-error" onClick={handleCloseFiling}>Close Filing</button>
          </div>
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max mt-4 mb-4">
            <div className="flex flex-col p-4 bg-neutral text-white rounded-box">
              <span className="countdown font-mono text-2xl text-white">
                <span className="text-white" style={{ "--value": timeLeft.days }}>
                  {timeLeft.days}
                </span>
              </span>
              <span className="text-white">days</span>
            </div>
            <div className="flex flex-col p-4 bg-neutral text-white rounded-box">
              <span className="countdown font-mono text-xl text-white">
                <span className="text-white" style={{ "--value": timeLeft.hours }}>
                  {timeLeft.hours}
                </span>
              </span>
              <span className="text-white">hours</span>
            </div>
            <div className="flex flex-col p-4 bg-neutral text-white rounded-box">
              <span className="countdown font-mono text-xl text-white">
                <span className="text-white" style={{ "--value": timeLeft.minutes }}>
                  {timeLeft.minutes}
                </span>
              </span>
              <span className="text-white">min</span>
            </div>
            <div className="flex flex-col p-4 bg-neutral text-white rounded-box">
              <span className="countdown font-mono text-xl text-white">
                <span className="text-white" style={{ "--value": timeLeft.seconds }}>
                  {timeLeft.seconds}
                </span>
              </span>
              <span className="text-white">sec</span>
            </div>
          </div>
          {showCloseModal && (
            <div className="modal modal-open">
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-2">Close Filing</h3>
                <p className="mb-3">Are you sure you want to close filing?</p>
                <input
                  type="password"
                  className="input input-bordered w-full mb-4 bg-white text-black placeholder-black"
                  placeholder="Enter secret key"
                  value={closeSecretkey}
                  onChange={(e) => setCloseSecretkey(e.target.value)}
                />
                <div className="modal-action">
                  <button className="btn" onClick={() => setShowCloseModal(false)}>Cancel</button>
                  <button className="btn btn-error" onClick={submitCloseFiling}>Confirm</button>
                </div>
              </div>
            </div>
          )}
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          {/* Filter Tabs */}
          <div className="flex flex-row justify-evenly gap-6 mb-4">
            {["Pending", "Accepted", "Rejected"].map((status) => (
              // <div
              //   key={status}
              //   className={`cursor-pointer px-4 py-2 rounded-md font-bold shadow ${
              //     filterStatus === status
              //       ? "bg-blue-500 text-white"
              //       : "bg-white text-gray-700"
              //   }`}
              //   onClick={() => setFilterStatus(status)}
              // >
              //   {status}
              // </div>
              <div className="stats shadow-lg">
                <div
                  className={`stat cursor-pointer ${
                    status == "Pending"
                      ? "bg-blue-300 hover:bg-blue-400"
                      : status == "Accepted"
                      ? "bg-green-300 hover:bg-green-400"
                      : "bg-red-300 hover:bg-red-400"
                  }`}
                  onClick={() => setFilterStatus(status)}
                >
                  <div className="stat-figure text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-8 w-8 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      ></path>
                    </svg>
                  </div>
                  <div className="stat-title font-medium text-md text-black">
                    {status} Candidates
                  </div>
                  {/* <div className="stat-value">{filteredCandidates.length}</div> */}
                  {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-6">
            <div className="mb-2 text-lg font-bold text-black ">
              {filterStatus} Candidates {selectedDept ? `- ${selectedDept}` : ""}
            </div>
            <table className="table w-full border rounded-lg [&_th]:text-black [&_td]:text-black">
              <thead>
                <tr>
                  <th>#</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Position</th>
                  <th>Organization</th>
                  <th>Date Filed</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((person, index) => (
                  <tr key={person.id}>
                    <th>{index + 1}</th>
                    <td>{person.firstname}</td>
                    <td>{person.lastname}</td>
                    <td>{person.email}</td>
                    <td>{person.course}</td>
                    <td>{person.position}</td>
                    <td>{person.organization}</td>
                    <td>{toDatetimeLocal(person.filed_at)}</td>
                    <td
                      className={
                        person.status === "Accepted"
                          ? "text-green-500 font-semibold"
                          : person.status === "Rejected"
                          ? "text-red-500 font-semibold"
                          : "text-yellow-500 font-semibold"
                      }
                    >
                      {person.status}
                    </td>
                    <td className="space-x-2">
                      {person.status === "Pending" && (
                        <>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() =>
                              handleActionFiledCoC(
                                person.id,
                                person.firstname,
                                person.lastname,
                                person.email,
                                person.course,
                                person.position,
                                person.organization,
                                "Accepted",
                                remarks
                              )
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-error btn-sm"
                            onClick={() => {
                              setSelectedCandidate(person);
                              document.getElementById("my_modal_1").showModal();
                            }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal (only one instance) */}
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <p className="font-semibold mb-2">Remarks</p>

              <form className="flex flex-col">
                <textarea
                  name="remarks"
                  className="textarea w-full bg-white text-black placeholder-black"
                  placeholder="Remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                ></textarea>

                <div className="flex gap-2 justify-end mt-4">
                  <button
                    type="button"
                    className="btn"
                    onClick={() =>
                      document.getElementById("my_modal_1").close()
                    }
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn bg-green-500 text-white"
                    onClick={() => {
                      if (selectedCandidate) {
                        handleActionFiledCoC(
                          selectedCandidate.id,
                          selectedCandidate.firstname,
                          selectedCandidate.lastname,
                          selectedCandidate.email,
                          selectedCandidate.course,
                          selectedCandidate.position,
                          selectedCandidate.organization,
                          "Rejected",
                          remarks
                        );
                        setRemarks("");
                        setSelectedCandidate(null);
                        document.getElementById("my_modal_1").close();
                      }
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </dialog>

          {/* Edit Deadline Modal */}
          {showEditDeadline && (
            <div className="modal modal-open">
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-2">Edit Filing Deadline</h3>
                <div className="flex flex-col gap-3">
                  <input
                    type="password"
                    className="input input-bordered w-full bg-black text-white placeholder-white"
                    placeholder="Enter secret key"
                    value={editSecretkey}
                    onChange={(e) => setEditSecretkey(e.target.value)}
                  />
                  <input
                    type="datetime-local"
                    className="input input-bordered w-full bg-white text-black"
                    value={editEndDate}
                    onChange={(e) => setEditEndDate(e.target.value)}
                  />
                </div>
                <div className="modal-action">
                  <button className="btn" onClick={() => setShowEditDeadline(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleUpdateDeadline}>Save</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="max-w-2xl mx-auto p-4 text-black">
            <h2 className="text-2xl font-bold mb-4 text-black">Candidate Filing</h2>

            {/* Admin Controls */}
            <div className="mb-6 bg-slate-100 p-4 rounded shadow-md text-black">
              <h3 className="text-lg font-semibold mb-2 text-black">Admin Controls</h3>
              <input
                type="text"
                placeholder="Enter secret key"
                className="input input-bordered w-full mb-2"
                name="secretkey"
                value={data.secretkey || ""}
                onChange={handleChange}
              />

              <label className="block mb-1 font-semibold text-black">Set Deadline:</label>
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                name="end_date"
                value={data.end_date ? toDatetimeLocal(data.end_date) : ""}
                onChange={handleChange}
              />
              {/* {deadline && (
            <p className="mt-2 text-sm text-gray-600">
              Filing ends on: {new Date(deadline).toLocaleString()}
            </p>
          )} */}
              <button
                className="btn btn-primary w-full mb-2 mt-4"
                onClick={handleSumbit}
              >
                Open Filing COC
              </button>
            </div>

            {/* Candidate Form */}
            {/* <CandidatesForm enabled={formEnabled} /> */}
          </div>
        </>
      )}
      {/* countdown */}
    </div>
  );
}
