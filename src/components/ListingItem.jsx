import { Link } from "react-router-dom";

function ListingItem({ listing, id, onDelete }) {
  const desc = () => {
    const str = listing.description;
    return str.length > 90 ? str.substr(0, 80) + "..." : str;
  };

  return (
    <Link to={`/category/${listing.type}/${id}`}>
      <div className="card bg-base-200 shadow-xl m-3 h-96 w-72 hover:bg-base-300">
        <figure className="">
          <img src={listing.imageUrls[0]} alt={listing.name} className="h-44 w-80 object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{listing.name}</h2>
          <p className="">{desc()}</p>
          <div className="card-actions flex justify-between">
            <div className="badge badge-primary w-20">{listing.price} €</div>
            <div className="badge badge-outline">{listing.category}</div>
            {onDelete && (
              <div
                className="badge badge-error"
                onClick={() => {
                  onDelete(listing.id, listing.name);
                }}
              >
                Delete
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingItem;
