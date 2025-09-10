import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PastElections = () => {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pt-24 bg-white">
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-3xl font-bold text-gray-900">Past Elections</h1>
            <p className="mt-3 text-gray-700 leading-7">
              Review previous election summaries, turnout, and published results. Archived data supports
              transparency and continuous improvement of campus elections.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PastElections;


