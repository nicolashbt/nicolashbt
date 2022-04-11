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
    used: true,
    images: {},
    latitude: 0,
    longitude: 0,
  });

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

  return <div>CreateListing</div>;
}

export default CreateListing;
