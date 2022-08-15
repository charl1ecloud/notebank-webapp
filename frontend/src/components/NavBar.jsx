import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavbarWrapper,
  LinksWrapper,
  NavbarLink,
  Logo,
  LogoLeft,
  LogoRight,
  SigninButton,
} from "../StyleComponent";
import useAuth from "../context/AuthProvider";

export default function NavBar() {
  let navigate = useNavigate();
  const { auth } = useAuth();

  const linkNames = ["About Us", "View Notes", "Resources", "Contact"];

  const links = linkNames.map((name, value) => {
    return (
      <NavbarLink
        key={value}
        to={name == "Home" ? "/" : "/" + name.replace(/\s/g, "")}
      >
        {name}
      </NavbarLink>
    );
  });

  return (
    <NavbarWrapper>
      <Logo>
        <LogoLeft onClick={() => navigate("/")}>Note</LogoLeft>
        <LogoRight onClick={() => navigate("/")}>Bank</LogoRight>
      </Logo>
      <LinksWrapper>
        {links}
        {auth.accessToken ? (
          <i
            className="fa-regular fa-circle-user"
            onClick={() => navigate("/profile")}
          ></i>
        ) : window.location.pathname == "/signin" ? (
          <SigninButton disabled onClick={() => navigate("signin")}>
            Sign In
          </SigninButton>
        ) : (
          <SigninButton onClick={() => navigate("signin")}>
            Sign In
          </SigninButton>
        )}
      </LinksWrapper>
    </NavbarWrapper>
  );
}
