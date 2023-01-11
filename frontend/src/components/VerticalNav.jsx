import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import NotesIcon from "@mui/icons-material/Notes";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import useLogout from "../context/useLogout";
import { useTheme } from "@mui/material/styles";

const VerticalNav = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  const theme = useTheme();

  return (
    <List
      component="nav"
      aria-label="main mailbox folders"
      style={{ backgroundColor: theme.palette.primary.main, height: "100%" }}
    >
      <Link
        to="/profile"
        style={{ color: theme.palette.greywhite.main, textDecoration: "none" }}
      >
        <ListItem>
          <ListItemIcon>
            <PersonIcon style={{ color: theme.palette.greywhite.main }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </Link>
      <Link
        to="/liked-notes"
        style={{ color: theme.palette.greywhite.main, textDecoration: "none" }}
      >
        <ListItem>
          <ListItemIcon>
            <NotesIcon style={{ color: theme.palette.greywhite.main }} />
          </ListItemIcon>
          <ListItemText primary="Liked Notes" />
        </ListItem>
      </Link>
      <ListItem
        onClick={signOut}
        style={{ color: theme.palette.greywhite.main, cursor: "pointer" }}
      >
        <ListItemIcon>
          <ExitToAppIcon style={{ color: theme.palette.greywhite.main }} />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItem>
    </List>
  );
};

export default VerticalNav;
