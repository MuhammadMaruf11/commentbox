import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../api";

const Comments = ({ commentsUrl, currentUserId }) => {

const [comments,setComments] = useState([]);
const [showForm,setShowForm] = useState(false);


const fetchComments = async () => {
  const rawComments = await getCommentsApi();
  setComments([...rawComments]);
}

useEffect( () => {
   fetchComments()
}, [])

  return (
    <div className="">
      <div className="mt-4 text-2xl font-semibold text-center">Write comment</div>
       
              <div
                className='bg-cyan-300 cursor-pointer h-8 inline-block leading-8 mb-10 ml-20 mr-10 rounded-xl text-black text-center text-xs uppercase'
                onClick={() =>
                 setShowForm(!showForm)
                }
                style={{padding:' 0 10px'}}
              >
                {!showForm ? 'Add New Comment' : 'Cancel'}
              </div>

       {showForm && <CommentForm submitLabel="Post" type='post' closeForm={setShowForm}  fetchComments={fetchComments}/>}
      <div className="">
        { comments?.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            fetchComments={fetchComments}
            currentUserId={currentUserId}
            userId={comment.userId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
