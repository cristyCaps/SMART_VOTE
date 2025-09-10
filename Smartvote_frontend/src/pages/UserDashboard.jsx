import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiSparkles, HiArrowRight, HiCheckCircle } from "react-icons/hi";

const UserDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center lg:m-h-screen h-screen">
      <div className="flex flex-col  items-center gap-8">
        <div className="text-4xl mt-8 font-bold tracking-wider flex text-black ">
          Smartvote Voting System
        </div>
        <div className="w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-8 shadow-2xl">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <HiSparkles className="text-2xl text-yellow-300" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-2xl font-bold">
                      Student Elections 2025: Your Voice, Your Choice, Your
                      Future!
                    </h2>
                    <HiCheckCircle className="text-green-300 text-xl" />
                  </div>

                  <p className="text-blue-100 text-lg mb-4 leading-relaxed">
                    The time has come again for one of the most important events
                    in our campus community—the student elections! This is more
                    than just casting a vote. It’s about taking part in a
                    movement that will shape the direction of our school, our
                    organizations, and our student body.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                      <span>Every ballot counts.</span>
                    </div>
                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                      <span>Every decision matters. </span>
                    </div>
                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                      <span>
                        your vote has the power to influence real change.
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-blue-100">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                      <span>Help create positive change for everyone</span>
                    </div>
                  </div>
                  <p className="text-blue-100 mb-6">
                    👉 Will you be the one to decide who leads us forward? Or
                    will you be the one to stand up and lead the way?
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => navigate("/user-dashboard")}
                      className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      Cast Your Vote
                      <HiArrowRight className="text-lg" />
                    </button>
                    <button
                      onClick={() => navigate("/filecandidacy")}
                      className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
                    >
                      File Candidacy
                      <HiArrowRight className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
