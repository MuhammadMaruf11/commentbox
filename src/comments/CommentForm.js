import { useState, useEffect } from "react";
import camera from '../img/camera.png';

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
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
  return (
    <div className="py-10">
      <form onSubmit={onSubmit}>


        <div className="text-center">
          <textarea
            className="w-[90%] mb-4 text-black text-xl h-32 rounded-xl "
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="mx-20 mb-4">
          {selectedFile && <img className="max-w-40 max-h-40" src={preview} alt="" />}
        </div>
        <div className="flex flex-wrap items-center">
          <button className="ml-20 cursor-pointer w-20 text-xs uppercase rounded-xl h-8 text-black bg-cyan-300" disabled={isTextareaDisabled}>
            {submitLabel}
          </button>
          <div>
            <label className="cursor-pointer w-24 " htmlFor="upFile">
              <img className="max-w-full block w-16" src={camera} alt="" />
            </label>
            <input id="upFile" className="hidden" accept="image/png, video/wmv, video/avi, video/mkv, video/mp4, image/jpg, image/jpeg" type="file" onChange={onSelectFile} />

          </div>


        </div>
       
        {hasCancelButton && (
          <button
            type="button"
            className=""
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </form>
    </div>

  );
};

export default CommentForm;
