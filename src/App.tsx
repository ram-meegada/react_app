import React, {useState} from "react";
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from "react-router-dom";
import SignUp from "./components/signUp";
import LoginIn from "./components/loginIn";
import HomePage from "./components/homePage";
import ViewBook from "./components/viewBook";
import ProfileComponent from "./components/profilePage";
import ChangePassword from "./components/changePassword";
import VerifyOtp from "./components/verifyOtp";
import ViewProfile from "./features/viewProfile"
import ManageColours from "./features/manageColours";
import AddColour from "./features/addColour";
import EditColour from "./features/editColour";
import DownloadFiles from "./features/downloadFiles";
import ChatModule from "./features/chat";
import ViewColour from "./features/viewColour";

function App() {
    const [email, password] = ["", ""];
    return (
      <div>
        <Routes>
          <Route path="/" element={<SignUp propemail={email} proppassword={password}/>}/>
          <Route path="/login" element={<LoginIn />}/>
          <Route path="/home" element={<HomePage />}/>
          <Route path="/view-book/:book_id" element={<ViewBook />}/>
          <Route path="/viewprofile" element={<ProfileComponent />}/>
          <Route path="/changepassword" element={<ChangePassword />}/>
          <Route path="/verify-otp" element={<VerifyOtp />}/>
          <Route path="/profile" element={<ViewProfile />}/>
          <Route path="/manage-colours" element={<ManageColours />}/>
          <Route path="/add-color" element={<AddColour />}/>
          <Route path="/view-color" element={<ViewColour />}/>
          <Route path="/edit-color" element={<EditColour />}/>
          <Route path="/download-files" element={<DownloadFiles />}/>
          <Route path="/chat" element={<ChatModule />}/>
        </Routes>
      </div>
    )
}

function AppWrapper(){
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper;
