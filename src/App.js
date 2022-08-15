import Comments from "./comments/Comments";

const App = () => {
  return (
    <div className="pt-8 pb-16 bg-gradient-to-r from-teal-900 to-cyan-500">
      <div className="container pt-4 pb-16 mx-auto font-bold text-white border border-white ">
        <h1 className="text-3xl text-center">Comment Box</h1>
        <Comments
          commentsUrl="http://localhost:3004/comments"
          currentUserId="0"
        />
      </div>
    </div>
  );
};

export default App;
