import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ParticipationRate = () => {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pt-24 bg-white">
        <section className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-10">
          <div className="max-w-screen-xl mx-auto px-6">
            <h1 className="text-3xl font-bold">Participation Rate</h1>
            <p className="mt-2 opacity-90">Turnout and student sentiment about using SmartVote.</p>
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-screen-xl mx-auto px-6 grid md:grid-cols-3 gap-6">
            <div className="bg-white border rounded-2xl p-6 text-center hover:shadow-md transition">
              <h3 className="text-sm font-medium text-gray-600">Overall Turnout</h3>
              <p className="mt-2 text-4xl font-bold text-emerald-600">98%</p>
              <p className="mt-1 text-xs text-gray-500">Students who participated this election</p>
            </div>
            <div className="bg-white border rounded-2xl p-6 text-center hover:shadow-md transition">
              <h3 className="text-sm font-medium text-gray-600">SmartVote Approval</h3>
              <p className="mt-2 text-4xl font-bold text-emerald-600">92%</p>
              <p className="mt-1 text-xs text-gray-500">Students who agree SmartVote improves elections</p>
            </div>
            <div className="bg-white border rounded-2xl p-6 text-center hover:shadow-md transition">
              <h3 className="text-sm font-medium text-gray-600">First-time Voters</h3>
              <p className="mt-2 text-4xl font-bold text-emerald-600">37%</p>
              <p className="mt-1 text-xs text-gray-500">Participants voting for the first time</p>
            </div>
          </div>
        </section>

        <section className="pb-12">
          <div className="max-w-screen-xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-emerald-800">What the numbers mean</h2>
              <p className="mt-3 text-sm leading-6 text-emerald-900">
                Participation rate reflects the percentage of eligible students who cast their ballots.
                Approval rate indicates how many students agree that SmartVote makes elections easier,
                more secure, and more transparent.
              </p>
              <ul className="mt-3 list-disc list-inside text-emerald-900 text-sm space-y-1">
                <li>Higher turnout suggests easy access and trust in the process.</li>
                <li>Approval is measured via post-election feedback surveys.</li>
                <li>Rates can be compared across semesters for improvement.</li>
              </ul>
            </div>
            <div className="bg-white border rounded-2xl p-6">
              <h3 className="text-base font-semibold text-gray-900">Live engagement (illustrative)</h3>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Voters who opted in", value: "98%" },
                  { label: "Students satisfied with speed", value: "95%" },
                  { label: "Would recommend SmartVote", value: "90%" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">{m.label}</span>
                    <span className="font-semibold text-gray-900">{m.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Notes: Values are examples; actual percentages appear when surveys are enabled.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ParticipationRate;


