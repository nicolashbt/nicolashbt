function About() {
  return (
    <div className="">
      <div className="">
        <h3 className="text-3xl">About</h3>
        <p className="py-1">
          To make this application, I used React.JS, Tailwind css and Daisy UI
          and firebase for the backend. The source code is&nbsp;
          <a
            className="link"
            href="https://github.com/nicolashbt/nicolashbt"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
        <p className="py-1">
          You may be wondering why I didn't make the backend of this app. The
          reason is simple, I want to have a live version of this project and
          hosting a .NET backend can get quite expensive.
        </p>

        <p className="py-1">
          You can have a look at my other project with a fully functional REST
          API. The source code is&nbsp;
          <a
            className="link"
            href="https://github.com/nicolashbt/musium"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default About;
