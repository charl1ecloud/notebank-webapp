import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/AuthProvider";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import Login from "./Login";
import useRefresh from "../context/useRefresh";
import axios from "../api/axios";

const INFO_URL = "/users/info";

export default function NavBar() {
  const refresh = useRefresh();
  const theme = useTheme();
  let navigate = useNavigate();
  const { auth } = useAuth();
  const [value, setValue] = useState(0);
  const [user, setUser] = React.useState(null);

  const pages = ["Home", "Temp Link", "Temp Link", "Upload Notes"];

  React.useEffect(() => {
    async function getData() {
      try {
        const newToken = await refresh();
        const response = await axios.get(INFO_URL, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        setUser(response["data"]);
      } catch (err) {
        if (!err?.response) {
          console.log("* No Server Response");
        } else {
          console.log(err.response);
        }
      }
    }
    getData();
  }, []);

  return (
    <AppBar
      sx={{ background: theme.palette.greywhite.main, p: 2 }}
      position="static"
    >
      <Toolbar>
        <Typography
          component="span"
          display="flex"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setValue(0);
            navigate("/");
          }}
        >
          <Typography
            sx={{
              p: 1,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              bgcolor: theme.palette.primary.main,
              fontSize: 20,
              fontWeight: 900,
            }}
          >
            Note
          </Typography>
          <Typography
            sx={{
              p: 1,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              fontSize: 20,
              bgcolor: theme.palette.secondary.main,
              fontWeight: 900,
            }}
          >
            Bank
          </Typography>
        </Typography>
        <Tabs
          sx={{
            color: theme.palette.textcolor.main,
            ml: "auto",
            mr: 3,
          }}
          value={value}
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
          onChange={(e, value) => {
            setValue(value);
          }}
        >
          {pages.map((name, index) => {
            return (
              <Tab
                value={index}
                label={name}
                sx={{
                  fontFamily: `'Poppins', sans-serif`,
                  fontWeight: 900,
                  color: theme.palette.textcolor.main,
                  textTransform: "none",
                }}
                onClick={() => {
                  navigate(
                    name == "Home" ? "/" : "/" + name.replace(/\s/g, "")
                  );
                }}
              />
            );
          })}
        </Tabs>

        {auth.accessToken ? (
          <Avatar
            alt="user"
            onClick={() => navigate("/profile", { state: user })}
            sx={{ cursor: "pointer" }}
          >
            {user?.User.username[0].toUpperCase()}
          </Avatar>
        ) : (
          <Login />
        )}
      </Toolbar>
    </AppBar>
  );
}
