function About() {
  return (
    <div>
      <h3 className="text-3xl">About</h3>
      <p>
        To make this application, I used React.JS, Tailwind css and Daisy UI and
        firebase for the backend. You may be wondering why I didn't make the
        backend of this app. The reason is simple, I wanted to have a live
        version of this project and hosting a .NET backend can get expensive. If
        you have a look at one of my back-ends: I have already made a fully
        functional REST API for a different project, you can find the code&nbsp;
        <a
          className="link"
          href="https://github.com/nicolashbt/musium"
          target="_blank"
        >
          here
        </a>
        .
      </p>
    </div>
  );
}

export default About;
