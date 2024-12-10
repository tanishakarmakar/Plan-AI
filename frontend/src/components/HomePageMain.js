import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken, logoutUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';  // Ensure Bootstrap CSS is also included here, or imported globally
import historicalImage from './lalqila.jpg';
import beach from './beach.jpg';
import city from './city.jpg';
import wildlife from './wildlife1.jpg';
import mountain from './mountain.jpeg';
import temple from './temple.jpg';

const HomePage = () => {
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHomePage = async () => {
      if (!token) {
        navigate('/');
        return;
      }
      try {
        await axios.get('http://localhost:5000/home', //http://localhost:5000/home for local backend deployment
          {
          headers: { Authorization: `Bearer ${token}` }
        });
        
      } catch (error) {
        console.error('Unauthorized', error);
        dispatch(logoutUser());
        navigate('/');
      }
    };
    fetchHomePage();
  }, [token, navigate, dispatch]);

  // Function to handle navigation when the historical image is clicked
  const handleHistoricalClick = () => {
    navigate('/historical-places');  // Navigate to the historical places page
  };

  const handleBeachClick = () => {
    navigate('/beaches');  
  };

  const handleMetroClick = () => {
    navigate('/metro');  
  };

  const handleWildlifeClick = () => {
    navigate('/safari');  
  };

  const handleMountainsClick = () => {
    navigate('/mountains');  
  };

  const handleReligiousClick = () => {
    navigate('/religious');  
  };

  return (
    <div>
      <br/>
      <h1>CHOOSE A TRAVEL DESTINATION!</h1>
      
      
      {/* Carousel */}
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="5" aria-label="Slide 6"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            {/* Added onClick handler to navigate to /historical-places */}
            <img src={historicalImage} className="d-block w-100" alt="Historical Places"  />
            <div className="carousel-caption d-none d-md-block">
              <h5 onClick={handleHistoricalClick} style={{ cursor: 'pointer' }}>Historical Places</h5>
              <p>Step into India's Timeless Legacy – Discover the Stories Etched in Stone!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={beach} className="d-block w-100" alt="Second Slide" />
            <div className="carousel-caption d-none d-md-block">
              <h5 onClick={handleBeachClick} style={{ cursor: 'pointer' }}>Beaches & Coastal Areas</h5>
              <p>Unwind by the Waves – Explore the Sun-Kissed Shores of India's Coastline!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={city} className="d-block w-100" alt="Third Slide" />
            <div className="carousel-caption d-none d-md-block">
              <h5 onClick={handleMetroClick} style={{ cursor: 'pointer' }}>Urban & Metropolitan Cities</h5>
              <p>Experience the Pulse of Progress – Dive into India's Vibrant Urban Landscapes!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={wildlife} className="d-block w-100" alt="Fourth Slide" />
            <div className="carousel-caption d-none d-md-block">
              <center><h5 onClick={handleWildlifeClick} style={{ cursor: 'pointer' }}>Wildlife & Safari 
                <br/>Destinations</h5></center>
              <p>Embark on a Wild Adventure – Explore India's Untamed Safari Wonders!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={mountain} className="d-block w-100" alt="Fourth Slide" />
            <div className="carousel-caption d-none d-md-block">
              <center><h5 onClick={handleMountainsClick} style={{ cursor: 'pointer' }}>Mountains & Adventure Destinations</h5></center>
              <p>Conquer New Heights – Embark on Thrilling Adventures in India's Majestic Mountains!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={temple} className="d-block w-100" alt="Fourth Slide" />
            <div className="carousel-caption d-none d-md-block">
              <center><h5 onClick={handleReligiousClick} style={{ cursor: 'pointer' }}>Cultural & Religious Sites</h5></center>
              <p>Immerse in Spiritual Splendor – Discover India's Rich Cultural and Sacred Heritage!</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;