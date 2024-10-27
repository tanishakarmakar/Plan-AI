import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import HomePageMain from './components/HomePageMain';
import MainPage from './components/MainPage';  // Import the new MainPage
import HistoricalPlaces from './components/HistoricalPlaces';
import Beaches from './components/beaches';
import MetroPolitan from './components/metro'
import Wildlife from './components/safari'
import Mountains from './components/mountains'
import Religious from './components/religious'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePageMain />} />
          <Route path="/main" element={<MainPage />} />  {/* Add the MainPage route */}
          <Route path="/historical-places" element={<HistoricalPlaces />} />
          <Route path="/beaches" element={<Beaches />} />
          <Route path="/metro" element={<MetroPolitan />}/>
          <Route path="/safari" element={<Wildlife />}/>
          <Route path="/mountains" element={<Mountains />}/>
          <Route path="/religious" element={< Religious/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
