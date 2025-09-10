import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  UserCheck,
  ChartBar,
  ShieldCheck,
  Lock,
  Settings,
  FileText,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <UserCheck size={48} className="text-blue-600" />,
      title: "Face Recognition",
      desc: "SmartVote integrates secure face recognition technology to authenticate voters before they can cast their ballots. This prevents impersonation and ensures that each student can only vote once, maintaining the integrity of the election process.",
      bg: "bg-gradient-to-r from-blue-50 to-white",
    },
    {
      icon: <ChartBar size={48} className="text-green-600" />,
      title: "Real-Time Counting",
      desc: "Our system provides live vote tallying through an interactive dashboard. As soon as votes are cast, results are updated instantly, giving administrators and students transparent access to accurate, real-time election outcomes.",
      bg: "bg-gradient-to-r from-green-50 to-white",
    },
    {
      icon: <ShieldCheck size={48} className="text-purple-600" />,
      title: "User-Friendly",
      desc: "Designed with simplicity in mind, SmartVote features an intuitive interface that makes the entire voting process easy for students of all year levels. From registration to final vote confirmation, every step is straightforward and accessible.",
      bg: "bg-gradient-to-r from-purple-50 to-white",
    },
    {
      icon: <Lock size={48} className="text-red-600" />,
      title: "Role-Based Access",
      desc: "We implement strict role-based access controls. Admins, candidates, and voters each have separate logins and permissions, ensuring that sensitive election settings are only managed by authorized personnel.",
      bg: "bg-gradient-to-r from-red-50 to-white",
    },
    {
      icon: <Settings size={48} className="text-orange-600" />,
      title: "Election Management",
      desc: "Administrators can easily create and manage elections, including setting schedules, registering candidates, and monitoring participation. This feature streamlines the preparation and execution of campus-wide elections.",
      bg: "bg-gradient-to-r from-orange-50 to-white",
    },
    {
      icon: <FileText size={48} className="text-teal-600" />,
      title: "Exportable Reports",
      desc: "At the end of each election, final results can be exported in professional, tamper-proof PDF reports. These reports ensure transparency and provide a permanent record that can be shared with stakeholders.",
      bg: "bg-gradient-to-r from-teal-50 to-white",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pt-24 py-16 px-6 sm:px-10 lg:px-20 bg-[aquamarine]">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
          Core Features of SmartVote
        </h1>
        <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
          Explore each powerful feature that makes SmartVote a secure, transparent,
          and efficient platform for school elections. Scroll down to learn more
          about how each feature works.
        </p>
      </div>

      {/* Scrollable Features Section */}
      <div className="flex flex-col gap-20">
        {features.map((f, index) => (
          <div
            key={f.title}
            className={`${f.bg} rounded-2xl shadow-sm p-10 flex flex-col md:flex-row items-center gap-8 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Icon Section */}
            <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-md">
              {f.icon}
            </div>

            {/* Text Section */}
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-black mb-3">
                {f.title}
              </h2>
              <p className="text-gray-700 text-base leading-7">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Features;
