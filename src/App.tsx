import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SearchPage from './pages/SearchPage/SearchPage';
import RegisterLoginPage from './pages/RegisterLoginPage/RegisterLoginPage';


function App() {
  return (
    <div className="App">
     <Router>
      <Routes>

      <Route path="/" element={
          <>
          <RegisterLoginPage/>
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
      </Routes>
     </Router>
    </div>
  );
}

export default App;
