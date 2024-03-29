import RequireAuth from "./context/RequireAuth";
import NavBar from "./components/NavBar";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Profile from "./components/Profile";
import PersistLogin from "./components/PersistLogin";
import UploadNote from "./components/UploadNote";
import Login from "./components/Login";
import Results from "./components/Results";
import Preview from "./components/Preview";
import Footer from "./components/Footer";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/results" element={<Results />} />
            <Route path="/preview" element={<Preview />} />
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/UploadNotes" element={<UploadNote />} />
            </Route>
          </Route>
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
