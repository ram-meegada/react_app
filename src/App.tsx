import React, {useState} from "react";
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from "react-router-dom";
import SignUp from "./components/signUp";
import LoginIn from "./components/loginIn";
import HomePage from "./components/homePage";
import ViewBook from "./components/viewBook";

function App() {
    const [email, username, first_name, password] = ["", "", "", ""];
    const location = useLocation();
    return (
      <div>
        <Routes>
          <Route path="/" element={<SignUp propemail={email} propusername={username} propfirst_name={first_name} proppassword={password}/>}/>
          <Route path="/login" element={<LoginIn propemail={""} proppassword={""} />}/>
          <Route path="/home" element={<HomePage />}/>
          <Route path="/view-book/:book_id" element={<ViewBook />}/>
        </Routes>
        {location.pathname === "/" &&
          <Link to="/login">Already have an account? Login Here</Link>
          }
        {location.pathname === "/login" &&
          <Link to="/">Don't have an account? Create One.</Link>
        }  
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
