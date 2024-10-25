import React from "react";
import { Link } from "react-router-dom";

const Card = ({ item, url }) => {
  return (
    <div className="card bg-base-100 w-72 shadow-xl ">
      <Link to={`/${url}/${item._id}`}>
        <figure>
          <img
            src={item.image}
            className={`hover:scale-105 transition-all duration-300 md:h-72 object-cover`}
          />
        </figure>
      </Link>
      <div className="card-body petrona mx-auto">
        <h2 className="card-title ">{item.name}</h2>
        <p className={`text-grey mx-auto`}>Rs. {item.price || item.size?.S}/- only</p>
      </div>
    </div>
  );
};

export default Card;
