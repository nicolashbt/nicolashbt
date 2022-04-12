import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import ListingItem from "../../components/ListingItem";

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings");

        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };

    fetchListings();
  }, [params.categoryName]);

  return (
    <div>
      <header>
        <h3 className="text-3xl">
          {params.categoryName === "hardware" ? "Hardware" : "Software"}
        </h3>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <div className="grid lg:grid-cols-3 md:grid-cols-2">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                >
                  {listing.data.name}
                </ListingItem>
              ))}
            </div>
          </main>
        </>
      ) : (
        <p>Nothing for sale</p>
      )}
      <p></p>
    </div>
  );
}

export default Category;
