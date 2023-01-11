import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import useRefresh from "../context/useRefresh";
import axios from "../api/axios";
import Grid from "@mui/material/Grid";
import VerticalNav from "./VerticalNav";
import NoteUser from "./NoteUser";
import EditButton from "./EditButton";
import { useTheme } from "@mui/material/styles";

const INFO_URL = "/users/info";

export default function Profile() {
  const refresh = useRefresh();
  const theme = useTheme();

  const [user, setUser] = React.useState(null);

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
            {user ? (
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
                    {user.username[0]}
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
                      <Input disabled defaultValue={user.email} />
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
                      <Input disabled defaultValue={user.username} />
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
                    {user.notes.length > 5
                      ? user.notes
                          .slice(0, 5)
                          .map((note) => <NoteUser note={note} />)
                      : user.notes.map((note) => <NoteUser note={note} />)}

                    {user.notes.length > 5 && (
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
            ) : (
              <Typography>Loading...</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
