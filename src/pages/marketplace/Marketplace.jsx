import { Link } from "react-router-dom";
import hardwareCategoryImage from "../../assets/hardwareSynth.avif";
import softwareCategoryImage from "../../assets/softwareSynth.avif";

function Marketplace() {
  return (
    <div>
      <div className="mb-5 flex justify-between">
        <h3 className="text-3xl">Categories</h3>
        <Link to="/create-listing">
          <button className="btn btn-primary btn-sm">Create listing</button>
        </Link>
      </div>
      <Link to="/category/hardware">
        <div
          className="hero h-40 rounded-t-lg"
          style={{ backgroundImage: `url(${hardwareCategoryImage})` }}
        >
          <div className="hero-overlay bg-opacity-60 h-2/5"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hardware</h1>
            </div>
          </div>
        </div>
      </Link>

      <Link to="/category/software">
        <div
          className="hero h-40 rounded-b-lg"
          style={{ backgroundImage: `url(${softwareCategoryImage})` }}
        >
          <div className="hero-overlay bg-opacity-60 h-2/5"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Software</h1>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Marketplace;
