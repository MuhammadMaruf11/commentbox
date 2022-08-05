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
  // const date = new Date();
  // const time = date.getTime();
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  return (
    <div>
      <div key={comment.id} className=" mx-auto w-[90%]">
        <div className={'mb-4  flex flex-wrap items-center' + replyId === parentId ? `justify-start`:`justify-end`}>
          <img className="rounded-full w-8 h-8 mr-4" src="/user-icon.png" />
          <div className="inline-block text-sm">{comment.username}</div>
          <div className="ml-4 text-xs">{createdAt}</div>
        </div>
        <div className="mb-8">
          {!isEditing && <div className="w-auto h-auto text-xs break-all mb-4"><p>{comment.body} </p></div>}
          {isEditing && (
            <CommentForm
              submitLabel="Update"
              hasCancelButton
              initialText={comment.body}
              handleSubmit={(text) => updateComment(text, comment.id)}
              handleCancel={() => {
                setActiveComment(null);
              }}
            />
          )}
          <div className="flex mb-10">
            {canReply && (
              <div
                className="mr-20 cursor-pointer w-20 rounded-xl h-8 text-black leading-8 text-xs uppercase text-center bg-cyan-300 inline-block"
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "replying" })
                }
              >
                Reply
              </div>
            )}
            {canEdit && (
              <div
                className="inline-block mr-20  cursor-pointer w-20 rounded-xl h-8 leading-8 text-xs uppercase text-center text-black bg-cyan-300"
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "editing" })
                }
              >
                Edit
              </div>
            )}
            {canDelete && (
              <div
                className="inline-block  cursor-pointer w-20 rounded-xl h-8 leading-8 text-xs uppercase text-center text-black bg-cyan-300 "
                onClick={() => deleteComment(comment.id)}
              >
                Delete
              </div>
            )}
          </div>
          {isReplying && (
            <CommentForm
              submitLabel="Reply"
              handleSubmit={(text) => addComment(text, replyId)}
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
