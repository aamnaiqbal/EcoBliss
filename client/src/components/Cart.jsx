import React from "react";

const Cart = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-16 pt-44">
      <h2 className="marcellus text-3xl font-md">Cart</h2>
      <div className="">
        <div
          className={`flex items-center justify-between my-8 border-b border-[#76767642]`}
        >
          <img src="/images/Orchid/img8.jpg" className="max-h-40 w-36"></img>
          <h4>Pink Watercolor Orchid</h4>
          <p>Rs. 3000</p>
          <div className="join flex ">
            <button
              className={`join-item btn btn-square px-8 text-xl hover:bg-[#99EDC3]`}
              onClick={() => setQuantity(Math.max(quantity - 1, 1))}
            >
              -
            </button>
            <div
              className={`join-item bg-slate-200 btn-square px-12 text-center pt-2 text-xl `}
            >
              {/* {quantity} */}1
            </div>

            <button
              className={`join-item btn btn-square px-8 text-xl hover:bg-[#99EDC3]`}
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between my-8 border-b border-[#76767642]">
          <img src="/images/Outdoor/img6.jpeg" className="max-h-40 w-36"></img>
          <h4>Pink Watercolor Orchid</h4>
          <p>Rs. 3000</p>
          <div className="join flex ">
            <button
              className={`join-item btn btn-square px-8 text-xl hover:bg-[#99EDC3]`}
              onClick={() => setQuantity(Math.max(quantity - 1, 1))}
            >
              -
            </button>
            <div
              className={`join-item bg-slate-200 btn-square px-12 text-center pt-2 text-xl `}
            >
              {/* {quantity} */}1
            </div>

            <button
              className={`join-item btn btn-square px-8 text-xl hover:bg-[#99EDC3]`}
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between my-8 border-b border-[#76767642]">
          <img src="/images/Outdoor/img4.jpeg" className="max-h-40 w-36"></img>
          <h4>Pink Watercolor Orchid</h4>
          <p>Rs. 3000</p>
          <div className="join flex ">
            <button
              className={`join-item btn btn-square px-8 text-xl hover:bg-[#99EDC3]`}
              onClick={() => setQuantity(Math.max(quantity - 1, 1))}
            >
              -
            </button>
            <div
              className={`join-item bg-slate-200 btn-square px-12 text-center pt-2 text-xl `}
            >
              {/* {quantity} */}1
            </div>

            <button
              className={`join-item btn btn-square px-8 text-xl hover:bg-[#99EDC3]`}
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="px-12">  
        <div className="flex justify-between petrona">
          <h4 className=" text-2xl font-md">Subtotal</h4>
          <p className="text-2xl font-md">Rs. 7000</p>
        </div>
        <button
            className={`btn  text-green text-lg bg-lightGreen  hover:bg-[#3cb371] hover:text-white outline-none border-0 w-full mt-8 `}
          >
            Check Out
          </button>
      </div>
    </div>
  );
};

export default Cart;
