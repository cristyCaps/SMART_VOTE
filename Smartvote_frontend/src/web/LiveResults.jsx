import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LiveResults = () => {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pt-24 bg-white">
        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-10">
          <div className="max-w-screen-xl mx-auto px-6">
            <h1 className="text-3xl font-bold">Live Results</h1>
            <p className="mt-2 opacity-90">How voters can view results in real-time using SmartVote.</p>
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-screen-xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">How voters see the results</h2>
              <p className="mt-3 text-gray-700 leading-7">
                During the voting period, the system can display aggregate counts per position without
                revealing individual voter identities. If enabled by administrators, this page updates
                automatically as ballots are cast, reflecting the latest tallies and turnout.
              </p>
              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-1">
                <li>Position-based cards show current leading candidates.</li>
                <li>Turnout and participation rate appear alongside results.</li>
                <li>All figures are aggregated and anonymized for privacy.</li>
              </ul>
            </div>
            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
              <h3 className="font-semibold text-indigo-700">Transparency</h3>
              <p className="mt-2 text-sm text-indigo-900">
                SmartVote emphasizes fairness and openness. Results can be published live or after the poll closes
                depending on school policy. Regardless, summaries are accessible to everyone when released.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-12">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {["President", "Vice President", "Secretary"].map((position) => (
                <div key={position} className="border rounded-xl p-5 bg-white hover:shadow-md transition">
                  <h4 className="text-lg font-semibold text-gray-900">{position}</h4>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Candidate A</span>
                      <span className="font-semibold text-gray-900">—</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Candidate B</span>
                      <span className="font-semibold text-gray-900">—</span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">Live tallies appear here during elections.</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default LiveResults;


