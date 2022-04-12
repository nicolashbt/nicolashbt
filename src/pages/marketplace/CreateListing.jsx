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

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (images > 5) {
      setLoading(false);
      toast.error("max 3 images");
      return;
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Images could not be uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imageUrls,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.images;

    const docRef = await addDoc(collection(db, "listings"), formDataCopy);

    setLoading(false);
    toast.success("Listing saved");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
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

            <label className="label">Category </label>
            <input
              type="text"
              placeholder="sampler, synth..."
              className="input input-bordered w-full"
              id="category"
              onChange={onMutate}
              maxLength="32"
              minLength="3"
              value={category}
              required
            />

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
            <p className="">The first image will be the cover (max 3).</p>
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

          <div>
            {loading ? (
              <button className="btn btn-primary loading">Loading...</button>
            ) : (
              <button className="btn btn-primary mt-6">Create Listing</button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateListing;
