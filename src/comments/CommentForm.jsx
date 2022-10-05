import { useState, useEffect } from "react";
import camera from '../img/camera.png';
import {
  createComment,
  updateComment
} from "../api";


const CommentForm = ({
  submitLabel,
  image,
  initialText = "",
  type,
  parentId,
  fetchComments,
  closeForm
}) => {

  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState(image || selectedFile)


const onSelectFile = e => {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => setPreview(reader.result) ;
}
  

  const onSubmit = (event) => {
    event.preventDefault();
    if(type === 'reply'){
      createComment(text,preview,parentId);
    }else if(type === 'edit'){
     updateComment(text,preview,parentId)
    }else{
      createComment(text,preview);
    }
    
    setText("");
    setPreview('');
    setSelectedFile()
    fetchComments()
    closeForm();
  };
  
  return (
    <div className="py-10">
      <form onSubmit={onSubmit}>
        <div className="text-center">
          <textarea required={false}
            className="w-[90%] mb-4 text-black text-xl h-32 rounded-xl "
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="mx-20 mb-4">
          {preview && <img className="max-w-40 max-h-40" src={preview} alt="" />}
        </div>
        <div className="flex flex-wrap items-center">
        
          <button className="w-20 h-8 ml-20 text-xs text-black uppercase cursor-pointer rounded-xl bg-cyan-300" disabled={isTextareaDisabled && !preview}>
            {submitLabel}
          </button>
          <div>
            <label className="w-24 cursor-pointer " htmlFor="upFile">
              <img className="block w-16 max-w-full" src={camera} alt="" />
            </label>
            <input id="upFile" className="hidden" accept="image/png, video/wmv, video/avi, video/mkv, video/mp4, image/jpg, image/jpeg" type="file" onChange={onSelectFile} />
          </div>
        </div>
      </form>
    </div>

  );
};

export default CommentForm;
