import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Homepageimg } from "./images/homepageimg.svg";
import { ReactComponent as Signinimg } from "./images/signinbg.svg";

const theme = {
  main_color: "#1B3061",
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
  background-color: #f7f7f7;
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
  height: 40px;
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

//Sign in page below

export const SigninMain = styled.div`
  position: absolute;
  bottom: 0;
  top: 100px;
  background: linear-gradient(
    90deg,
    ${theme.main_color} 50%,
    ${theme.background} 50%
  );
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 100px 0 200px;
  justify-content: space-between;
`;

export const SigninTitle = styled.div`
  font-family: ${theme.main_font};
  font-size: ${props=>props.size?props.size:"70px"};
  font-weight: 900;
  line-height: 80px;
  color: ${props=>props.color?props.color:theme.background};
`;

export const HalfWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: ${(props) => (props.width ? props.width : "500px")};
  height: ${(props) => (props.height ? props.width : "600px")};
`;

export const SigninForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  padding-bottom: 1rem;
  width: 100%;
  margin-top: 35px;
`;

export const SignupWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const SignupMessage = styled.div`
  font-family: ${theme.main_font};
  font-size: 20px;
  font-weight: 100;
  line-height: 25px;
  margin: ${props=>props.margin?props.margin:"15px 0 0 0"};
  color: ${props=>props.color?props.color:theme.background};
`;

export const SignupLink = styled.div`
  color: ${theme.background};
  font-family: ${theme.main_font};
  font-size: 20px;
  font-weight: 100;
  line-height: 25px;
  margin-top: 15px;
  text-decoration: underline;
  &:hover {
    color: ${theme.second_color};
    cursor: pointer;
  }
`;

export const FieldLabel = styled.label`
  color: ${theme.background};
  font-family: ${theme.main_font};
  font-size: ${(props) => (props.font_size ? props.font_size : "20px")};
  font-weight: 100;
  line-height: 25px;
  margin: ${(props) => props.margin};
`;

export const FieldInput = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 5px;
  outline: none;
  margin-bottom: 20px;
  text-indent: 15px;
  font-family: ${theme.main_font};
  font-weight: 600;
`;

export const FullWidthButton = styled.button`
  background-color: ${(props) =>
    props.bg_color ? props.bg_color : theme.second_color};
  color: ${theme.background};
  border: none;
  border-radius: 5px;
  font-size: ${theme.nav_size};
  font-family: ${theme.main_font};
  font-weight: 600;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: 60px;
  margin: ${(props) => props.margin};
  &:hover {
    transform: scale(1.03);
  }
`;

export const PersistCheck = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  height: 20px;
  width: 20px;
  margin: 0 5px 2px 2px;
`;

export const SigninImg = styled(Signinimg)`
  transform: scale(0.8);
  margin: 0px auto;
`;

export const PasswordHolder = styled.div`
  position: relative;
`;

export const Eye = styled.i`
  position: absolute;
  right: ${props=>props.right?props.right:"5%"};
  top: ${props=>props.top?props.top:"25%"};
  color: ${theme.main_color};
  transform: scale(1.5);
  &:hover {
    cursor: pointer;
  }
`;

// Sign up pop up

export const PopupForm = styled.div`
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border: 3px solid #f1f1f1;
  border-radius: 5px;
  z-index: 9999;
  background-color: ${theme.background};
  width: 650px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
`

export const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(90, 90, 90, 0.95);
  z-index: 9998;
  display: ${props=>props.show?"block":"none"};
`
