import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthProvider";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          padding: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f7f7f7",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#1b3061",
    },
    secondary: {
      main: "#f4900c",
      light: "#f5e4cb",
    },
    greywhite: {
      main: "#f7f7f7",
      light: "f9f9f9",
    },
    textcolor: {
      main: "#36373a",
    },
  },
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
