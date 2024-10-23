import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Redirect to Login page
  };

  const handleRegister = () => {
    navigate('/register'); // Redirect to Register page
  };

  return (
    <div className="home-background"> {/* Change the class here */}
      <div className="home-container"> {/* Keep your content here */}
        <h1>Plan-AI</h1>
        <em>
          Your Smart Travel Companion for Tailored, Budget-Friendly Adventures!
        </em>
    
        <div className="button-container">
          <button className="login-button" onClick={handleLogin}><b>LOGIN</b></button>
          <br />
          <button className="register-button" onClick={handleRegister}><b>REGISTER</b></button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
