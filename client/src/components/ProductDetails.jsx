import React, { useState, useEffect, useContext } from "react";
import { TbLetterSSmall, TbLetterLSmall, TbLetterMSmall } from "react-icons/tb";
import Slider from "./Slider";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlantCareProducts } from "../redux/slices/PlantCareSlice";
import { addToCart } from "../redux/slices/CartSlice";
import { fetchPlants } from "../redux/slices/BuyerPlantSlice";
import { fetchProduct } from "../redux/slices/ProductSlice";

const productDetails = () => {
  const dispatch = useDispatch();
  const { plantCareProducts } = useSelector((state) => state.plantCare);
  const { orchidPlants, housePlants, outdoorPlants } = useSelector(
    (state) => state.buyerPlants
  );
  const auth = useSelector((state) => state.auth.userAuth);
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.product
  );

  let [category, setCategory] = useState([]);
  const { pathname } = useLocation();
  let productType = pathname.includes("plantcare") ? "PlantCare" : "Plant";

  const { id } = useParams();
  useEffect(() => {
    productType = pathname.includes("plantcare") ? "PlantCare" : "Plant";
    dispatch(fetchProduct({ id, type: productType }));
  }, [dispatch, id, pathname]);

  const [selectedSize, setSelectedSize] = useState(null);
  const [price, setPrice] = useState(
    selectedProduct?.size?.S ||
      (selectedProduct?.price && selectedProduct?.price)
  );
  const [quantity, setQuantity] = useState(1);
  const [img, setImg] = useState(selectedProduct?.image);

  const handleSizeChange = (size) => {
    if (size === "S") {
      setSelectedSize("S");
      setPrice(selectedProduct?.size.S);
      setQuantity(1);
    } else if (size === "M") {
      setSelectedSize("M");
      setPrice(selectedProduct?.size.M);
      setQuantity(1);
    } else if (size === "L") {
      setSelectedSize("L");
      setPrice(selectedProduct?.size.L);
      setQuantity(1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [img]);

  useEffect(() => {
    if (pathname.includes("plantcare")) {
      dispatch(fetchPlantCareProducts(id));
    } else {
      dispatch(fetchPlants(id));
    }
  }, [dispatch, id, pathname]);

  // console.log(selectedProduct?)
  useEffect(() => {
    if (pathname.includes("Outdoor")) setCategory(outdoorPlants);
    else if (pathname.includes("Orchid")) setCategory(orchidPlants);
    else if (pathname.includes("HousePlants")) setCategory(housePlants);
    else setCategory(plantCareProducts);
  }, [pathname, outdoorPlants, orchidPlants, housePlants, plantCareProducts]);

  useEffect(() => {
    if (selectedProduct) {
      setPrice(
        selectedProduct?.size?.S ||
          (selectedProduct?.price && selectedProduct?.price)
      );
      setImg(selectedProduct?.image);
      setSelectedSize(selectedProduct?.size && "S");
      setQuantity(1);
      // console.log("product Details", selectedProduct);
    }
  }, [selectedProduct]);
  return (
    <div
      className={`max-w-screen-2xl container mx-auto xl:px-24 md:px-16 px-4 lg:pt-48 pt-24 `}
    >
      <div className="flex flex-col lg:flex-row lg:gap-x-8">
        <div
          className={`lg:w-1/2 flex flex-col flex-col-reverse md:flex-row gap-4  justify-center items-center mx-auto md:justify-start md:items-start`}
        >
          <div className="flex flex-row flex-wrap lg:flex-col gap-x-4 gap-y-4 justify-center items-center mx-auto">
            <div className="w-32  h-32 ">
              <img
                src={selectedProduct?.image}
                className={`w-32 h-32 object-contain-fit hover:cursor-pointer ${
                  img === selectedProduct?.image && "border-2 border-black"
                } `}
                onClick={() => setImg(selectedProduct?.image)}
              ></img>
            </div>
            {selectedProduct?.subImg?.subImg1 && (
              <div className="w-32  h-32 ">
                <img
                  src={selectedProduct?.subImg?.subImg1}
                  className={`w-32 h-32 object-contain-fit hover:cursor-pointer ${
                    img === selectedProduct?.subImg?.subImg1 &&
                    "border-2 border-black"
                  } `}
                  onClick={() => setImg(selectedProduct?.subImg?.subImg1)}
                ></img>
              </div>
            )}
            {selectedProduct?.subImg?.subImg2 && (
              <div className="w-32  h-32 ">
                <img
                  src={selectedProduct?.subImg?.subImg2}
                  className={`w-32 h-32 object-contain-fit hover:cursor-pointer ${
                    img === selectedProduct?.subImg?.subImg2 &&
                    "border-2 border-black"
                  } `}
                  onClick={() => setImg(selectedProduct?.subImg?.subImg2)}
                ></img>
              </div>
            )}
            {selectedProduct?.subImg?.subImg3 && (
              <div className="w-32  h-32 border-0">
                <img
                  src={selectedProduct?.subImg?.subImg3}
                  className={`w-32 h-32 object-contain-fit hover:cursor-pointer ${
                    img === selectedProduct?.subImg?.subImg3 &&
                    "border-2 border-black"
                  } `}
                  onClick={() => setImg(selectedProduct?.subImg?.subImg3)}
                ></img>
              </div>
            )}
          </div>
          <div className="md:w-78 lg:h-fit h-96 ">
            <img
              src={img}
              className="md:w-78 lg:h-fit h-96 object-contain mx-auto"
            ></img>
          </div>
        </div>
        <div className={`lg:w-1/2  petrona `}>
          <div className="border-b border-grey py-4 ">
            <h1 className="marcellus text-4xl font-normal mb-4">
              {selectedProduct?.name}
            </h1>
            <p className="text-xl text-lightGreen">Rs. {price} </p>
          </div>
          <div className="mt-4">
            {selectedProduct?.size && (
              <h3 className="text-2xl font-lg">Size</h3>
            )}
            <div className="flex gap-4 justify-center items-center">
              {selectedProduct?.size?.S && (
                <TbLetterSSmall
                  className={`border-2 rounded-sm h-9 w-9 bg-grey  hover:cursor-pointer ${
                    selectedSize === "S" ? "border-black" : "border-grey"
                  }`}
                  color="white"
                  onClick={() => handleSizeChange("S")}
                />
              )}
              {selectedProduct?.size?.M && (
                <TbLetterMSmall
                  className={`border-2 rounded-sm h-9 w-9 bg-grey hover:cursor-pointer ${
                    selectedSize === "M" ? "border-black" : "border-grey"
                  }`}
                  color="white"
                  onClick={() => handleSizeChange("M")}
                />
              )}
              {selectedProduct?.size?.L && (
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
              {selectedProduct?.description}
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
            className={`btn  text-white text-base bg-lightGreen  hover:bg-lightestGreen hover:text-white outline-none border-0 w-full mt-8`}
            onClick={() =>
              dispatch(
                addToCart({
                  customerId: auth?.id,
                  vendorId: selectedProduct.vendorId,
                  productId: selectedProduct?._id,
                  productType,
                  quantity,
                  selectedSize,
                  image: selectedProduct?.image,
                  name: selectedProduct?.name,
                  size: selectedProduct?.size,
                  price: selectedProduct?.price,
                })
              )
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="my-8">
        <h1 className="marcellus text-4xl font-md md:pl-8">
          You May Also Like
        </h1>
        <Slider
          items={category}
          url={
            pathname.includes("plantcare") ? "plantcare" : category[0]?.category
          }
        />
      </div>
    </div>
  );
};

export default productDetails;
