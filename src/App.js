import Comments from "./comments/Comments";

const App = () => {
  return (
    <div className="bg-gradient-to-r pt-8 pb-16 from-teal-900 to-cyan-500">
      <div className="container border border-white mx-auto pb-16 text-white pt-4 font-bold ">
        <h1 className="text-center text-3xl">Comment Box</h1>
        <Comments
          commentsUrl="http://localhost:3004/comments"
          currentUserId="1"
        />
      </div>
    </div>
  );
};

export default App;
