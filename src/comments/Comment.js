import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
  userId
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const exactTime = new Date(comment.createdAt).toLocaleTimeString();
  return (
    <div>
      <div key={comment.id} className={`mx-auto w-[90%]`}>
        <div className={`flex flex-wrap items-center mb-4 ${userId === '0' ? `justify-end` : ``}`}>
          <img className="w-8 h-8 mr-4 rounded-full" src="/user-icon.png" alt="" />
          <div className="inline-block text-sm">{comment.username}</div>
          <div className="ml-4 text-xs">{createdAt}</div>
          <div className="ml-4 text-xs">{exactTime}</div>
        </div>
        <div className={`mb-8 ${userId === '0' ? `ml-auto` : ``}`}>
          {!isEditing && <div className={`h-auto mb-4 text-xs break-all w-fit ${userId === '0' ? 'ml-auto' : ''}`}><p className="text-start max-w-max"> {comment.image && <img className="max-w-[240px] max-h-40" src={comment.image} alt="" />} <br /> {comment.body} </p></div>}
          {isEditing && (
            <CommentForm
              submitLabel="Update"
              hasCancelButton
              initialText={comment.body}
              image={comment.preview}
              handleSubmit={(text, preview) => updateComment(text, comment.id, preview)
              }
              handleCancel={() => {
                setActiveComment(null);

              }}
            />
          )}
          <div className="flex mb-10">
            {canReply && (
              <div
                className={`inline-block w-20 mr-10 h-8 text-xs leading-8 text-center text-black uppercase cursor-pointer rounded-xl bg-cyan-300 ${userId === '0' ? 'ml-auto' : ''}`}
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "replying" })
                }
              >
                Reply
              </div>
            )}
            {canEdit && (
              <div
                className="inline-block w-20 h-8 mr-10 text-xs leading-8 text-center text-black uppercase cursor-pointer rounded-xl bg-cyan-300"
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "editing" })
                }
              >
                Edit
              </div>
            )}
            {canDelete && (
              <div
                className="inline-block w-20 h-8 text-xs leading-8 text-center text-black uppercase cursor-pointer rounded-xl bg-cyan-300 "
                onClick={() => deleteComment(comment.id)}
              >
                Delete
              </div>
            )}
          </div>
          {isReplying && (
            <CommentForm
              submitLabel="Reply"
              handleSubmit={(text, preview) => {
                addComment(text, replyId, preview)
                // console.log(preview);
              }}

            />
          )}
          {replies.length > 0 && (
            <div className="">
              {replies.map((reply) => (
                <Comment
                  comment={reply}
                  key={reply.id}
                  setActiveComment={setActiveComment}
                  activeComment={activeComment}
                  updateComment={updateComment}
                  deleteComment={deleteComment}
                  addComment={addComment}
                  parentId={comment.id}
                  replies={[]}
                  currentUserId={currentUserId}
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
