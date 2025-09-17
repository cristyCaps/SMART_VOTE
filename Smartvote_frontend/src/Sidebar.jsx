import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

// at top of Sidebar.jsx
import {
  HiHome,
  HiBell,
  HiUsers,
  HiClipboardCheck,
  HiChartSquareBar,
  HiTrendingUp,
} from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [openElection, setOpenElection] = useState(false);
  const [openCandidates, setOpenCandidates] = useState(false);

  let userData = null;
  try {
    const raw = localStorage.getItem("userData");
    userData = raw ? JSON.parse(raw) : null;
  } catch (e) {
    userData = null;
  }

  if (!userData) {
    return null;
  }

  const admin = userData.firstname === "Admin";
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    try {
      localStorage.removeItem("userData");
    } catch {}
    navigate("/");
  };

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-blue-950 p-4 flex flex-col justify-between h-screen shadow-xl ring-2 ring-black/10 transition-all duration-300`}
    >
      {/* Top Section */}
      <div>
        {/* Hamburger */}
        <button
          className="text-white mb-6"
          onClick={() => setCollapsed(!collapsed)}
        >
          <GiHamburgerMenu size={24} />
        </button>

        {/* User Info */}
        {!collapsed && (
          <div className="flex flex-col items-center gap-4 mb-8">
            <FaUserCircle size={50} className="text-white" />
            <div>
              <h2 className="text-lg font-bold leading-none text-center text-white">
                {userData.firstname} {userData.lastname}
              </h2>
              <p className="text-xs text-white text-center mt-2">
                {userData.course} - {userData.year_level}
              </p>
              <p className="text-sm text-white">{userData.email}</p>
            </div>
          </div>
        )}

        {/* Menu */}
        {admin ? (
          <ul className="menu rounded-box p-2 w-full flex flex-col gap-3">
            <li>
              <Link
                to="/admin-dashboard"
                className={`w-full rounded-lg ${
                  collapsed
                    ? "px-0 py-2 bg-transparent hover:bg-transparent ring-0 shadow-none"
                    : "px-6 py-2 hover:bg-primary ring-1 ring-white/10 shadow-sm"
                } ${
                  isActive("/admin-dashboard") ? "bg-primary text-white" : ""
                }`}
              >
                <span
                  className={`flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  }`}
                  title="Admin Dashboard"
                >
                  <HiHome className="text-xl text-white" />
                  {!collapsed && <span className="text-white">Admin Dashboard</span>}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin-dashboard"
                className={`w-full rounded-lg ${
                  collapsed
                    ? "px-0 py-2 bg-transparent hover:bg-transparent ring-0 shadow-none"
                    : "px-6 py-2 hover:bg-primary ring-1 ring-white/10 shadow-sm"
                } ${
                  isActive("/admin-dashboard") ? "bg-primary text-white" : ""
                }`}
              >
                <span
                  className={`flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  }`}
                  title="Announcement"
                >
                  <HiBell className="text-xl text-white" />
                  {!collapsed && <span className="text-white">Announcement</span>}
                </span>
              </Link>
            </li>
            <li>
              <div
                className={`w-full rounded-lg ${
                  collapsed
                    ? "px-0 py-2 bg-transparent hover:bg-transparent ring-0 shadow-none"
                    : "px-6 py-2 hover:bg-primary ring-1 ring-white/10 shadow-sm"
                }`}
                title="Candidates"
              >
                <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
                  <HiUsers className="text-xl text-white" />
                  {!collapsed && (
                    <>
                      <Link to="/candidates" className="flex-1 text-white">
                        Candidates
                      </Link>
                      <button
                        type="button"
                        className="ml-2 text-xs opacity-80 text-white px-2 py-1 rounded hover:bg-primary/70"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenCandidates((v) => !v);
                        }}
                        aria-label="Toggle Candidates"
                      >
                        {openCandidates ? "−" : "+"}
                      </button>
                    </>
                  )}
                </div>
              </div>
              {!collapsed && openCandidates && (
                <ul className="mt-2 ml-10 flex flex-col gap-1">
                  {["SSG", "CCS", "CJE", "CBE", "PSHYCHOLOGY", "HTM", "CTE"].map((dept) => (
                    <li key={dept}>
                      <button
                        onClick={() => navigate(`/candidates?dept=${encodeURIComponent(dept)}`)}
                        className={`w-full text-left px-2 py-1 rounded hover:bg-primary/70`}
                      >
                        <span className="text-white">{dept}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <div
                className={`w-full rounded-lg ${
                  collapsed
                    ? "px-0 py-2 bg-transparent hover:bg-transparent ring-0 shadow-none"
                    : "px-6 py-2 hover:bg-primary ring-1 ring-white/10 shadow-sm"
                }`}
                title="Election"
              >
                <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
                  <HiClipboardCheck className="text-xl text-white" />
                  {!collapsed && (
                    <>
                      <Link to="/election" className="flex-1 text-white">
                        Election
                      </Link>
                      <button
                        type="button"
                        className="ml-2 text-xs opacity-80 text-white px-2 py-1 rounded hover:bg-primary/70"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenElection((v) => !v);
                        }}
                        aria-label="Toggle Election"
                      >
                        {openElection ? "−" : "+"}
                      </button>
                    </>
                  )}
                </div>
              </div>
              {!collapsed && openElection && (
                <ul className="mt-2 ml-10 flex flex-col gap-1">
                  <li>
                    <Link
                      to="/election"
                      className="w-full text-left px-2 py-1 rounded hover:bg-primary/70 block"
                    >
                      <span className="text-white">Manage Elections</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/candidates"
                      className="w-full text-left px-2 py-1 rounded hover:bg-primary/70 block"
                    >
                      <span className="text-white">Candidate Filing</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/admin-dashboard"
                className={`w-full rounded-lg ${
                  collapsed
                    ? "px-0 py-2 bg-transparent hover:bg-transparent ring-0 shadow-none"
                    : "px-4 py-2 hover:bg-primary ring-1 ring-white/10 shadow-sm"
                } ${
                  isActive("/admin-dashboard") ? "bg-primary text-white" : ""
                }`}
              >
                <span
                  className={`flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  }`}
                  title="Leaderboards"
                >
                  <HiChartSquareBar className="text-xl text-white" />
                  {!collapsed && <span className="text-white">Leaderboards</span>}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/Statistics"
                className={`w-full rounded-lg ${
                  collapsed
                    ? "px-0 py-2 bg-transparent hover:bg-transparent ring-0 shadow-none"
                    : "px-6 py-2 hover:bg-primary ring-1 ring-white/10 shadow-sm"
                } ${isActive("/Statistics") ? "bg-primary text-white" : ""}`}
              >
                <span
                  className={`flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  }`}
                  title="Results & Reports"
                >
                  <HiTrendingUp className="text-xl text-white" />
                  {!collapsed && <span className="text-white">Results & Reports</span>}
                </span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="menu rounded-box p-2 w-full flex flex-col gap-4">
            <li>
              <Link
                to="/user-dashboard"
                className={`hover:bg-base-300 flex items-center gap-3 ${
                  isActive("/user-dashboard") || isActive("/filecandidacy")
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                {!collapsed && <span className="text-white">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/user-dashboard"
                className={`hover:bg-base-300 flex items-center gap-3 ${
                  isActive("/user-dashboard") ? "bg-primary text-white" : ""
                }`}
              >
                {!collapsed && <span className="text-white">Election</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/pending-application"
                className={`hover:bg-base-300 flex items-center gap-3 ${
                  isActive("/pending-application")
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                {!collapsed && <span className="text-white">Pending Application</span>}
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Bottom Logout */}
      <div>
        <button
          className="btn btn-sm btn-error w-full flex justify-between items-center"
          onClick={handleLogout}
        >
          {!collapsed && <span className="text-white">Logout</span>}
          <FaSignOutAlt className="text-white" />
        </button>
      </div>
    </div>
  );
}
