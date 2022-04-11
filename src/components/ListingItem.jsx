import { Link } from "react-router-dom";

function ListingItem({ listing, id, onDelete }) {
  return (
    <Link to={`/category/${listing.type}/${id}`}>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={listing.imageUrls[0]} alt={listing.name} className="h-30" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{listing.name}</h2>
          <p>{listing.description}</p>
          <div className="card-actions justify-end">
            <p className="badge badge-primary">{listing.price} €</p>
            <div className="badge badge-outline">{listing.type}</div>
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
