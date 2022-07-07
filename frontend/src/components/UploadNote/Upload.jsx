import React from "react";
import "./Upload.css";

export default function Upload() {
  return (
    <div className="uploader-holder">
      <div className="uploader">
        <i className="fa-solid fa-file-lines"></i>
        <button className="upload-button">Upload File</button>
        <div className="help-text">Or drag your file in</div>
        <div className="uploader-footer">Accepts formats: .docx .pdf</div>
      </div>
    </div>
  );
}
