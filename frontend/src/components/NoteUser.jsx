import react from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function NoteUser({ note }) {
  return (
    <Card
      key={note.id}
      style={{
        backgroundColor: "#f7f7f7",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {note.title}
        </Typography>
        <Typography variant="body2">{note.code}</Typography>
        <Typography variant="body2">{note.year}</Typography>
        <Typography variant="body2">{note.uploaded_at}</Typography>
        <Typography variant="body2">{note.owner_name}</Typography>
      </CardContent>
    </Card>
  );
}
