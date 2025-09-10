import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pt-20 sm:pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16 sm:py-20">
          <div className="w-full max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              About SmartVote
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8">
              Revolutionizing campus elections with secure, transparent, and
              accessible voting technology
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition w-full sm:w-auto"
              >
                Get Started
              </Link>
              <Link
                to="/readmore"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition w-full sm:w-auto"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                Our Mission
              </h2>
              <p className="text-base sm:text-lg text-gray-800 max-w-2xl mx-auto">
                To provide a secure, transparent, and user-friendly digital voting
                platform that empowers students to participate in democratic
                processes with confidence and ease.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl sm:text-2xl">🔒</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold  text-gray-800 mb-2">
                  Security First
                </h3>
                <p className="text-gray-800 text-sm sm:text-base">
                  Advanced encryption and facial recognition ensure every vote is
                  secure and authentic.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-green-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl sm:text-2xl">📊</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold  text-gray-800 mb-2">
                  Transparency
                </h3>
                <p className="text-gray-800 text-sm sm:text-base">
                  Real-time results and audit trails provide complete transparency
                  in the voting process.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-purple-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl sm:text-2xl">🚀</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold  text-gray-800 mb-2">
                  Accessibility
                </h3>
                <p className="text-gray-800 text-sm sm:text-base">
                  User-friendly interface designed for all students, regardless of
                  technical expertise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                  Our Story
                </h2>
                <p className="text-base sm:text-lg text-gray-800 mb-3 sm:mb-4">
                  SmartVote was born from the recognition that traditional voting
                  systems in educational institutions were often inefficient,
                  time-consuming, and lacked transparency.
                </p>
                <p className="text-base sm:text-lg text-gray-800 mb-3 sm:mb-4">
                  Our team of developers and educators came together to create a
                  solution that would modernize the voting experience while
                  maintaining the highest standards of security and integrity.
                </p>
                <p className="text-base sm:text-lg text-gray-800">
                  Today, SmartVote serves thousands of students across multiple
                  institutions, providing a reliable platform for democratic
                  participation in campus elections.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-lg p-6 sm:p-8 text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">
                  Key Achievements
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <li className="flex items-center">
                    <span className="mr-2 sm:mr-3">✅</span>
                    <span>2000+ registered students</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 sm:mr-3">✅</span>
                    <span>98% participation rate</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 sm:mr-3">✅</span>
                    <span>Zero security breaches</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 sm:mr-3">✅</span>
                    <span>Real-time result tracking</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                Our Team
              </h2>
              <p className="text-base sm:text-lg text-gray-800">
                Meet the dedicated professionals behind SmartVote
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-400 to-green-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                  JD
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-900">
                  John Doe
                </h3>
                <p className="text-gray-900 text-sm sm:text-base mb-1">
                  Lead Developer
                </p>
                <p className="text-xs sm:text-sm text-gray-800">
                  Full-stack developer with expertise in secure voting systems
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-green-400 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                  JS
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-900">
                  Jane Smith
                </h3>
                <p className="text-gray-900 text-sm sm:text-base mb-1">
                  UI/UX Designer
                </p>
                <p className="text-xs sm:text-sm text-gray-800">
                  Creating intuitive and accessible user experiences
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                  MJ
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-900">
                  Mike Johnson
                </h3>
                <p className="text-gray-900 text-sm sm:text-base mb-1">
                  Security Specialist
                </p>
                <p className="text-xs sm:text-sm text-gray-800">
                  Ensuring the highest standards of data protection
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                Get In Touch
              </h2>
              <p className="text-base sm:text-lg text-gray-800">
                Have questions? We'd love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                  Contact Information
                </h3>
                <div className="flex flex-wrap gap-6 sm:gap-8 items-center text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <span className="mr-2 sm:mr-3">📧</span>
                    <span className="text-gray-800">support@smartvote.edu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="mr-2 sm:mr-3">📞</span>
                    <span className="text-gray-800">+63 912 345 6789</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="mr-2 sm:mr-3">📍</span>
                    <span className="text-gray-800">University Campus, Metro Manila</span>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-10 sm:py-12 bg-blue-600 text-white">
          <div className="w-full max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-xl mb-4 sm:mb-6">
              Join thousands of students who trust SmartVote for their elections
            </p>
            <Link
              to="/register"
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
            >
              Register Now
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
