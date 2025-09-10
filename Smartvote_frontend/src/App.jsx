import { Route, Routes, useLocation } from "react-router-dom";
import Register from "./Register";
import Homepage from "./pages/Homepage";
import Sidebar from "./Sidebar";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CandidateForm from "./components/CandidatesForm";
import Candidates from "./pages/Candidates";
import PendingApplication from "./pages/PendingApplication";
import LandingPage from "./pages/LandingPage";
import About from "./web/About";
import Features from "./web/Features";
import UpcomingElections from "./web/UpcomingElections";
import PastElections from "./web/PastElections";
import ElectionsCandidates from "./web/ElectionsCandidates";
import LiveResults from "./web/LiveResults";
import ParticipationRate from "./web/ParticipationRate";
import ReadMore from "./web/ReadMore";
import ElectionInfo from "./web/ElectionInfo";
 

const App = () => {
  const location = useLocation();

  // Only show Sidebar on app/dashboard routes, hide on public web pages
  const pathname = location.pathname;
  const isPublicWebRoute =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/features" ||
    pathname.startsWith("/elections/") ||
    pathname.startsWith("/stats/");

  return (
    <div className="flex flex-rown m-h-screen lg:h-screen">
      {/* Sidebar hidden on public web routes */}
      {!isPublicWebRoute && <Sidebar />}

      <div className={`flex-1 ${isPublicWebRoute ? "w-full" : ""}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/filecandidacy" element={<CandidateForm />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/pending-application" element={<PendingApplication />} />
          {/* Web informational pages */}
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/elections/upcoming" element={<UpcomingElections />} />
          <Route path="/elections/past" element={<PastElections />} />
          <Route path="/elections/candidates" element={<ElectionsCandidates />} />
          <Route path="/elections/info" element={<ElectionInfo />} />
          <Route path="/stats/live-results" element={<LiveResults />} />
          <Route path="/stats/participation" element={<ParticipationRate />} />
          <Route path="/readmore" element={<ReadMore />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default App;
