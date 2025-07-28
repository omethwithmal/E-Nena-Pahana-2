import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 



import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/footer/Footer";
import Home from "./components/Home/Home";
import LogIn from "./components/LogIn/SignUp/LogIn";
import SignUp from "./components/LogIn/SignUp/SignUp";
import Registration from "./components/LogIn/SignUp/Registration";
import Profile from "./components/Profile/Profile";
import Passpapers from "./components/Passpapers/passpapers";
import EBook from "./components/EBook/EBook";
import Quizzes from "./components/quizzes/quizzes";
import MathematicsQuize from "./components/quizzes/MathematicsQuize";
import ScienceQuize from "./components/quizzes/ScienceQuize";
import Videos from "./components/Vdeos/videos";
import Chat from "./components/chatBot/chat";
import AdminDashNaveBar from "./components/AdminDashboard/AdminDashNaveBar";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Analytics from "./components/AdminDashboard/Analytics/Analytics";
import ViewFeedback from "./components/AdminDashboard/Feedback/ViewFeedback";
import AddEbook from "./components/AdminDashboard/AddEbook/AddEbook";
import AddQuizzes from "./components/AdminDashboard/AddQuizzes/AddQuizzes";
import UserManagement from "./components/AdminDashboard/UserManagement/UserMnagement";
import AddVideos from "./components/AdminDashboard/AddVideos/AddVideos";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/NavBar" element={<NavBar />} />
      <Route path="/Footer" element={<Footer />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/LogIn" element={<LogIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Registration" element={<Registration />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Passpapers" element={<Passpapers />} />
      <Route path="/EBook" element={<EBook />} />
      <Route path="/Quizzes" element={<Quizzes />} />
      <Route path="/MathematicsQuize" element={<MathematicsQuize />} />
      <Route path="/ScienceQuize" element={<ScienceQuize />} />
      <Route path="/Videos" element={<Videos />} />
      <Route path="/Chat" element={<Chat />} />
      <Route path="/AdminDashNaveBar" element={<AdminDashNaveBar />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
      <Route path="/Analytics" element={<Analytics />} />
      <Route path="/ViewFeedback" element={<ViewFeedback />} />
      <Route path="/AddEbook" element={<AddEbook />} />
      <Route path="/AddQuizzes" element={<AddQuizzes />} />
      <Route path="/UserManagement" element={<UserManagement />} />
      <Route path="/AddVideos" element={<AddVideos />} />
      </Routes>
    </Router>
  );
}

export default App;
