import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ImMail4 } from "react-icons/im";

function Footer() {
  const footerYear = new Date().getFullYear();

  return (
    <footer className="footer text-primary-content footer-center bg-base-200 p-3">
      <div>
        <span>
          {footerYear} - Nicolas Hennebert &nbsp;
          <button className="btn btn-sm btn-ghost btn-circle">
            <a href="https://github.com/nicolashbt" target="_blank">
              <FaGithub className="inline text-xl" />
            </a>
          </button>
          <button className="btn btn-sm btn-ghost btn-circle">
            <a href="https://www.linkedin.com/in/nicolashbt/" target="_blank">
              <FaLinkedin className="inline text-xl" />
            </a>
          </button>
          <button className="btn btn-sm btn-ghost btn-circle">
            <a href="mailto:nicolas.hbt@protonmail.com" target="_blank">
              <ImMail4 className="inline text-xl" />
            </a>
          </button>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
