import React from "react";
import "./Upload.css";
import { Button } from 'react-bootstrap'
import axios from "axios";
import {useState,useEffect } from "react";
import {Alert} from "react-bootstrap"
import ViewNotes from "../ViewNotes/ViewNotes";

export default function Upload() {
  const hiddenFileInput = React.useRef(null)
  const [file, uploadFile] = useState(null)
  const [submitted, updateSubmission] = useState(null)
  const [loading, SetLoading] = useState(false)
  const [name, updateName] = useState([])
 
  useEffect(()=>{
    async function getnames(){
    await axios.get("http://localhost:8000/posts/showfiles")
    .then(function (response) {
      updateName(response.data)})
    }getnames()},[])//only runs once, refresh to see update

  async function handleSubmit(){

    
    console.log(file[0].type)
    const formdata = new FormData();
    formdata.append(
      "file",
      file[0],
    )

    const headers={'Content-Type': file[0].type}
    SetLoading(true)
    await axios.post("http://localhost:8000/posts/showfiles",formdata, headers)
    .then(function (response) {
      let msg = ""
      if(response.data !== "Something went terribly wrong.."){
         msg = "Your file "+ response.data +" has been uploaded. Refresh the page to see."
         }
        else{ msg = response.data} 
      

      updateSubmission(msg); 
      console.log(response)
      SetLoading(false)
          });
      
  }

  function handleChange(e){
    uploadFile(e.target.files);
  }

  function handleUpload(){
    hiddenFileInput.current.click()
  }

    

  return (
    <>
    <div className="uploader-holder">
      <div className="uploader">
        <i className="fa-solid fa-file-lines"></i>
        <input className='center' type="file" ref={hiddenFileInput}  style={{display: "none"}} onChange={handleChange} id="file-input"></input>
        {file!=null && file[0].name}
        <Button disabled={loading} className="select_button" id="select_button" onClick={handleUpload}>Select File</Button>
        <Button disabled ={loading} className="upload-button" id="upload_button" onClick={handleSubmit}>Upload File</Button>
        
        <div className="help-text">Or drag your file in</div>
        <div className="uploader-footer">Accepts formats: .docx .pdf</div>
        
        
      </div>
    </div>
    <br></br>
    <div id="alert" className='text-center mb-4'>
    {submitted != null && <Alert variant="info">{submitted}</Alert>}
    </div>
    <ViewNotes name={name} />
    </>
    
  );
}
