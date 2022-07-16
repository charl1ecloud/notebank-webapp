import React from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  let navigate = useNavigate();

  const linkNames = ["Home", "Upload Note", "View Notes","About Us", "Resources"];

  const signupLink = () => {
    navigate("/register");
  };

  const links = linkNames.map((name,value) => {
    return (
      <Link key={value} to={name == "Home" ? "/" : "/" + name.replace(/\s/g, "")}>
        {name}
      </Link>
    );
  });

  return (
    <div className="navbar">
      <div className="logo">
        <div className="logo-text">The NoteBank</div>
      </div>
      <div className="links">{links}</div>
      <div className="user">
        <i className="fa-regular fa-circle-user" onClick={signupLink}></i>
      </div>
    </div>
  );
}
