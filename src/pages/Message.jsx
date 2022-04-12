import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Message() {
  const [message, setMessage] = useState("");
  const [seller, setSeller] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getSeller = async () => {
      const docRef = doc(db, "users", params.sellerId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSeller(docSnap.data());
      } else {
        toast.error("Could not find seller");
      }
    };

    getSeller();
  }, [params.sellerId]);

  const onChange = (e) => setMessage(e.target.value);

  return (
    <div className="max-w-sm m-auto">
      <header>
        <p className="text-3xl">Contact {seller?.name}</p>
      </header>
      {seller !== null && (
        <main className="">

          <form className="form-control">
            <div className="">
              <label htmlFor="message" className="label">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea textarea-bordered w-96"
                value={message}
                onChange={onChange}
              ></textarea>
            </div>

            <a
              href={`mailto:${seller.email}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button type="button" className="btn btn-primary">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Message;
