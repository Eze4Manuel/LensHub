
import React, {Component, useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import {image64toCanvasRef, extractImageFileExtensionFromBase64, base64StringtoFile} from '../../imageFunctions';
import { API_BASE_URL, USER_ID } from '../../config';

import Alert from '@material-ui/lab/Alert';
import Loader from "../../assets/img/loader.gif";



export default function UpdateImage(props) {
  //STATES
  const [loader, setLoader] = useState(false);
  const [cropped, setCropped] = useState(true);

  const [availableType, setAvailableType] = useState({severity:"error", status: false, text: "File Type Not Accepted"});
  const [imgSrc, setImgSrc] = useState(null);
  const [crop, setCrop] = useState({ unit: 'px', width: 150, height: 150 });

  const imagePreviewCanvasRef = React.createRef();

  const reader = new FileReader();
  reader.addEventListener("load", (readerEvent)=>{
    var image = new Image();
         image.onload = function (imageEvent) {
             // Resize the image
             var canvas = document.createElement('canvas'),
                 max_size = 400,
                 width = image.width,
                 height = image.height;
             if (width > height) {
                 if (width > max_size) {
                     height *= max_size / width;
                     width = max_size;
                 }
             } else {
                 if (height > max_size) {
                     width *= max_size / height;
                     height = max_size;
                 }
             }
             canvas.width = width;
             canvas.height = height;
             canvas.getContext('2d').drawImage(image, 0, 0, width, height);
             resizedImage = canvas.toDataURL('image/jpeg');
         }
        setImgSrc(readerEvent.target.result);
   }, false);

  // VARIABLES
  const acceptedFilesTypes = 'image/x-png,image/png,image/jpg,image/jpeg,image/gif'
  const acceptedFilesTypesArray = acceptedFilesTypes.split(",");
  const MaxSize = 3000000;

  //FUNCTION
  const verify = (acceptedFiles) => {

         if (acceptedFiles && acceptedFiles.length > 0) {

            const currentFile = acceptedFiles[0];
            const currentFileSize = currentFile.size;
            const currentFileType = currentFile.type;

             if(!acceptedFilesTypesArray.includes(currentFileType)){
               setAvailableType({...availableType, severity:"error", status: true, text: "File Type Not Accepted"})
               setTimeout(()=>setAvailableType({...availableType, status: false}),3000)
              return false;
            }else if(MaxSize < currentFileSize){
              setAvailableType({...availableType, severity:"error", status: true, text: "File Size To Large"});
              setTimeout(()=> setAvailableType({...availableType, status: false}),3000)
              return false;
            }else{
               reader.readAsDataURL(currentFile);
              return true;
            }
         }
  }



  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
     multiple: true,
     onDrop: acceptedFiles => {
        if (verify(acceptedFiles)) {

         }
     }
  });


const handleClick = e =>{
   props.toggle();
}
const handleOnCropChange = (e, r) =>{
  setCrop(e);
}
const handleImageLoaded = image =>{

 }
const handleOnCropComplete = (crop, pixelCrop) => {
  const canvasRef = imagePreviewCanvasRef.current;
  image64toCanvasRef(canvasRef, imgSrc, crop);
}

const handleCropClick = e => {
  e.preventDefault();
  if(imgSrc){
    const canvasRef = imagePreviewCanvasRef.current;
    const fileExtension = extractImageFileExtensionFromBase64(imgSrc);
    const fileName = "Preview." + fileExtension;
    const imageData64 = canvasRef.toDataURL('image/' + fileExtension);
    const croppedFileUpload = base64StringtoFile(imageData64, fileName);

    setImgSrc(croppedFileUpload);
    setCropped(false);

  }
}

const handleUpload = e => {
  setLoader(true);

  e.preventDefault();

  const fd = new FormData();
    fd.append('file', imgSrc)
    $.ajax({
       url: API_BASE_URL + '/updateimage/'+ USER_ID,
       method: 'POST',
       data: fd,
       contentType: false,
       processData: false,
     })
     .done( res => {
        if(res == 0){
          setAvailableType({...availableType, severity:"error", status: true, text: "Error Uploading File"})
          setLoader(false);
          setTimeout(()=>{setAvailableType({...availableType,status: false, text: "Error Uploading File"}) }, 4000)
        }else{
          setAvailableType({...availableType, severity:"success", status: true, text: "Profile Image Upload Success"});
          setLoader(false);
          setTimeout(()=>{setAvailableType({...availableType,status: false}); props.toggle(); }, 4000);
          window.location.reload();
        }
     })
     .fail(err => {console.log(err.responseText); setLoader(false);});
}



  return (
    <section className="container" id='dropimage'>
      <p> Max Size 3MB, File Types: jpeg, jpg, png, gif</p>
      {imgSrc !== null ?
        // <img src = {imgSrc} alt='uploaded image' />
        <div>
             <ReactCrop src = {imgSrc} crop = {crop}  onChange = {handleOnCropChange}
                  onImageLoaded={handleImageLoaded} onComplete = {handleOnCropComplete} />
             <br/>
             <p>Preview</p>
             <canvas ref={imagePreviewCanvasRef}> </canvas>
        </div>
      :
      <div {...getRootProps({className: 'dropzone'})}>
        <input   {...getInputProps()}  type='file' name='file' id='file' accept = {acceptedFilesTypes} />
        <p>Drag 'n' drop Image To Update files here, or click to select files</p>
      </div>
      }

      {loader ? <img className='loader' src={Loader} />: null}
      {(availableType.status)? <Alert severity={availableType.severity}>{availableType.text}</Alert> : null}

      <aside>

         {cropped ?
           <button className="btn" onClick={handleCropClick}>Crop</button>
           :
           <div>
               <button className="btn" onClick={handleUpload}>Upload</button>
               <button className="btn" onClick={handleClick}>Exit</button>
           </div>
         }
       </aside>
    </section>
  );
}
