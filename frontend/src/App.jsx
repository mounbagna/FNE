import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Dashboard from "./Components/Dashboard";
import { useState, useEffect } from 'react';
import EmailVerify from "./EmailVerify";
import Index from "./Components/Index";
import Applyjob from "./Components/Applyjob";
import CreateAccountMsg from "./Components/CreateAccountMsg";

function App() {

  const [loggedInUser, setLoggedInUser] = useState(null);

  // Load user from localStorage when page loads
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index user={loggedInUser} />}></Route>
        <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser}/>}></Route>
        <Route path="/register" element={<Registration/>}></Route>
        <Route path="/apply" element={loggedInUser ? <Applyjob /> : <Login setLoggedInUser={setLoggedInUser} />}/>
        <Route path="/createAccountMsg" element={<CreateAccountMsg />}></Route>
        <Route path="/dashboard" element={<Dashboard user={loggedInUser}/>}></Route>
        <Route path="/users/:userId/verify/:token" element={<EmailVerify />} />
      </Routes>
    </Router>
  );
}

export default App;
