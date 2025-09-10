import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/pentagon-logo.svg";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  const handleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav className="bg-gray-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-5 py-1">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="SmartVote Logo" className="h-20 w-auto" />
          <span className="text-base font-bold text-black">SmartVote</span>
        </div>

        {/* Mobile Hamburger */}
        <div
          className="lg:hidden text-3xl cursor-pointer"
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-10 text-black text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-accent">
              Home
            </Link>
          </li>
          <li>
            <Link to="/elections/info" className="hover:text-accent">
              Elections
            </Link>
          </li>
          <li className="relative">
            <button
              type="button"
              onClick={() => handleDropdown("stats")}
              className="hover:text-accent focus:outline-none"
            >
              Stats ▾
            </button>
            {openDropdown === "stats" && (
              <ul className="absolute bg-white shadow-md rounded mt-1 w-48 z-50 text-sm text-black">
                <li>
                  <Link
                    to="/stats/live-results"
                    className="block px-4 py-2 hover:bg-accent"
                  >
                    Live Results
                  </Link>
                </li>
                <li>
                  <Link
                    to="/stats/participation"
                    className="block px-4 py-2 hover:bg-accent"
                  >
                    Participation Rate
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/features" className="hover:text-accent">
              Features
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-accent">
              About
            </Link>
          </li>
          <li className="relative">
            <button
              type="button"
              onClick={() => handleDropdown("account")}
              className="hover:text-accent focus:outline-none"
            >
              Account ▾
            </button>
            {openDropdown === "account" && (
              <ul className="absolute bg-white shadow-md rounded mt-1 w-48 z-50 text-sm text-black">
                <li>
                  <Link
                    to="/homepage"
                    className="block px-4 py-2 hover:bg-accent"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-accent"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary shadow-lg z-40 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="p-4 flex flex-col space-y-4 text-black text-sm font-medium">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-accent"
          >
            Home
          </Link>
          <Link
            to="/elections/upcoming"
            onClick={() => setMenuOpen(false)}
            className="hover:text-accent"
          >
            Upcoming Elections
          </Link>
          <Link
            to="/elections/past"
            onClick={() => setMenuOpen(false)}
            className="hover:text-accent"
          >
            Past Elections
          </Link>
          <Link
            to="/elections/candidates"
            onClick={() => setMenuOpen(false)}
            className="hover:text-accent"
          >
            Candidates
          </Link>
          <Link
            to="/stats/live-results"
            onClick={() => setMenuOpen(false)}
            className="hover:text-accent"
          >
            Live Results
          </Link>
          <Link
            to="/stats/participation"
            onClick={() => setMenuOpen(false)}
            className="hover:text-accent"
          >
            Participation Rate
          </Link>
          <Link
            to="/features"
            onClick={() => setMenuOpen(false)}
            className="hover:text-accent"
          >
            Features
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="hover:text-accent"
          >
            About
          </Link>
          {/* <Link
            to="/homepage"
            onClick={() => setMenuOpen(false)}
            className="hover:text-accent"
          >
            Sign In
          </Link> */}
          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="hover:text-accent"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
