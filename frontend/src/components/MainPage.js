import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken, logoutUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';  // Ensure Bootstrap CSS is also included here, or imported globally


const HomePage = () => {
  const token = useSelector(selectToken);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHomePage = async () => {
      if (!token) {
        navigate('/');
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/home', //http://localhost:5000/home for local backend deployment
          {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('Unauthorized', error);
        dispatch(logoutUser());
        navigate('/');
      }
    };
    fetchHomePage();
  }, [token, navigate, dispatch]);

  const handleGetStarted = () => {
    navigate('/home'); // Navigate to /home when the button is clicked
  };

  return (
    
    <div className="service-content" id="services">
    <h1>{message}</h1>
    <br/>
  <div className="container">
    <div className="row">
      <div className="col-md-4">
        <div className="left-text">
          <b><h4>More About Plan-AI's Arya</h4></b>
          <div className="line-dec"></div>
          <p>
            <b>Arya</b> from Plan-AI is your personal go-to AI travel planner who helps you craft your perfect journey with tailored recommendations based on your preferences and budget. 
            
          </p>
          <ul>
            <li>- Smart travel itineraries curated for you</li>
            <li>- Personalized destination suggestions</li>
            <li>- Optimized for budget-friendly experiences</li>
            <li>- Hassle-free travel planning at your fingertips</li>
          </ul>
          <button className="started" onClick={handleGetStarted}><span>Get Started</span></button>
          
        </div>
      </div>
      <div className="col-md-8">
        <div className="row">
          <div className="col-md-6">
            <div className="service-item">
              <h4>Classic Modern Design</h4>
              <div className="line-dec"></div>
              <p>Our platform offers a sleek and intuitive design, making your travel planning experience a breeze.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="service-item">
              <h4>Unique &amp; Creative Ideas</h4>
              <div className="line-dec"></div>
              <p>We provide innovative and unique travel itineraries based on your preferences and budget.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="service-item">
              <h4>Effective Team Work</h4>
              <div className="line-dec"></div>
              <p>Collaborate with your friends and family to plan the perfect adventure, with real-time suggestions and updates.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="service-item">
              <h4>Fast Support 24/7</h4>
              <div className="line-dec"></div>
              <p>Our team is here to assist you around the clock, ensuring a smooth and enjoyable travel planning process.</p>
            </div>
          </div>
        </div>
      </div>                
    </div>
  </div>
</div>
);
};
export default HomePage;
