import React from "react";
import { useLocation } from "react-router-dom";
import Note from "./Note";

export default function Results() {
  const { state } = useLocation();
  const notes = state.map((note) => {
    return <Note {...note} />;
  });
  return <div>{notes}</div>;
}
