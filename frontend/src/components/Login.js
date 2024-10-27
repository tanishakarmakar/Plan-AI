import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../api/axios';
import { setUser, setToken } from '../redux/slices/userSlice';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/login', { email, password });
      
      // Dispatch user and token to Redux store
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.access_token));
  
      // Redirect to /main after successful login
      navigate('/main');  // Update the redirection path to /main
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error logging in');
      console.error('Error logging in', error);
    }
  };
  

  return (
    <div>
      <div className="login-background">
      <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
       <center> <button className="login-button" type="submit">Login</button></center>
       <center>{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}</center>
       <center><p>Don't have an Account? <u><Link to="/register" className="text-link">Register Now</Link></u></p></center> 
      </form>
    </div>
    </div>
    </div>
  );
}

export default Login;
