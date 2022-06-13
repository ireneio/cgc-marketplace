const Frame = () => {
  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center z-[100000]">
      <iframe
        src="https://solchicks-minigame-apr18.s3.us-west-2.amazonaws.com/index.html"
        frameBorder="0"
        width={600}
        height={600}
      ></iframe>
    </div>
  );
};

export default Frame;
