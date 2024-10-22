import React from "react";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <div className="card bg-base-100 w-72 shadow-xl ">
      <Link to={`/plant/${item._id}`}>
        <figure>
          <img
            src={item.image}
            className={`hover:scale-105 transition-all duration-300 md:h-72 object-cover`}
          />
        </figure>
      </Link>
      <div className="card-body petrona ">
        <div className="mx-auto"><h2 className="card-title ">{item.name}</h2>
        <p className={`text-grey text-center`}>Rs. {item.size?.S}/- only</p></div>
        <div className="card-actions bg-slate-400">
          <button className={`btn  text-green text-base bg-lightGreen  hover:bg-[#3cb371] hover:text-white outline-none border-0 w-full`}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;

