import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleStore from "../images/google-play-badge.png";
import { ReactComponent as AppStore } from "../images/apple-store.svg";

export default function StickyFooter() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container columns={{ xs: 4, sm: 8, md: 16 }}>
        <Grid xs={2} sm={4} md={7} key={0}>
          <Box sx={{ backgroundColor: "#ffffff", height: "300px", p: 5 }}>
            <Typography
              component="span"
              display="flex"
              sx={{ cursor: "pointer" }}
              onClick={() => {
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
                  color: "#ffffff",
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
                  color: "#ffffff",
                }}
              >
                Bank
              </Typography>
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "120px",
                my: 3,
              }}
            >
              <FacebookIcon sx={{ color: "#3b5998" }} />
              <YouTubeIcon sx={{ color: "#FF0000" }} />
              <TwitterIcon sx={{ color: "#1DA1F2" }} />
              <InstagramIcon
                sx={{
                  color:
                    "linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)",
                }}
              />
            </Box>
            <Typography sx={{ mt: 13 }}>
              © 2022 NoteBank Ltd. All rights reserved.
            </Typography>
          </Box>
        </Grid>
        <Grid xs={2} sm={4} md={3} key={1}>
          <Box sx={{ backgroundColor: "#ffffff", height: "300px", p: 5 }}>
            <Typography sx={{ mb: 3 }}>More from NoteBank</Typography>

            <Typography>About Us</Typography>
            <Typography>Careers</Typography>
            <Typography>Academic Integrity</Typography>
            <Typography>FAQs</Typography>
            <Typography>Blogs</Typography>
          </Box>
        </Grid>
        <Grid xs={2} sm={4} md={3} key={2}>
          <Box sx={{ backgroundColor: "#ffffff", height: "300px", p: 5 }}>
            <Typography sx={{ mb: 3 }}>Contact Us</Typography>
            <Typography>Legal</Typography>
            <Typography>Copyrights</Typography>
            <Typography>Terms of Use</Typography>
            <Typography>Privacy Policy</Typography>
            <Typography>Cookie Statement</Typography>
          </Box>
        </Grid>
        <Grid xs={2} sm={4} md={3} key={3}>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              height: "300px",
              alignItems: "center",
              p: 5,
            }}
          >
            <AppStore style={{ paddingLeft: 0 }} />
            <img src={GoogleStore} style={{ width: "135px", height: "58px" }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
