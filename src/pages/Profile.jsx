import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    // navigate("/");
    window.location.reload(true)
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });

        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error("Something went wrong with update");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="flex flex-row">
        <h3 className="text-3xl basis-5/6">Profile </h3>
        <button className="btn btn-sm btn-secondary" onClick={onLogout}>
          Logout
        </button>
      </div>
      <main className="pt-5">
        <div className="flex flex-row">
          <p className="basis-5/6">Personal Details</p>
          <button
            className={
              changeDetails ? "btn btn-sm btn-success" : "btn btn-sm btn-info"
            }
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "done" : "change"}
          </button>
        </div>
        <div>
          <form>
            <div className="form-control">
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                id="name"
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
            </div>
            <div className="form-control">
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                id="email"
                disabled={true}
                value={email}
                onChange={onChange}
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
