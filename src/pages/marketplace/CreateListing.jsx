import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../../components/Spinner";

function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "hardware",
    name: "",
    category: "",
    description: "",
    location: "",
    handDelivered: true,
    price: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    category,
    description,
    price,
    handDelivered,
    location,
    images,
    latitude,
    longitude,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/login");
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  if (loading) {
    return <Spinner />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const onMutate = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  return (
    <div className="">
      <header>
        <p className="text-3xl">Create a Listing (not yet functional)</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <div className="form-control w-full max-w-s">
            <label className="label">Name </label>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full"
              id="name"
              onChange={onMutate}
              maxLength="32"
              minLength="3"
              value={name}
              required
            />

            <label className="label mt-3">Type</label>
            <div className="btn-group">
              <button
                className={
                  type === "hardware" ? "btn btn-active btn-sm" : "btn btn-sm"
                }
                type="button"
                id="type"
                value={"hardware"}
                onClick={onMutate}
              >
                Hardware
              </button>
              <button
                className={
                  type === "software" ? "btn btn-active btn-sm" : "btn btn-sm"
                }
                type="button"
                id="type"
                value={"software"}
                onClick={onMutate}
              >
                Software
              </button>
            </div>

            <label className="label mt-3">Description</label>
            <textarea
              className="textarea"
              placeholder=""
              id="description"
              value={description}
              onChange={onMutate}
            ></textarea>

            <label className="label mt-3">Price</label>
            <input
              type="number"
              placeholder=""
              className="input input-bordered w-full max-w-xs"
              id="price"
              min="0.00"
              max="10000.00"
              step="0.01"
              onChange={onMutate}
              required
              value={price}
            />

            <label className="label mt-3">Location</label>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full"
              id="location"
              onChange={onMutate}
              maxLength="32"
              minLength="4"
              required
              value={location}
            />

            <label className="label mt-3">Pick up only</label>
            <div className="btn-group">
              <button
                className={
                  handDelivered === true
                    ? "btn btn-active btn-sm"
                    : "btn btn-sm"
                }
                type="button"
                id="handDelivered"
                value={"true"}
                onClick={onMutate}
              >
                Yes
              </button>
              <button
                className={
                  handDelivered === false
                    ? "btn btn-active btn-sm"
                    : "btn btn-sm"
                }
                type="button"
                id="handDelivered"
                value={"false"}
                onClick={onMutate}
              >
                No
              </button>
            </div>

            <label className="label mt-3">Images</label>
            <p className="">The first image will be the cover (max 5).</p>
            <input
              className="block w-full text-sm text-white
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-base-100 file:text-white
              hover:file:bg-primary"
              type="file"
              id="images"
              onChange={onMutate}
              max="6"
              accept=".jpg,.png,.jpeg"
              multiple
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mt-6">
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateListing;
