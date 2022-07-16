import Layout from "./context/Layout";
import RequireAuth from "./context/RequireAuth";
import NavBar from "./components/Navbar/NavBar";
import Home from "./Home";
import "./app.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Upload from "./components/UploadNote/Upload";
import Register from "./components/Signup/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import PersistLogin from "./components/Login/PersistLogin";
import ViewNotes from "./components/ViewNotes/ViewNotes";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Home />} />

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/UploadNote" element={<Upload />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="/ViewNotes" element={<ViewNotes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Login />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
