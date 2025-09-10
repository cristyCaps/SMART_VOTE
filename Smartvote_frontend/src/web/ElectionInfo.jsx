import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ElectionInfo = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pt-24 bg-white">
        {/* Header with quick anchors */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="absolute -top-10 -right-10 h-44 w-44 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-44 w-44 bg-black/10 rounded-full blur-2xl" />
          <div className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="text-3xl md:text-4xl font-bold">How SmartVote Elections Work</h1>
            <p className="mt-3 text-base md:text-lg opacity-90">
              A transparent overview of candidacy, voting, and result handling in SmartVote.
            </p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <a href="#candidacy" className="bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition">Candidacy</a>
              <a href="#before" className="bg-white/90 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white transition">Before</a>
              <a href="#during" className="bg-white/90 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white transition">During</a>
              <a href="#after" className="bg-white/90 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white transition">After</a>
              <a href="#faq" className="bg-white/90 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white transition">FAQ</a>
            </div>
          </div>
        </section>

        {/* Candidacy Opening */}
        <section id="candidacy" className="py-12 scroll-mt-28">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Candidacy Opening</h2>
              <p className="mt-3 text-gray-700 leading-7">
                Administrators announce the candidacy window and requirements in-app. Interested students
                submit their profiles via the Candidacy form, providing platform statements and credentials.
                Submissions are reviewed by admins for completeness and eligibility. Verified candidates are
                then published to the official candidates list before the campaign period begins.
              </p>
              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-1">
                <li>Submit candidate details and platform in the application form.</li>
                <li>Admin verification ensures identity and eligibility.</li>
                <li>Published candidate profiles appear on the elections page.</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition">
              <h3 className="font-semibold text-blue-700">Transparency Goals</h3>
              <ul className="mt-3 text-sm text-blue-900 space-y-2">
                <li>Clear timelines for candidacy filing and publication.</li>
                <li>Uniform criteria for eligibility and verification.</li>
                <li>Publicly accessible candidate profiles prior to voting.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Before Voting */}
        <section id="before" className="py-12 bg-gray-50 scroll-mt-28">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Before Voting</h2>
              <p className="mt-3 text-gray-700 leading-7">
                Students register accounts and are verified by admins. Depending on the configuration,
                SmartVote may use facial recognition or ID checks to prevent impersonation. Election schedules
                and rules are posted ahead of time so voters know when and how to participate.
              </p>
              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-1">
                <li>Student registration and admin verification.</li>
                <li>Election schedule published with positions and rules.</li>
                <li>Candidate list finalized and visible to all voters.</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition">
              <h3 className="font-semibold text-green-700">Integrity Measures</h3>
              <ul className="mt-3 text-sm text-green-900 space-y-2">
                <li>Verified identities via admin checks and optional face recognition.</li>
                <li>Role-based access so only eligible voters can cast ballots.</li>
                <li>Locked configuration after publication to avoid mid-election changes.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* During Voting */}
        <section id="during" className="py-12 scroll-mt-28">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">During Voting</h2>
              <p className="mt-3 text-gray-700 leading-7">
                When the election opens, verified users log in and cast their vote securely. SmartVote enforces
                one-person-one-vote and records every ballot atomically. As votes are cast, the system updates
                the tally. For transparency, participation stats and live results (if enabled) can be viewed on
                dashboards without exposing individual voter identities.
              </p>
              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-1">
                <li>Secure authentication and voter eligibility checks.</li>
                <li>One-time ballot submission with confirmation.</li>
                <li>Optional live tally and participation rate display.</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 hover:shadow-lg transition">
              <h3 className="font-semibold text-purple-700">Voter Experience</h3>
              <ul className="mt-3 text-sm text-purple-900 space-y-2">
                <li>Accessible UI with clear instructions per position.</li>
                <li>Validation to prevent incomplete or duplicate ballots.</li>
                <li>Immediate feedback upon successful submission.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* After Voting */}
        <section id="after" className="py-12 bg-gray-50 scroll-mt-28">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">After Voting</h2>
              <p className="mt-3 text-gray-700 leading-7">
                Once the voting period closes, SmartVote finalizes the tally and prepares auditable summaries.
                Results can be published instantly to the results page, and administrators may export official
                reports (e.g., PDF) for record-keeping. Historical results remain available for transparency
                and future analysis.
              </p>
              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-1">
                <li>Final tally computed and locked.</li>
                <li>Publication of winners and vote counts.</li>
                <li>Exportable reports for documentation and auditing.</li>
              </ul>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100 hover:shadow-lg transition">
              <h3 className="font-semibold text-yellow-700">Transparency & Accountability</h3>
              <ul className="mt-3 text-sm text-yellow-900 space-y-2">
                <li>Public access to summarized results and turnout.</li>
                <li>Archived elections for longitudinal transparency.</li>
                <li>Clear separation of voter identity and ballot secrecy.</li>
              </ul>
            </div>
          </div>
        </section>

        

        {/* FAQ / Clarifications */}
        <section id="faq" className="py-12 scroll-mt-28">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-semibold text-gray-900">Common Questions</h2>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "How is voter privacy protected?",
                  a: "SmartVote separates identity verification from ballot choices. Only aggregated counts are stored for results.",
                },
                {
                  q: "Can results be audited?",
                  a: "Yes. Final reports can be exported and immutable logs help reconcile counts for independent review.",
                },
                {
                  q: "How do I become a candidate?",
                  a: "File during the candidacy window via the Candidacy form. Admins verify eligibility before publication.",
                },
                {
                  q: "What happens if I lose connection while voting?",
                  a: "Ballot submission is atomic. If not confirmed, you can re-attempt; duplicates are prevented by the system.",
                },
              ].map((item, index) => (
                <div key={item.q} className="bg-white border rounded-lg">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-semibold text-gray-800">{item.q}</span>
                    <span className="text-gray-500 text-xl">{openFaqIndex === index ? "−" : "+"}</span>
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-5 pb-5 -mt-2 text-gray-700 text-sm leading-6">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-lg">
              <div>
                <h3 className="text-2xl font-bold">Ready to participate?</h3>
                <p className="opacity-90">Register now or review candidates before the election starts.</p>
              </div>
              <div className="flex gap-3">
                <a href="/register" className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-lg hover:bg-gray-100 transition">Register</a>
                <a href="/elections/candidates" className="bg-white/10 border border-white/30 text-white font-semibold px-5 py-2 rounded-lg hover:bg-white hover:text-blue-700 transition">View Candidates</a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ElectionInfo;


