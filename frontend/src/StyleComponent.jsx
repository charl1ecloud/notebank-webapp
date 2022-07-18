import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Homepageimg } from "./images/homepageimg.svg";

const theme = {
  main_color: "#2b4269",
  main_font: "'Poppins', sans-serif",
  text_color: "#000",
  second_color: "#f4900c",
  background: "#fff",
  logo_size: "30px",
  nav_size: "18px",
};

export const NavbarWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  padding: 0 100px 0 100px;
`;

export const LinksWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 0.7;
  justify-content: right;
`;

export const NavbarLink = styled(Link)`
  margin: 0 20px 0 20px;
  color: ${theme.text_color};
  text-decoration: none;
  font-family: ${theme.main_font};
  font-weight: 600;
  font-size: ${theme.nav_size};
  &:hover {
    color: ${theme.main_color};
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  flex: 0.3;
  justify-content: left;
  font-size: ${theme.logo_size};
  color: ${theme.background};
  font-family: ${theme.main_font};
  font-weight: 900;
`;

export const LogoLeft = styled.div`
  background-color: ${theme.main_color};
  padding: 5px 10px 5px 10px;
  border-radius: 7px 0 0 7px;
  &:hover {
    cursor: pointer;
  }
`;

export const LogoRight = styled.div`
  background-color: ${theme.second_color};
  padding: 5px 10px 5px 10px;
  border-radius: 0 7px 7px 0;
  &:hover {
    cursor: pointer;
  }
`;

export const SigninButton = styled.button`
  background-color: ${theme.second_color};
  color: ${theme.background};
  border: none;
  border-radius: 5px;
  font-size: ${theme.nav_size};
  font-family: ${theme.main_font};
  font-weight: 600;
  margin: 0 0 0 30px;
  width: 120px;
  &:hover {
    background-color: ${theme.main_color};
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 50%;
`;

export const MainTitle = styled.div`
  font-family: ${theme.main_font};
  font-size: 100px;
  font-weight: 900;
  line-height: 100px;
  color: ${theme.background};
`;

export const Subtext = styled.div`
  font-family: ${theme.main_font};
  font-size: 18px;
  font-weight: 100;
  line-height: 25px;
  margin-top: 15px;
  max-width: 80%;
  color: ${theme.background};
`;

export const SearchbarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 80px;
  margin-top: 30px;
  background-color: ${theme.background};
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
`;

export const SearchbarInput = styled.input`
  border: none;
  outline: none;
  background-color: ${theme.background};
  height: 100%;
  width: 100%;
  &::placeholder {
    color: #d9d9d9;
    font-family: ${theme.main_font};
  }
`;

export const SearchButton = styled.button`
  background-color: ${theme.second_color};
  color: ${theme.background};
  border: none;
  border-radius: 10px;
  font-size: ${theme.nav_size};
  font-family: ${theme.main_font};
  font-weight: 600;
  margin: 0 0 0 30px;
  width: 140px;
  height: 50px;
  &:hover {
    background-color: ${theme.main_color};
  }
`;

export const PageLayout = styled.div`
  width: 100%;
  height: 100%;
`;

export const MainSection = styled.div`
  position: absolute;
  bottom: 0;
  top: 100px;
  background: linear-gradient(
    155deg,
    ${theme.main_color} 60%,
    ${theme.background} 60%
  );
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 150px 0 150px;
  justify-content: space-between;
`;

export const BGimg = styled(Homepageimg)`
  transform: scale(1.2);
  margin-right: 100px;
`;
