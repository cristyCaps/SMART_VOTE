import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UpcomingElections = () => {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pt-24 bg-white">
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-3xl font-bold text-gray-900">Upcoming Elections</h1>
            <p className="mt-3 text-gray-700 leading-7">
              Stay informed about scheduled elections, candidate filing windows, and voting dates.
              Details will appear here when an election is published by administrators.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default UpcomingElections;


