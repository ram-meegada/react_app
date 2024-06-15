import React from "react";
import Hello from "./components/Hello";
import SignUp from "./components/signUp";

function App() {
    const [email, username, first_name, password] = ["", "", "", ""];
    return (
      <SignUp propemail = {email} propusername={username} propfirst_name={first_name} proppassword={password}/>
    )
}

export default App;