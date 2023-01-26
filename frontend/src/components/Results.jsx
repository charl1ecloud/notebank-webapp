import React from "react";
import { useLocation } from "react-router-dom";
import NoteCard from "./NoteCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ResultHeader from "./ResultHeader";
import { Typography } from "@mui/material";

export default function Results() {
  const { state } = useLocation();
  const notes = state.map((note) => {
    return (
      <>
        <Grid item key={note.id} xs={8.5} md={4.5} lg={3.5}>
          <NoteCard note={note} />
        </Grid>
      </>
    );
  });
  return (
    <>
      <ResultHeader code={state[0].code} />
      <Container>
        <Typography>{notes.length} result(s)</Typography>
        <Grid
          container
          wrap="nowrap"
          spacing={3}
          sx={{
            overflow: "auto",
            mt: 0.5,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {notes}
        </Grid>
      </Container>
    </>
  );
}
