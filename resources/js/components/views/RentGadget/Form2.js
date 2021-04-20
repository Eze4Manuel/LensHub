import React from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import { API_BASE_URL, USER_ID } from '../../config';
import Loader from "../../assets/img/loader.gif";
import Alert from '@material-ui/lab/Alert';


function Form2(props) {
  const [images, setImages] = React.useState([]);
  const [loader, setLoader] = React.useState(false);

  const maxNumber = 3;


  const onChange = (imageList, addUpdateIndex) => {
    //Setting Loader
    setLoader(true);

    // data for submit
    setImages(imageList);
    if(imageList.length > 0){
           const fd = new FormData();
           fd.append('file', imageList[addUpdateIndex[0]].file)
           fd.append('fileInfo', addUpdateIndex[0])
           fd.append('fileName', imageList[addUpdateIndex].file.name)
           fd.append('productId', props.productId)

           $.ajax({
            url: API_BASE_URL + '/productPhotos/'+ USER_ID,
            method:'POST',
            processData: false,
            contentType: false,
            data: fd
          })
          .done( res => {
               //Setting Loader
              setLoader(false);

          })
          .fail( err => { console.log(err.responseText);})
    }
   };


  const handleDone = () => {
    props.handleDisable({form1: true, form2: true, form3: false});
    setTimeout( e => {
      props.handleTribute(2)
      var elmnt = document.getElementById("rentform3");
      elmnt.scrollIntoView(false);
    }, 2000);
  }
  const removeAll = (e) => {
    setImages([]);
    setTimeout(()=> setLoader(false), 1000);
   }

  return (
    <div className="form2" id="form2">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper row">
            <h5>  Upload Images Of Product</h5>
            <button className="uploadbtn"
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here (Maximum of 3)
            </button>
            &nbsp;
            <div className='gaurdian'>
               {imageList.map((image, index) => (
               <div key={index} className="image-item col s4">
                 <img src={image.data_url} alt="" width="100" />
                 <div className="image-item__btn-wrapper ">
                   <i className="material-icons blue-text" onClick={() => onImageUpdate(index)}>update</i>
                   <i className="material-icons red-text"  onClick={() => onImageRemove(index)}>remove_circle</i>
                 </div>
               </div>
               ))}
            </div>
            <div className="loader">
            { loader ? <img src={Loader} alt="loader" /> : null }
            </div>
            <div>
              <button className="clearbtn red darken-1" onClick={onImageRemoveAll} onClick={removeAll}>Clear All</button>
              <button className="clearbtn green darken-1" onClick={handleDone} >Done</button>
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default Form2;
