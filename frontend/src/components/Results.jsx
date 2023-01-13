import React from "react";
import { useLocation } from "react-router-dom";
import NoteCard from "./NoteCard";

export default function Results() {
  const { state } = useLocation();
  const notes = state.map((note) => {
    return <NoteCard note={note} />;
  });
  return <div>{notes}</div>;
}
