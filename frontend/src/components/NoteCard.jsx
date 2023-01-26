import React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import CardActionArea from "@mui/material/CardActionArea";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Chip from "@mui/material/Chip";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { Avatar } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";

export default function NoteCard({ note }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleView = async (id) => {
    const response = await axios.get(`/notes/${id}`, {
      responseType: "arraybuffer",
    });
    navigate("/preview", { state: response.data });
  };

  return (
    <Card
      sx={{
        width: 315,
        height: 450,
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea
        sx={{
          height: "100%",
          width: "100%",
          p: 4,
        }}
        onClick={() => handleView(note.id)}
      >
        <CardHeader
          sx={{ width: "100%" }}
          avatar={
            <Avatar sx={{ height: 24, width: 24 }}>
              {note.owner_name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={note.owner_name}
          action={
            <Chip
              size="small"
              icon={<SummarizeIcon />}
              label={note.note_type}
              sx={{ mt: 2 }}
            />
          }
          subheader={
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              sx={{ opacity: 0.7 }}
            >
              {note.academic_year}
            </Typography>
          }
        />

        <CardMedia
          component="img"
          sx={{
            objectFit: "cover",
            objectPosition: "top",
            borderRadius: 5,
            height: 200,
            border: "1px solid #e0e0e0",
          }}
          image={note.preview}
          alt={note.title}
        />

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {note.title}
          </Typography>
          <Typography
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 4,
            }}
          >
            <Typography
              component="div"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <AutoStoriesIcon sx={{ color: "#e0e0e0" }} />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {note.page_count} pages
              </Typography>
            </Typography>
            <Typography
              component="div"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ThumbUpAltIcon sx={{ color: "#57e32c" }} />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                100%
              </Typography>
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                (3)
              </Typography>
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
