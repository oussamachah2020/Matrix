import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile";
import SearchedProfile from "./pages/SearchedProfile";
import Intro from "./pages/Home/Intro";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/results" element={<SearchedProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
