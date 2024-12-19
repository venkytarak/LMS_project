import React, { useState } from "react";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useUser } from "../context";


const Login = ({ setAuth, setRole}) => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin=async(e)=>
{

e.preventDefault();
try{
  // const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
  const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
  console.log(response.data)
  const { role, token } = response.data;
  setAuth(true);
  setRole(response.data.role);
  console.log(response.data)
  setUser(response.data);
  if (role === 'admin') {
    navigate('/admin');
  } else if (role === 'student') {
    navigate('/dashboard');
  } else {
    alert('Unknown role');
  }

}
catch(err){
console.log(err)
}
}


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
    //   handleLogin();
    }
  };

  return (
    <div className="login-container" onKeyPress={handleKeyPress}>
      <div className="left-panel">
        <img src="/images/mainlogo.png" alt="Sample" />
      </div>
      <div className="right-panel">
        <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="input-wrapper">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email-input"
            required
          />
          <label htmlFor="email-input" className={email ? "active" : ""}>
            Email
          </label>
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password-input"
            required
          />
          <label htmlFor="password-input" className={password ? "active" : ""}>
            Password
          </label>
        </div>
        <button className="login_btn" >Login</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
