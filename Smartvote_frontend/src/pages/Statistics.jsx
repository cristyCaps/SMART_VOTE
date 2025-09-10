import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const stats = [];

const yearLevelData = [
  { year: "1st", participation: 120 },
  { year: "2nd", participation: 98 },
  { year: "3rd", participation: 110 },
  { year: "4th", participation: 90 },
];

const genderData = [
  { gender: "Male", participation: 150 },
  { gender: "Female", participation: 170 },
  { gender: "Other", participation: 20 },
];

const departmentData = [
  { dept: "CS", participation: 80 },
  { dept: "IT", participation: 100 },
  { dept: "Business", participation: 60 },
  { dept: "Engineering", participation: 120 },
];

const chartContainerClass = "bg-white rounded-2xl shadow-lg p-2 my-5";

const Statistics = () => {
  const [showYear, setShowYear] = useState(true);
  const [showGender, setShowGender] = useState(true);
  const [showDept, setShowDept] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-5 text-blue-700">
          Admin Statistics
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl shadow-lg p-6 flex flex-col items-center ${stat.color}`}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Chart Selection Checkboxes */}
        <div className="flex flex-wrap gap-6 items-center mb-4 bg-white rounded-xl shadow p-4  ">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showYear}
              onChange={() => setShowYear((v) => !v)}
              className="accent-blue-600"
            />
            <span className="font-medium text-blue-700">Year Level</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showGender}
              onChange={() => setShowGender((v) => !v)}
              className="accent-blue-600"
            />
            <span className="font-medium text-blue-700">Gender</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showDept}
              onChange={() => setShowDept((v) => !v)}
              className="accent-blue-600"
            />
            <span className="font-medium text-blue-700">Department</span>
          </label>
        </div>

        {/* Bar Charts Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
          {showYear && (
            <div className={chartContainerClass}>
              <h2 className="text-xl font-bold mb-4 text-blue-700">
                Participation by Year Level
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={yearLevelData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="participation" fill="#3D74B6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          {showGender && (
            <div className={chartContainerClass}>
              <h2 className="text-xl font-bold mb-4 text-blue-700">
                Participation by Gender
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={genderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="gender" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="participation" fill="#3D74B6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          {showDept && (
            <div className={chartContainerClass}>
              <h2 className="text-xl font-bold mb-4 text-blue-700">
                Participation by Department
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dept" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="participation" fill="#3D74B6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
