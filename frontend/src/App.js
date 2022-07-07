import NavBar from "./components/Navbar/NavBar";
import Home from "./Home";
import "./app.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Upload from "./components/UploadNote/Upload";
import Register from "./components/Signup/Register";
import Login from "./components/Login/Login";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Home />} />
        <Route path="/UploadNote" element={<Upload />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
