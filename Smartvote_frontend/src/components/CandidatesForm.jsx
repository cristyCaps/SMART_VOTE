import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loaders } from "../utils/Loaders";
import { FaCheck } from "react-icons/fa";

export default function CandidateForm({ enabled }) {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [selected, setSelected] = useState("");
  const [org, setOrg] = useState(null);
  const [deptOpen, setDeptOpen] = useState({ SSG: false });
  useEffect(() => {
    if (!userData?.course) return;

    const course = String(userData.course).toUpperCase();
    switch (course) {
      case "BSIT":
        setOrg("CCS");
        break;
      case "BEED":
      case "BSED":
        setOrg("CTE");
        break;
      // Business/Economics related → CBE
      case "BSA":
      case "BSBA":
      case "BSAIS":
      case "BSAT":
        setOrg("CBE");
        break;
      // Hotel/Tourism → HTM
      case "HM":
      case "BSHM":
        setOrg("HTM");
        break;
      case "PSYCHOLOGY":
        // Align with admin/DB key (historical typo used: PSHYCHOLOGY)
        setOrg("PSHYCHOLOGY");
        break;
      case "CRIMINOLOGY":
        setOrg("CJE");
        break;
      default:
        setOrg(null);
    }
  }, [userData?.course]);

  // Only show organizations that are currently OPEN for filing
  const orgOptions = [
    ...(deptOpen.SSG ? [{ id: 1, label: "SSG", value: "SSG" }] : []),
    ...(org && deptOpen[org] ? [{ id: 2, label: org, value: org }] : []),
  ];

  const position = [
    { id: 1, value: "President" },
    { id: 2, value: "Vice President" },
    { id: 3, value: "Secretary" },
    { id: 4, value: "Treasurer" },
    { id: 5, value: "Auditor" },
    { id: 6, value: "MMO" },
  ];

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
    course: userData.course,
    position: "",
    advocacy: "",
    organization: "",
    candidacyType: "",
    partylistName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      organization: selected,
    }));
  }, [selected]);

  // Fetch department-specific filing status for SSG and user's college org
  useEffect(() => {
    const fetchDeptStatus = async (dept) => {
      // Prefer cached OPEN state with valid future deadline to avoid flicker
      try {
        const cached = localStorage.getItem(`filingStatus:${dept}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.isOpen && parsed?.endDate && new Date(parsed.endDate) > new Date()) {
            return true;
          }
        }
      } catch {}

      // Fallback to server status
      try {
        const res = await axios.get(
          `http://localhost:3000/api/admin/getfilingstatus?dept=${encodeURIComponent(dept)}`
        );
        const status = (res?.data?.status || "CLOSED").toUpperCase();
        return status === "OPEN";
      } catch (e) {
        return false;
      }
    };

    const load = async () => {
      const openSSG = await fetchDeptStatus("SSG");
      let openOrg = false;
      if (org && org !== "SSG") {
        openOrg = await fetchDeptStatus(org);
      }
      setDeptOpen((prev) => ({ ...prev, SSG: openSSG, ...(org ? { [org]: openOrg } : {}) }));
      // Default selection to first available open org
      const available = [
        ...(openSSG ? ["SSG"] : []),
        ...(org && openOrg ? [org] : []),
      ];
      if (available.length > 0) {
        setSelected((curr) => (available.includes(curr) ? curr : available[0]));
      } else {
        setSelected("");
      }
      // Control form availability: open if any dept open
      setIsOpenFiling(openSSG || openOrg);
    };

    load();
  }, [org]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.position == "" || formData.advocacy == "" || formData.candidacyType == "") {
      toast.error("Fill up all fields!");
      return;
    }

    if (formData.organization === "") {
      toast.error("Please select an organization!");
      return;
    }

    if (formData.candidacyType === "Partylist" && formData.partylistName === "") {
      toast.error("Please enter your partylist name!");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/candidates",
        formData
      );
      if (response.data.retVal === 1) {
        setTimeout(() => {
          setLoading(false);
          toast.success("Successfully Submitted!");
          navigate("/user-dashboard");
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
      return;
    }
  };

  const [isOpenFiling, setIsOpenFiling] = useState(false);

  return (
    <div className="relative lg:m-h-screen h-screen">
      {loading && (
        <div className="absolute inset-0 z-30  bg-transparent  flex items-center justify-center">
          <Loaders />
        </div>
      )}

      {/* {isOpenFiling ? ( */}

      {!isOpenFiling ? (
        <div className="flex h-screen justify-center items-center">
          <div className="text-2xl font-bold text-black">
            Filing Of Candidacy is not available
          </div>
        </div>
      ) : (
        <>
          <div
            className={`flex flex-col gap-6 justify-center items-center h-screen w-full ${
              loading ? "pointer-events-none opacity-40" : "opacity-100"
            }`}
          >
            <div className="text-2xl font-bold text-black">File Candidacy</div>
            <form className="bg-white p-4 rounded shadow w-1/2 border">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-semibold mb-1 text-black">FirstName</label>
                  <input
                    type="text"
                    firstname="firstname"
                    className="input input-bordered w-full"
                    value={formData.firstname}
                    onChange={handleChange}
                    readOnly
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-black">LastName</label>
                  <input
                    type="text"
                    lastname="lastname"
                    className="input input-bordered w-full"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-semibold mb-1 text-black">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="input input-bordered w-full"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-black">Course</label>
                  <input
                    type="text"
                    name="course"
                    className="input input-bordered w-full"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-semibold mb-1 text-black">Position</label>
                  <select
                    name="position"
                    className="select select-bordered w-full"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Position --</option>
                    {position.map((item) => (
                      <option key={item.id} value={item.value}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-black">Candidacy Type</label>
                  <select
                    name="candidacyType"
                    className="select select-bordered w-full"
                    value={formData.candidacyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Candidacy Type --</option>
                    <option value="Individual">Individual</option>
                    <option value="Partylist">Partylist</option>
                  </select>
                </div>
              </div>

              {formData.candidacyType === "Partylist" && (
                <div className="mb-4">
                  <label className="block font-semibold mb-1 text-black">Partylist Name</label>
                  <input
                    type="text"
                    name="partylistName"
                    className="input input-bordered w-full"
                    value={formData.partylistName}
                    onChange={handleChange}
                    placeholder="Enter your partylist name"
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <div className="font-semibold text-black">Advocacy</div>
                <textarea
                  name="advocacy"
                  value={userData.advocacy}
                  className="textarea w-full"
                  placeholder="Advocacy"
                  onChange={handleChange}
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-black">Organization</label>
                <div className="flex space-x-4 mt-2">
                  {orgOptions.map((item) => (
                    <div
                      key={item.id}
                      name="organization"
                      className={`relative p-2 mb-4 border rounded-lg cursor-pointer w-32 text-center transition-all duration-200
                      ${
                        selected === item.value
                          ? "border-blue-500 bg-blue-100"
                          : "border-gray-300"
                      }`}
                      onClick={() => setSelected(item.value)}
                    >
                      <span className="text-lg font-medium text-black">{item.label}</span>
                      {selected === item.value && (
                        <FaCheck className="absolute top-1 right-1 text-blue-600 w-4 h-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn btn-success w-full" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </>
      )}

      {/* ) : (
        <div className="text-center text-red-500">
          Filing period is closed. Please check back later.
        </div>
      )} */}
    </div>
  );
}
