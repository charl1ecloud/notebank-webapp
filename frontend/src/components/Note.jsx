import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function RecipeReviewCard(props) {
  const navigate = useNavigate();

  const theme = useTheme();

  const handleView = async (id) => {
    const response = await axios.get(`/notes/${id}`, {
      responseType: "arraybuffer",
    });
    navigate("/preview", { state: response.data });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: theme.palette.primary.main }}>C</Avatar>}
        title={props.owner_name}
        subheader={props.uploaded_at}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="contained" onClick={() => handleView(props.id)}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
