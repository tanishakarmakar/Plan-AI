import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/register', { username, email, password });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('Error registering!');
      }
    }
  };

  return (
    <div>
      <div className="login-background">
      <div className="login-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <center><button className="register-button" type="submit">Register</button></center>
        <center>{error && <p style={{ color: 'red' }}>{error}</p>}</center>
        <center>
          <p>
            Already have an Account? <u><Link to="/login" className="text-link">Login Now!</Link></u>
          </p>
        </center> 
      </form>
      </div>
      </div>
    </div>
  );
}

export default Register;
