import React from "react";
import { Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import Grid from "@mui/material/Grid";
import { ReactComponent as Resultpageimg } from "../images/searchbg.svg";
import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function ResultHeader({ code }) {
  const theme = useTheme();
  return (
    <Container>
      <Grid container>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" sx={{ color: theme.palette.secondary.main }}>
            Introduction to Computer Systems ({code})
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            An introduction to the various layers that make up a modern computer
            system: encoding of data and instructions, hardware, low-level
            programming, operating systems, applications and communications.
          </Typography>
          <SearchBar />
        </Grid>
        <Grid
          item
          sm={5}
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <Resultpageimg />
        </Grid>
      </Grid>
    </Container>
  );
}
