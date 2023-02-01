import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import InfoWidget from "./InfoWidget";
import CommentWidget from "./CommentWidget";

export default function Preview() {
  const { state } = useLocation();
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ px: 5 }}>
        <Grid item xs={12} md={2.5}>
          <InfoWidget
            info={[state["Note"], state["likes"], state["dislikes"]]}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Document
              file={{ data: atob(state["note_bytes"]) }}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  scale={1.7}
                />
              ))}
            </Document>
          </Box>
        </Grid>
        <Grid item xs={12} md={2.5}>
          <Box sx={{ position: "sticky", top: "1rem" }}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                mt: "1rem",
                height: 300,
              }}
            >
              <CardContent>
                <Typography variant="h3">placeholder for ads</Typography>
              </CardContent>
            </Card>
            <CommentWidget
              info={[state["comments"], state["comments_count"]]}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
