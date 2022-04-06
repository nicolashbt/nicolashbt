function Home() {
  return (
    <div>
      <div className="mx-auto">
        <h3 className="text-3xl">Home</h3>
        <div className="py-1">
          Welcome to my website, I started this project for a few reasons:
          <ol className="list-decimal list-inside">
            <li>I want to improve my skills with React and Javascript</li>
            <li>I want to keep coding while I'm looking for a job</li>
            <li>I want to show my future employers what I can do</li>
          </ol>
        </div>
        <div className="py-1">
          On this website, you can find a few pages:
          <ul className="list-disc list-inside">
            <li>A home page which you are on right now.</li>
            <li>
              A marketplace where you can add and consult ads for music equipement
            </li>
            <li>A contact page in case you want to get in touch</li>
            <li>An about page showing the code, the technologies used, etc.</li>
            <li>
              Authentication pages if you want to try all the features of the
              marketplace
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
