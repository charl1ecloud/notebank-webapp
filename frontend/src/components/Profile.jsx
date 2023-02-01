import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import VerticalNav from "./VerticalNav";
import NoteCard from "./NoteCard";
import EditButton from "./EditButton";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

const INFO_URL = "/users/info";

export default function Profile() {
  const { state } = useLocation();
  const theme = useTheme();

  const changeProfile = () => {
    return;
  };

  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Grid item style={{ width: "20%" }}>
        <VerticalNav />
      </Grid>
      <Grid item style={{ width: "80%" }}>
        <Grid container width="100%">
          <Grid item width="100%">
            <Card
              style={{
                backgroundColor: "#f7f7f7",
                border: "none",
                boxShadow: "none",
                borderRadius: "0",
                width: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  My Profile
                </Typography>
                <Avatar alt="user" onClick={changeProfile}>
                  {state.User.username[0]}
                </Avatar>
                <Grid
                  container
                  style={{
                    margin: "1rem 0",
                    gap: "1rem",
                    alignItems: "center", // align items vertically
                    justifyContent: "flex-start",
                  }}
                >
                  <Grid item>
                    <Typography width={"100px"}>Email:</Typography>
                  </Grid>
                  <Grid item>
                    <Input disabled defaultValue={state.User.email} />
                  </Grid>
                  <Grid
                    item
                    sx={{
                      ml: "2rem",
                      cursor: "pointer",
                      color: theme.palette.secondary.main,
                    }}
                  >
                    <EditButton targetValue="email" />
                  </Grid>
                </Grid>
                <Grid
                  container
                  style={{
                    margin: "1rem 0",
                    gap: "1rem",
                    alignItems: "center", // align items vertically
                    justifyContent: "flex-start",
                  }}
                >
                  <Grid item>
                    <Typography width={"100px"}>Username:</Typography>
                  </Grid>
                  <Grid item>
                    <Input disabled defaultValue={state.User.username} />
                  </Grid>
                </Grid>

                <Typography>My Notes</Typography>
                <Box
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                  }}
                >
                  {state.notes.length > 5
                    ? state.notes
                        .slice(0, 5)
                        .map((note) => <NoteCard note={note} />)
                    : state.notes.map((note) => <NoteCard note={note} />)}

                  {state.notes.length > 5 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {}}
                    >
                      View More Notes
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
