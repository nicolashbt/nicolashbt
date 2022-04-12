import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase.config";
import Spinner from "../../components/Spinner";
import { AiOutlineShareAlt } from "react-icons/ai";
import { toast } from "react-toastify";

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  const dateListing = () => {
    let dt = listing.timestamp.toDate();
    return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
  };

  return (
    <div className="card max-w-xl m-auto bg-base-200 shadow-xl">
      <figure>
        <img src={listing.imageUrls[0]} alt={listing.name} className="h-30" />
      </figure>
      <div className="card-body">
        <div className="flex flex-row">
          <h2 className="card-title">{listing.name}</h2>
          <div
            className=""
            onClick={() => {
              toast.info("Link copied");
              navigator.clipboard.writeText(window.location.href);
            }}
          >
            <AiOutlineShareAlt className="w-10 h-5" />
          </div>
        </div>
        <p>{listing.description}</p>
        <div>
          <div className="card-actions">
            <div className="badge badge-primary px-5">{listing.price} €</div>
            <div className="badge badge-outline">{listing.type}</div>
            <div className="badge badge-outline">{listing.category}</div>
            <div className="badge badge-outline badge-accent">
              {listing.handDelivered ? "pickup" : "shipped"}
            </div>
          </div>
          <p>Location: {listing.location}</p>
          <p>Created on: {dateListing()}</p>
          <div className="mt-5">
            {auth.currentUser?.uid !== listing.userRef && (
              <Link
                to={`/dm/${listing.userRef}?listingName=${listing.name}`}
                className="btn btn-secondary btn-sm"
              >
                Contact seller
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;
