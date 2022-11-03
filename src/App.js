import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ProfileP from "./components/profileP";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profileP/:_id" element={<ProfileP />} />
    </Routes>
  );
}

export default App;
