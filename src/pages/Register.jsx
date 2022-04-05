import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

function Register() {
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h3 className="text-3xl font-bold">New account</h3>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
            <div>
              <Link to="/login" className="link link-secondary">
                Login Instead
                <FaAngleRight className="inline" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
