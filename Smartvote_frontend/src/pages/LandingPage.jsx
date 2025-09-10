import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Images
import infoImage from "../assets/cover3.jpg";
import heroImage from "../assets/cover1.jpg";

// Icons
import {
  ShieldCheck,
  ChartBar,
  UserCheck,
  Lock,
  Settings,
  FileText,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 w-full">
        {/* Hero Section */}
        <section
          className="relative w-full h-[90vh] text-white bg-cover bg-no-repeat overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundPosition: "center 10%",
            backgroundSize: "cover",
          }}
        >
          <div
            className="absolute inset-0 bg-black opacity-60 z-0"
            style={{ filter: "contrast(1.2) brightness(0.8)" }}
          />
          <div className="relative z-10 w-full max-w-2xl px-4 md:px-8 text-left lg:ml-0">
            <h1 className="text-4xl font-bold mb-4">
              SmartVote, your online voting system
            </h1>
            <p className="text-base mb-6">Vote smart. Vote safe. Vote fair.</p>
            <Link
              to="/readmore"
              className="inline-block bg-white text-blue-900 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
            >
              Read more
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full flex justify-center items-center py-10 bg-blue-600">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full px-4 md:px-8">
            <div className="bg-white rounded-xl shadow-lg px-6 py-6 flex flex-col items-center max-w-xs mx-auto">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">2000+</h2>
              <p className="text-gray-700 font-medium">Registered Students</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg px-6 py-6 flex flex-col items-center max-w-xs mx-auto">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">98%</h2>
              <p className="text-gray-700 font-medium">Participation Rate</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg px-6 py-6 flex flex-col items-center max-w-xs mx-auto">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">0</h2>
              <p className="text-gray-700 font-medium">Security Breaches</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          className="py-12 px-4 md:px-8 text-center"
          style={{ backgroundColor: "#0C359E" }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              See How SmartVote Works:
            </h2>
            <p className="text-gray-100 mb-10 max-w-xl mx-auto">
              Follow these simple steps to experience secure and transparent
              campus elections with SmartVote.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto mt-8">
              {[
                {
                  step: "1️⃣",
                  title: "Register",
                  desc: "Sign up using your School ID and student details.",
                },
                {
                  step: "2️⃣",
                  title: "Get Verified",
                  desc: "Admins verify your identity using face or ID.",
                },
                {
                  step: "3️⃣",
                  title: "Cast Your Vote",
                  desc: "Login during the election period and vote securely.",
                },
                {
                  step: "4️⃣",
                  title: "See Results",
                  desc: "Watch votes update live and receive confirmation.",
                },
              ].map(({ step, title, desc }, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md p-4 md:p-6 rounded-lg"
                >
                  <span className="text-2xl text-blue-600">{step}</span>
                  <h3 className="text-lg font-semibold mt-2 text-blue-600">
                    {title}
                  </h3>
                  <p className="text-gray-700 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Block */}
        <section
          className="relative text-white py-12 px-4 md:px-8 overflow-hidden bg-cover bg-center bg-no-repeat h-72 md:h-96"
          style={{ backgroundImage: `url(${infoImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50 z-0" />
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <p className="text-lg leading-relaxed text-shadow-lg mb-8">
              SmartVote is designed to make campus elections easy, secure, and
              transparent. With advanced features like real-time monitoring and
              face recognition, we ensure every vote counts.
            </p>
          </div>
        </section>

        {/* Core Features Section */}
        <section
          id="features"
          className="bg-gradient-to-b from-sky-50 to-white py-16 px-6 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-12">
            Our Core Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <UserCheck />,
                title: "Face Recognition",
                desc: "Authenticate securely before voting.",
              },
              {
                icon: <ChartBar />,
                title: "Real-Time Counting",
                desc: "Live election results dashboard.",
              },
              {
                icon: <ShieldCheck />,
                title: "User-Friendly",
                desc: "Simple and accessible for all students.",
              },
              {
                icon: <Lock />,
                title: "Role-Based Access",
                desc: "Separate admin and voter access.",
              },
              {
                icon: <Settings />,
                title: "Election Management",
                desc: "Manage schedules and candidates.",
              },
              {
                icon: <FileText />,
                title: "Exportable Reports",
                desc: "Download final results in PDF.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-2 transition"
              >
                <div className="flex justify-center text-blue-700 mb-4 text-4xl">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h4>
                <p className="text-gray-800">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
