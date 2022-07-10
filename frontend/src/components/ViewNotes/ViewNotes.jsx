import React from "react";
import axios from "axios";
import "./ViewNotes.css";
// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { useState } from "react";
// import { Document, Page } from 'react-pdf';

export default function ViewNotes({ name }) {
    const [doc,updateDoc] = useState(null)
  //   const [numPages, setNumPages] = useState(null);
  //   const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }

    async function handleDownload(name){
        const url = " http://localhost:8000/posts/downloadfile?name="+name
        await axios.get(url)
        .then(function (response) {
            window.location = response.data
            updateDoc(response.data)
        })
          
      }    

    function handleClick(n) {
        handleDownload(n)
    }

    return (
        <>
        <div id="displayFiles">
            <ul>{name.map(n => <li onClick={()=>handleClick(n)}> {n} </li>)}</ul>
            
        </div>
        {doc}
        {/* <Document file={doc} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} /> 
        </Document> */}
        </>
        )

}
