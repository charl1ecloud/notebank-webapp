import React from "react";
import TypeWriter from "./components/TypeWriter/TypeWriter";
import SearchBar from "./components/SearchBar";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ReactComponent as Homepageimg } from "./images/homepageimg.svg";

export default function Home() {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        columns={5}
        sx={{
          background: `linear-gradient(155deg,${theme.palette.primary.main} 60%,${theme.palette.greywhite.main} 60%)`,
          minHeight: "100vh",
        }}
      >
        <Grid xs={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
            flexDirection="column"
          >
            <Box width="80%">
              <Typography
                centered
                sx={{
                  fontSize: "7rem",
                  fontWeight: 900,
                  lineHeight: "100px",
                  userSelect: "none",
                  color: theme.palette.greywhite.main,
                }}
              >
                Search notes <br />
                for{" "}
                <TypeWriter
                  textArray={[
                    "Science",
                    "Engineering",
                    "Commerce",
                    "Design",
                    "Architecture",
                    "Law",
                    "Medicine",
                  ]}
                />
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.3rem",
                  marginTop: "2rem",
                  fontWeight: 100,
                  lineHeight: "2rem",
                  color: theme.palette.greywhite.main,
                  maxWidth: "80%",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </Typography>
              <SearchBar />
            </Box>
          </Box>
        </Grid>
        <Grid xs={2}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
            flexDirection="column"
          >
            <Homepageimg />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
