import {useState} from 'react';
import CommentForm from "./CommentForm";
import { deleteComment } from "../api";




const Comment = ({
  comment,
  parentId = null,
  currentUserId,
  userId,
  fetchComments
}) => {
 

  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =  currentUserId === comment.userId && !timePassed ;
  const canReply = Boolean(currentUserId) && comment.replies;
  const canEdit = currentUserId === comment.userId && (!timePassed && comment.replies) ;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const exactTime = new Date(comment.createdAt).toLocaleTimeString();
  const [showReplyForm,setShowReplyForm] = useState(false);
  const [showEditForm,setShowEditForm] = useState(false);
  const [formData,setFormData] = useState({});


const replyForm = (id) =>{
  setFormData({ id: id, formType: 'reply' , label: 'Add' })
  setShowReplyForm(!showReplyForm);
}



const editForm = (id) =>{
  setFormData({ id: id, formType: 'edit' , label: 'Update' })
  setShowEditForm(!showReplyForm);
}


const dltComment = (id)=>{
  if(parentId){
    deleteComment('reply',parentId,id);
  }else{
    deleteComment('comment',id,);
  }
  fetchComments()
}




  return (
    <div>
      <div key={comment.id} className={`mx-auto w-[90%]`}>
        <div className={`flex flex-wrap items-center mb-4 ${userId === currentUserId ? `justify-end` : ``}`}>
          <img className="w-8 h-8 mr-4 rounded-full" src="/user-icon.png" alt="" />
          <div className="inline-block text-sm">{comment.username}</div>
          <div className="ml-4 text-xs">{createdAt}</div>
          <div className="ml-4 text-xs">{exactTime}</div>
        </div>
        <div className={`mb-8 ${userId === '0' ? `ml-auto` : ``}`}>
          <div className={`h-auto mb-4 text-xs break-all w-fit ${userId === '0' ? 'ml-auto' : ''}`}><p className="text-start max-w-max"> {comment.image && <img className="max-w-[240px] max-h-40" src={comment.image} alt="" />} <br /> {comment.body} </p></div>
           <div className={`flex mb-10 ${userId === currentUserId ? `justify-end` : ``}`}>
            {canReply && (
              <div
                className={`inline-block w-20 mr-10 h-8 text-xs leading-8 text-center text-black uppercase cursor-pointer rounded-xl bg-cyan-300 ${userId === '0' ? 'ml-auto' : ''}`}
                onClick={() =>
                 replyForm(comment.id)
                }
              >
                {!showReplyForm ? 'Reply' : 'Cancel'}
              </div>
            )}
            {canEdit && (
              <div
                className="inline-block w-20 h-8 mr-10 text-xs leading-8 text-center text-black uppercase cursor-pointer rounded-xl bg-cyan-300"
                onClick={() =>
                  editForm(comment.id)
                }
              >
                Edit
              </div>
            )}
            {canDelete && (
              <div
                className="inline-block w-20 h-8 text-xs leading-8 text-center text-black uppercase cursor-pointer rounded-xl bg-cyan-300 "
                onClick={() => dltComment(comment.id)}
              >
                Delete
              </div>
            )}
          </div>
          {showReplyForm && (
            <CommentForm
              submitLabel={formData.label}
              fetchComments={fetchComments}
              type="reply"
              parentId={comment.id}
              closeForm={setShowReplyForm}

            />
          )}
          {showEditForm && (
            <CommentForm
              submitLabel={formData.label}
              fetchComments={fetchComments}
              type="edit"
              parentId={comment.id}
              closeForm={setShowEditForm}
              initialText={comment.body}
              image={comment.image}

            />
          )}
          {comment?.replies && (
            <div className="">
              {comment?.replies.map((reply) => (
                <Comment
                  comment={reply}
                  key={reply.id}
                  parentId={comment.id}
                  currentUserId={currentUserId}
                  userId={comment.userId}
                  fetchComments={fetchComments}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
