import React from "react";
import axios from "../../api/axios";
import "./ViewNotes.css";
// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { useState, useEffect } from "react";
// import { Document, Page } from 'react-pdf';
import { Card, CardGroup, Row, Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";

export default function ViewNotes() {
  const [doc, updateDoc] = useState(null);
  const [msg, updateMsg] = useState(null);
  const [name, updateName] = useState([]);
  //   const [numPages, setNumPages] = useState(null);
  //   const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }
  useEffect(() => {
    async function getnames() {
      await axios.get("/files").then(function (response) {
        updateName(response.data);
        console.log(response);
      });
    }
    getnames();
  }, []); //only runs once, refresh to see update

  async function deleteBlob(name) {
    const url = "files/delete/" + name;
    await axios.delete(url).then(function (response) {
      // window.location = response.data;

      updateMsg(response.data);
      window.location.reload();
    });
  }

  async function handleDownload(name) {
    const url = "files/download/" + name;
    await axios.get(url).then(function (response) {
      // window.location = response.data;

      updateDoc(response.data);
    });
  }

  function handleClick(n) {
    handleDownload(n);
  }

  return (
    <>
      <div className="displayFiles">
        <Row md={6} className="g-4">
          {Object.keys(name).map((key, value) => (
            <Card key={value} style={{ width: "15rem", margin: "10px" }}>
              <Card.Img variant="top" src={name[key].replace(/\s/g, "%20")} />
              <Card.Body>
                <div className="files">
                  <Card.Title onClick={() => handleClick(key)}>
                    {key}
                  </Card.Title>
                </div>
                <Button onClick={() => deleteBlob(key)}>Delete</Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </div>
      {msg !== null && <Alert variant="info">{msg}</Alert>}

      <iframe src={doc} width="100%" height="500px"></iframe>
    </>
  );
}
