import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ImMail4 } from "react-icons/im";

function Contact() {
  return (
    <div className="m-auto max-w-4xl">
      <h3 className="text-3xl">Contact</h3>
      <p>
        I'm Nicolas Hennebert, I come from and currently live in Belgium. I
        started programming in September 2021. I followed an intensive training
        at Technofutur TIC. I learned all the technologies needed to become a
        Full Stack .NET developer with Angular. After some time spent looking at
        job ads and talking to fellow developers, I decided to learn JavaScript
        and React.
      </p>
      <div>
        <ul>
          <li>
            <a
              href="mailto:nicolas.hbt@protonmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-sm btn-ghost">
                <ImMail4 className="inline text-xl" />
                &nbsp;nicolas.hbt@protonmail.com
              </button>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/nicolashbt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-sm btn-ghost">
                <FaGithub className="inline text-xl" />
                &nbsp;/nicolashbt
              </button>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/nicolashbt/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-sm btn-ghost">
                <FaLinkedin className="inline text-xl" />
                &nbsp;/nicolashbt
              </button>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Contact;
