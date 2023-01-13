import React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

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
      sx={{ maxWidth: 345, cursor: "pointer" }}
      onClick={() => handleView(note.id)}
    >
      <div style={{ display: "flex", width: "100%" }}>
        <CardMedia
          image={note.preview}
          title={note.title}
          style={{ width: "40%", height: "100%", paddingTop: "100%" }}
        />
        <div style={{ width: "60%", padding: theme.spacing(2) }}>
          <div style={{ display: "flex" }}>
            <Avatar sx={{ backgroundColor: theme.palette.secondary.main }}>
              {note.owner_name.charAt(0).toUpperCase()}
            </Avatar>
            <div style={{ flex: 1, marginLeft: theme.spacing(2) }}>
              <Typography variant="subtitle1">{note.owner_name}</Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(note.uploaded_at).toLocaleDateString()}
              </Typography>
            </div>
            <div>
              <Rating name="read-only" value={4} readOnly />
              <Typography variant="caption" color="textSecondary">
                15 reviews
              </Typography>
            </div>
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {note.title}
            </Typography>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
