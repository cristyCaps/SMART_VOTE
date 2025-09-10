import React from "react";

const ReadMore = () => {
  return (
    <div className="w-full min-h-screen bg-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-none lg:max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">About SmartVote</h1>
      
      <p className="text-gray-700 mb-4">
        <strong>SmartVote</strong> is a web-based voting system designed to modernize and secure school elections across all levels — from SPG in Elementary, SSG in High School and College, to departmental and organizational elections. It enables students to participate in elections anytime, anywhere through a secure, role-based online platform.
      </p>

      <p className="text-gray-700 mb-4">
        With SmartVote, the entire election process — from candidate registration to result counting — is streamlined, efficient, and tamper-resistant. Voters authenticate using a facial recognition system, ensuring that only verified students can cast their votes.
      </p>

      <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-4">Key Features</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li><strong>User Registration Module:</strong> Allows role-based account creation with privacy notices.</li>
        <li><strong>Election Management Module:</strong> Admins can schedule and manage elections with real-time tracking.</li>
        <li><strong>Voting Security Module:</strong> Integrates real-time facial tracking for secure authentication.</li>
        <li><strong>Voter Dashboard:</strong> Enables students to view candidates, vote securely, and receive a receipt via email.</li>
        <li><strong>Real-Time Vote Counting:</strong> Public dashboard showing live vote tally and visual stats.</li>
        <li><strong>Voting Statistics:</strong> Analyzes turnout by department, year level, and demographic group.</li>
        <li><strong>Exportable Reports:</strong> Admins can export final results in PDF format for transparency and recordkeeping.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-4">Why SmartVote?</h2>
      <p className="text-gray-700 mb-4">
        SmartVote ensures that every election is fair, transparent, and accessible — helping student leaders rise through a democratic process that is both innovative and reliable. With real-time monitoring and secure verification, schools can now conduct elections with confidence and convenience.
      </p>

      <p className="text-gray-700 mb-4">
        It’s more than just voting — it’s about empowering the next generation of leaders in a modern, secure, and user-friendly environment.
      </p>
      </div>
    </div>
  );
};

export default ReadMore;


