import React, { useState, useEffect } from "react";
import { TbLetterSSmall, TbLetterLSmall, TbLetterMSmall } from "react-icons/tb";
import Slider from "./Slider";

const PlantDetails = () => {
  const [plantDetails, setPlantdetails] = useState([
    {
      name: "Calamondin Tree",
      size: { S: 2400, M: 3000, L: 4000 },
      category: "Outdoor",
      image: "/images/Outdoor/img3.jpeg",
      subImg: {
        subImg1: "/images/Outdoor/img3-1.jpeg",
        subImg2: "/images/Outdoor/img3-2.jpeg",
      },
      description:
        "We’re very excited to offer the delightful Calamondin tree. Native to the Philippines, the Calamondin (also known as Calamansi) produces an abundance of small, tart fruits .",
    },
  ]);
  const [selectedSize, setSelectedSize] = useState("S");
  const [price, setPrice] = useState(plantDetails[0].size.S);
  const [quantity, setQuantity] = useState(1);
  const [img, setImg] = useState(plantDetails[0].image);
  const handleSizeChange = (size) => {
    if (size === "S") {
      setSelectedSize("S");
      setPrice(plantDetails[0].size.S);
    } else if (size === "M") {
      setSelectedSize("M");
      setPrice(plantDetails[0].size.M);
    } else if (size === "L") {
      setSelectedSize("L");
      setPrice(plantDetails[0].size.L);
    }
  };
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("/plant.json")
      .then((res) => res.json())
      .then((data) => {
        const popular = data.filter((item) => item.hasOwnProperty("popular"));
        // console.log(popular);
        setPlants(popular);
      });
  }, []);
  return (
    <div className={`max-w-screen-2xl container mx-auto xl:px-24 pt-44 `}>
      <div className="flex">
        <div className={`w-1/2 flex gap-4  justify-center `}>
          <div className="flex flex-col gap-y-4 ">
            <div className="w-32  h-36 ">
              <img
                src={plantDetails[0].image}
                className={`w-32 h-36 object-contain-fit hover:cursor-pointer ${
                  img === plantDetails[0].image && "border-2 border-black"
                } `}
                onClick={() => setImg(plantDetails[0].image)}
              ></img>
            </div>
            {plantDetails[0].subImg?.subImg1 && (
              <div className="w-32  h-36 ">
                <img
                  src={plantDetails[0].subImg?.subImg1}
                  className={`w-32 h-36 object-contain-fit hover:cursor-pointer ${
                    img === plantDetails[0].subImg?.subImg1 &&
                    "border-2 border-black"
                  } `}
                  onClick={() => setImg(plantDetails[0].subImg?.subImg1)}
                ></img>
              </div>
            )}
            {plantDetails[0].subImg?.subImg2 && (
              <div className="w-32  h-36 ">
                <img
                  src={plantDetails[0].subImg?.subImg2}
                  className={`w-32 h-36 object-contain-fit hover:cursor-pointer ${
                    img === plantDetails[0].subImg?.subImg2 &&
                    "border-2 border-black"
                  } `}
                  onClick={() => setImg(plantDetails[0].subImg?.subImg2)}
                ></img>
              </div>
            )}
            {plantDetails[0].subImg?.subImg3 && (
              <div className="w-32  h-36 border-0">
                <img
                  src={plantDetails[0].subImg?.subImg3}
                  className={`w-32 h-36 object-contain-fit hover:cursor-pointer ${
                    img === plantDetails[0].subImg?.subImg3 &&
                    "border-2 border-black"
                  } `}
                  onClick={() => setImg(plantDetails[0].subImg?.subImg3)}
                ></img>
              </div>
            )}
          </div>
          <div className="w-78 h-fit bg-lightGreen">
            <img src={img} className="w-78 h-fit object-contain mx-auto"></img>
          </div>
        </div>
        <div className={`w-1/2 px-8  petrona`}>
          <div className="border-b border-grey pb-4">
            <h1 className="marcellus text-4xl font-normal mb-4">
              {plantDetails[0].name}
            </h1>
            <p className="text-xl text-lightGreen">Rs. {price} </p>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-lg">Size</h3>
            <div className="flex gap-4 justify-center items-center">
              <TbLetterSSmall
                className={`border-2 rounded-sm h-9 w-9 bg-grey  hover:cursor-pointer ${
                  selectedSize === "S" ? "border-black" : "border-grey"
                }`}
                color="white"
                onClick={() => handleSizeChange("S")}
              />
              {plantDetails[0].size.M && (
                <TbLetterMSmall
                  className={`border-2 rounded-sm h-9 w-9 bg-grey hover:cursor-pointer ${
                    selectedSize === "M" ? "border-black" : "border-grey"
                  }`}
                  color="white"
                  onClick={() => handleSizeChange("M")}
                />
              )}
              {plantDetails[0].size.L && (
                <TbLetterLSmall
                  className={`border-2 rounded-sm h-9 w-9 bg-grey hover:cursor-pointer ${
                    selectedSize === "L" ? "border-black" : "border-grey"
                  }`}
                  color="white"
                  onClick={() => handleSizeChange("L")}
                />
              )}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-lg mb-[3px]">Description</h3>
            <p className="text-justify text-grey">
              {plantDetails[0].description}
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-lg">Quantity</h3>
            <div className="join flex justify-center items-center">
              <button
                className={`join-item btn btn-square px-8 text-xl hover:bg-[#99EDC3]`}
                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              >
                -
              </button>
              <div
                className={`join-item bg-slate-200 btn-square px-12 text-center pt-2 text-xl `}
              >
                {quantity}
              </div>

              <button
                className={`join-item btn btn-square px-8 text-xl hover:bg-[#99EDC3]`}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <button
            className={`btn  text-green text-base bg-lightGreen  hover:bg-[#3cb371] hover:text-white outline-none border-0 w-full mt-8`}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="my-8">
        <h1 className="marcellus text-4xl font-md md:pl-8">You May Also Like</h1>
        <Slider items={plants}/>
      </div>
    </div>
  );
};

export default PlantDetails;
