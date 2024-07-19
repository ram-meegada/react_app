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
