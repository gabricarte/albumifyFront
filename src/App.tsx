import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import SearchPage from './pages/SearchPage/SearchPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MyAlbums from './pages/MyAlbums/MyAlbums';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Profile from './pages/Profile/Profile';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import Header from './components/Header/Header';
import Register from './pages/Register/Register';

const AppContent = () => {
  const location = useLocation();
  const shouldShowHeader = !['/', '/register'].includes(location.pathname);

  return (
    <div className="App">
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/myalbums" element={<MyAlbums />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/searchresults" element={<SearchResultsPage />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
