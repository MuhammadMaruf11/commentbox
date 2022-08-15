import { useState, useEffect } from "react";
import camera from '../img/camera.png';

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  image,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState(image || selectedFile)

  // console.log(selectedFile);
  // console.log(preview)

  // const noSelectFile = selectedFile.image === null;

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    // console.log(objectUrl)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }
  

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(preview);
    handleSubmit(text, '' , preview);
    setText("");
    setPreview('');
  };
  console.log(onSubmit);
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
          {selectedFile && <img className="max-w-40 max-h-40" src={preview} alt="" />}
        </div>
        <div className="flex flex-wrap items-center">
        
          <button className="w-20 h-8 ml-20 text-xs text-black uppercase cursor-pointer rounded-xl bg-cyan-300" disabled={isTextareaDisabled && !preview}>
            {submitLabel}
          </button>
          {hasCancelButton && (
          <button
            type="button"
            className="inline-block w-20 h-8 ml-10 text-xs leading-8 text-center text-black uppercase cursor-pointer rounded-xl bg-cyan-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
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
