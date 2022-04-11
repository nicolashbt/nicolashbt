import { Link } from "react-router-dom";
// import { AiFillDelete } from "react-icons/ai";
// import { AiFillEdit } from "react-icons/ai";

function ListingItem({ listing, id }) {
  return (
    <Link to={`/category/${listing.type}/${id}`}>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={listing.imageUrls[0]} alt={listing.name} className='h-30'/>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{listing.name}</h2>
          <p>{listing.description}</p>
          <div className="card-actions justify-end">
            <p className="badge badge-primary">{listing.price} €</p>
            <div className="badge badge-outline">{listing.type}</div>
            <div className="badge badge-outline">{listing.category}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingItem;
