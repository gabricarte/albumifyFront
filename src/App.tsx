import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SearchPage from './pages/SearchPage/SearchPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MyAlbums from './pages/MyAlbums/MyAlbums';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Profile from './pages/Profile/Profile';


function App() {
  return (
    <div className="App">
     <Router>
      <Routes>

      <Route path="/" element={
          <>
          <LoginPage/>
          </>
        }>
        </Route>
        <Route path="/home" element={
          <>
          <Home/>
          </>
        }>
        </Route>

        <Route path="/search" element={
          <>
          <SearchPage/>
          </>
        }>
        </Route>

        <Route path="/myalbums" element={
          <>
          <MyAlbums/>
          </>
        }>
        </Route>

        <Route path="/register" element={
          <>
          <RegisterPage/>
          </>
        }>
        </Route>

        <Route path="/profile" element={
          <>
          <Profile/>
          </>
        }>
        </Route>

      </Routes>
     </Router>
    </div>
  );
}

export default App;
