let comments = [
    {
      id: "1",
      image: null,
      body: "First comment",
      username: "Jack",
      userId: "1",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
      replies : [
        {
          id: "1",
          image: null,
          body: "First comment first child",
          username: "Queen",
          userId: "2",
          parentId: "1",
          createdAt: "2021-08-16T23:00:33.010+02:00",
          replies : null
        }
      ]
    },
    {
      id: "2",
      image: null,
      body: "Second comment",
      username: "King",
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
      replies : [
        {
          id: "2",
          image: 'data:image/png;base64,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',
          body: "Second comment second child",
          username: "Ace",
          userId: "4",
          parentId: "2",
          createdAt: "2021-08-16T23:00:33.010+02:00",
          replies : null
        }
      ]
    }
  ];


export const getComments = async () => {
  return comments;
};

export const createComment = async (text, image = null, parentId = null) => {
  const newComment = {
    id: Math.random().toString(36).substr(2, 9),
    image: image,
    body: text,
    parentId,
    userId: "0",
    username: "Me",
    createdAt: new Date().toISOString(),
    replies : !parentId ? [] : null
  };

  if(parentId){
    let parentIndex = comments.findIndex((cmnt) => cmnt.id == parentId);
    comments[parentIndex].replies.push(newComment);
    return comments;
  }

  comments = [...comments,newComment];
  return comments;

};

export const updateComment = async (text,image,commentId) => {
  let commentIndex = comments.findIndex((cmnt) => cmnt.id === commentId);
  comments[commentIndex].body = text;
  if(image){
    comments[commentIndex].image = image;
  }
  return comments;
};

export const deleteComment = async (type,commentId,replyId) => {
 
  if(type === 'comment') {
    comments = comments.filter((cmnt) => cmnt.id !== commentId );
  }else{
    let commentIndex = comments.findIndex((cmnt)=> cmnt.id === commentId);
    let replyIndex = comments[commentIndex].replies.findIndex((cmnt)=> cmnt.id === replyId);
    comments[commentIndex].replies.splice(replyIndex,1);
  }

  return comments;
};
