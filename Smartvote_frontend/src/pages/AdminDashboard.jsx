/****  Code History Piste na Voting System Dashboard
* New = N001

* -------------------------------------------------------------
* ID   |      Name         |    Date       |   Remarks  
* -------------------------------------------------------------
* N001 |    Sakamote_dev   | 07/21/2025    | Create Code
* N002 |    joshua-amaw    |               | 
 
 ****/

/*N001 Start*/
import React from "react";
import {
  FaUserGraduate,
  FaUserTie,
  FaCheckCircle,
  FaClipboardList,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const lineData = [
  { name: "8:00 AM", votes: 200 },
  { name: "9:00 AM", votes: 450 },
  { name: "10:00 AM", votes: 300 },
  { name: "11:00 AM", votes: 500 },
  { name: "12:00 PM", votes: 550 },
  { name: "1:00 PM", votes: 600 },
  { name: "2:00 PM", votes: 620 },
  { name: "3:00 PM", votes: 685 },
  { name: "4:00 PM", votes: 750 },
  { name: "5:00 PM", votes: 920 },
];

const barData = [
  { name: "President", votes: 250 },
  { name: "VP", votes: 180 },
  { name: "Secretary", votes: 300 },
  { name: "Treasurer", votes: 200 },
];

const pieData = [
  { name: "CCS", value: 120 },
  { name: "CTE", value: 80 },
  { name: "CBA", value: 150 },
  { name: "PSYCHOLOGY", value: 40 },
  { name: "CJE", value: 90 },
];
const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f472b6", "#a78bfa"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center m-h-screen bg-white-50">
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-black">
          Voting System Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stat bg-primary text-primary-content rounded-box shadow-md">
            <div className="stat-figure text-white">
              <FaUserGraduate size={30} />
            </div>
            <div className="stat-title text-lg">Total Students</div>
            <div className="stat-value">1,234</div>
            <div className="stat-title text-lg">Registered Voters</div>
            <div className="stat-value">1,000</div>
            <FaClipboardList size={30} />
          </div>

          <div className="stat bg-secondary text-secondary-content rounded-box shadow-md">
            <div className="stat-figure text-white">
              <FaUserTie size={30} />
            </div>
            <div className="stat-title text-lg">Candidates</div>
            <div className="stat-value">56</div>
            <div className="stat-title mt-2 text-lg">Departments</div>
            <div className="mt-1 grid grid-cols-3 gap-x-10 gap-y-1">
              {[
                ["CCS", 12],
                ["CTE", 8],
                ["CBA", 15],
                ["PSYCH", 4],
                ["CJE", 9],
              ].map(([name, count]) => (
                <div
                  key={name}
                  className="flex items-center justify-between text-sm tabular-nums"
                >
                  <span className="truncate">{name}</span>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="stat bg-success text-success-content rounded-box shadow-md">
            <div className="stat-figure text-white">
              <FaCheckCircle size={30} />
            </div>
            <div className="stat-value">876</div>
            <div className="stat-title text-lg">Students Voted</div>
            <div className="stat-title text-lg">out of</div>
            <div className="stat-value text-lg">1000 Students</div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white-500 p-3 rounded-box shadow  border border-blue-150">
            <h2 className="text-lg text-black font-semibold mb-3">
              Votes for Today
            </h2>
            <LineChart width={350} height={220} data={lineData}>
              <Line type="monotone" dataKey="votes" stroke="#3b82f6" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>

          <div className="bg-white-500 p-2 rounded-box shadow  border border-blue-150">
            <h2 className="text-lg text-black font-semibold mb-4">
              Votes per Position
            </h2>
            <BarChart width={350} height={220} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="votes" fill="#10b981" />
            </BarChart>
          </div>

          <div className="bg-white-500 p-4 rounded-box shadow  border border-blue-150">
            <h2 className="text-md text-black font-semibold mb-5">
              Votes by Department
            </h2>
            <PieChart width={350} height={220}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                dataKey="value"
                label={({ percent }) => `${name} ${Math.round(percent * 100)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12, lineHeight: "14px" }} />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
