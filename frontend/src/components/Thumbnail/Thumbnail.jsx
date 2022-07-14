// import React from "react";
// import { useState } from "react";
// // import PDFJS from "pdfjs-dist/webpack"

// export default function Thumbnail() {
//     const [thumbnail,updateThumbnail]=useState(null)

// function readFileData(file) {

//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       resolve(e.target.result);
//     };
//     reader.onerror = (err) => {
//       reject(err);
//     };
//     reader.readAsDataURL(file);
//   });
// };

// //param: file -> the input file (e.g. event.target.files[0])
// //return: images -> an array of images encoded in base64 
// async function convertPdfToImages(file){
//   const images=[];
//   const data = await readFileData(file);
//   const pdf = await PDFJS.getDocument(data).promise;
//   const canvas = document.createElement("canvas");
  
//     const page = await pdf.getPage(1);
//     const viewport = page.getViewport({ scale: 1 });
//     const context = canvas.getContext("2d");
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;
//     await page.render({ canvasContext: context, viewport: viewport }).promise;
//     images.append(canvas.toDataURL());
  
//   canvas.remove();
//   return images;
// }
   
// 	return (
// 		<>
// 			{images}
// 		</>
// 	);
// }