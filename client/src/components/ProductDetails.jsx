import React, { useState, useEffect, useContext } from "react";
import { TbLetterSSmall, TbLetterLSmall, TbLetterMSmall } from "react-icons/tb";
import Slider from "./Slider";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { PlantCareContext } from "../store/plantCareContext";
import { PlantContext } from "../store/PlantContext";
import { CartContext } from "../store/CartContext";
import { AuthContext } from "../store/AuthContext";

const productDetails = () => {
  const {plantCareProducts}=useContext(PlantCareContext);
  const {orchidPlants, housePlants, outdoorPlants}=useContext(PlantContext);
  const {addToCart}= useContext(CartContext)
  const { auth } = useContext(AuthContext);

  let [category, setCategory] = useState([]);
  const { pathname } = useLocation();
  const productType= pathname.includes('plantcare')? 'PlantCare': 'Plant'

  const { id } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [price, setPrice] = useState(
    productDetails.size?.S || (productDetails.price && productDetails.price)
  );
  const [quantity, setQuantity] = useState(1);
  const [img, setImg] = useState(productDetails.image);

  const handleSizeChange = (size) => {
    if (size === "S") {
      setSelectedSize("S");
      setPrice(productDetails.size.S);
    } else if (size === "M") {
      setSelectedSize("M");
      setPrice(productDetails.size.M);
    } else if (size === "L") {
      setSelectedSize("L");
      setPrice(productDetails.size.L);
    }
  };

  useEffect(()=>{
    console.log("Hello")
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (pathname.includes("plantcare")) {
          res = await axios.get(`http://localhost:8000/api/v1/plantcare/${id}`);
          setProductDetails(res.data.data.product);
        } else {
          res = await axios.get(`http://localhost:8000/api/v1/plant/${id}`);
          setProductDetails(res.data.data.plant);
        }
      } catch (err) {
        console.log("There is some error fetching the data", err);
      }
    };
    fetchData();
    
    
  }, [id, pathname]);
  // console.log(productDetails)
  useEffect(()=>{
    if(pathname.includes("Outdoor")) setCategory(outdoorPlants)
    else if(pathname.includes('Orchid')) setCategory(orchidPlants)
    else if(pathname.includes("Houseplants")) setCategory(housePlants)
    else setCategory(plantCareProducts)
  }, [pathname, outdoorPlants, orchidPlants, housePlants, plantCareProducts])

  useEffect(() => {
    if (productDetails) {
      setPrice(
        productDetails.size?.S || (productDetails.price && productDetails.price)
      );
      setImg(productDetails.image)
      setSelectedSize(productDetails.size && "S");
      console.log("product Details", productDetails)
    }
  }, [productDetails]);
  return (
    <div className={`max-w-screen-2xl container mx-auto xl:px-24 pt-44 `}>
      <div className="flex">
        <div className={`w-1/2 flex gap-4  justify-center `}>
          <div className="flex flex-col gap-y-4 ">
            <div className="w-32  h-36 ">
              <img
                src={productDetails.image}
                className={`w-32 h-36 object-contain-fit hover:cursor-pointer ${
                  img === productDetails.image && "border-2 border-black"
                } `}
                onClick={() => setImg(productDetails.image)}
              ></img>
            </div>
            {productDetails.subImg?.subImg1 && (
              <div className="w-32  h-36 ">
                <img
                  src={productDetails.subImg?.subImg1}
                  className={`w-32 h-36 object-contain-fit hover:cursor-pointer ${
                    img === productDetails.subImg?.subImg1 &&
                    "border-2 border-black"
                  } `}
                  onClick={() => setImg(productDetails.subImg?.subImg1)}
                ></img>
              </div>
            )}
            {productDetails.subImg?.subImg2 && (
              <div className="w-32  h-36 ">
                <img
                  src={productDetails.subImg?.subImg2}
                  className={`w-32 h-36 object-contain-fit hover:cursor-pointer ${
                    img === productDetails.subImg?.subImg2 &&
                    "border-2 border-black"
                  } `}
                  onClick={() => setImg(productDetails.subImg?.subImg2)}
                ></img>
              </div>
            )}
            {productDetails.subImg?.subImg3 && (
              <div className="w-32  h-36 border-0">
                <img
                  src={productDetails.subImg?.subImg3}
                  className={`w-32 h-36 object-contain-fit hover:cursor-pointer ${
                    img === productDetails.subImg?.subImg3 &&
                    "border-2 border-black"
                  } `}
                  onClick={() => setImg(productDetails.subImg?.subImg3)}
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
              {productDetails.name}
            </h1>
            <p className="text-xl text-lightGreen">Rs. {price} </p>
          </div>
          <div className="mt-4">
            {productDetails.size && <h3 className="text-2xl font-lg">Size</h3>}
            <div className="flex gap-4 justify-center items-center">
              {productDetails.size?.S && (
                <TbLetterSSmall
                  className={`border-2 rounded-sm h-9 w-9 bg-grey  hover:cursor-pointer ${
                    selectedSize === "S" ? "border-black" : "border-grey"
                  }`}
                  color="white"
                  onClick={() => handleSizeChange("S")}
                />
              )}
              {productDetails.size?.M && (
                <TbLetterMSmall
                  className={`border-2 rounded-sm h-9 w-9 bg-grey hover:cursor-pointer ${
                    selectedSize === "M" ? "border-black" : "border-grey"
                  }`}
                  color="white"
                  onClick={() => handleSizeChange("M")}
                />
              )}
              {productDetails.size?.L && (
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
              {productDetails.description}
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
            onClick={()=>addToCart(auth.id, productDetails._id, productType, quantity, selectedSize, productDetails.image, productDetails.name,productDetails.size,  productDetails.price )}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="my-8">
        <h1 className="marcellus text-4xl font-md md:pl-8">
          You May Also Like
        </h1>
        <Slider items={category} url={pathname.includes('plantcare')? "plantcare": category[0]?.category}/>
      </div>
    </div>
  );
};

export default productDetails;
