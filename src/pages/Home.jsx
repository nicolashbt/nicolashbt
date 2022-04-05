function Home() {
  return (
    <div>
      <h3 className="text-3xl">Home</h3>
      <p>Welcome to my website, I started this project for a few reasons:</p>
      <ol className="list-decimal list-inside bg-base-200">
        <li>I want to improve my skills with React and Javascript</li>
        <li>I want to keep coding while I'm doing interviews</li>
        <li>I want to show my future employers what I can do</li>
      </ol>
      <p>On this website, you can find a few pages. There is:</p>
      <ul className="list-disc list-inside bg-base-200">
        <li>A home page which you are on right now.</li>
        <li>A marketplace, a listing of ads for musicians</li>
        <li>A contact page in case you want to get in touch</li>
        <li>An about page showing the code, the technologies used, etc.</li>
        <li>
          Authentication pages if you want to try all the features of the
          marketplace
        </li>
      </ul>
    </div>
  );
}

export default Home;
