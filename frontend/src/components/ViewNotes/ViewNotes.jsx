import React from "react";
import axios from "../../api/axios";
import "./ViewNotes.css";
// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { useState } from "react";
// import { Document, Page } from 'react-pdf';
import {Card,CardGroup, Row} from 'react-bootstrap'

export default function ViewNotes({ name }) {
  const [doc, updateDoc] = useState(null);
  //   const [numPages, setNumPages] = useState(null);
  //   const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }

  async function handleDownload(name) {
    const url = "files/download?name=" + name;
    await axios.get(url).then(function (response) {
      window.location = response.data;

      updateDoc(response.data);
    });
  }

  function handleClick(n) {
    handleDownload(n);
  }

  return (
    <>
  
      {/* <div className="displayFiles"> */}
      <Row xs={1} md={2} className="g-4">
          {Object.keys(name).map((key) => (
            // <div className="container">
            
            <Card style={{ width: "15rem" ,margin:"10px"}}>
              <Card.Img
                variant="top"
                
                src={name[key].replace(/\s/g, "%20")}
              />
              <Card.Body>
                <Card.Title onClick={() => handleClick(key)}>{key}</Card.Title>
              </Card.Body>
            </Card>
            // </div>
          ))}
      </Row>
      {/* </div> */}
      {doc}
      {/* <Document file={doc} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} /> 
        </Document> */}
    </>
  );
}
