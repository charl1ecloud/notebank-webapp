import React from "react";
import {
  Card,
  Typography,
  CardHeader,
  Avatar,
  Box,
  Button,
  IconButton,
  CardContent,
  CardActions,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import axios from "../api/axios";
import useRefresh from "../context/useRefresh";

export default function InfoWidget({ info }) {
  const refresh = useRefresh();

  const handleLike = async () => {
    const newToken = await refresh();
    const response = await axios.post(
      `/vote/like?note_id=${info[0].id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      }
    );
  };
  const handleDislike = async () => {
    const newToken = await refresh();
    const response = await axios.post(
      `/vote/dislike?note_id=${info[0].id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      }
    );
  };

  return (
    <Card
      variant="outlined"
      sx={{
        position: "sticky",
        top: "1rem",
        mt: "1rem",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="body2" sx={{ color: "#ccc" }}>
          {">"} Home / {info[0].code} / {info[0].academic_year}
        </Typography>
        <Typography variant="h6">{info[0].title}</Typography>
      </CardContent>

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red", width: 24, height: 24 }}>
            {info[0].owner.username.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={info[0].owner.username}
      />
      <CardActions sx={{ pt: 0 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Helpful?
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ThumbUpAltIcon sx={{ color: "#57e32c" }} />}
              onClick={handleLike}
            >
              {info[1]}
            </Button>
            <Button
              variant="outlined"
              startIcon={<ThumbDownAltIcon sx={{ color: "red" }} />}
              onClick={handleDislike}
            >
              {info[2]}
            </Button>
          </Box>
        </Box>
      </CardActions>
      <CardActions>
        <Button startIcon={<DownloadForOfflineIcon />}>Download</Button>
        <Button variant="outlined" startIcon={<ContentCopyIcon />}>
          Copy Link
        </Button>
        <Button variant="outlined" startIcon={<BookmarkBorderIcon />}>
          Save
        </Button>
      </CardActions>
    </Card>
  );
}
