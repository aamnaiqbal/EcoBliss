import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPlant, updatePlant } from "../../../redux/slices/VendorPlantSlice";
const AddProduct = () => {
  const { id } = useSelector((state) => state.auth.vendorAuth);
  const vendorId = id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const existingProduct = location.state?.item;
  // console.log("existing Product ", existingProduct);
  const [selectedSizes, setSelectedSizes] = useState({
    S: !!existingProduct?.size?.S || false,
    M: !!existingProduct?.size?.M || false,
    L: !!existingProduct?.size?.L || false,
  });
  const [images, setImages] = useState([null, null, null, null]);
  const [imgPreview, setImgPreview] = useState([null, null, null, null]);
  const [updatedImg, setUpdatedImg] = useState({
    main: false,
    subImg1: false,
    subImg2: false,
    subImg3: false,
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      plantName: existingProduct?.name,
      plantCategory: existingProduct?.category,
      plantDescription: existingProduct?.description,
      S: selectedSizes.S,
      M: selectedSizes.M,
      L: selectedSizes.L,
      SPrice: existingProduct?.size?.S || "",
      MPrice: existingProduct?.size?.M || "",
      LPrice: existingProduct?.size?.L || "",
      SStock: existingProduct?.stockQuantity?.S || "",
      MStock: existingProduct?.stockQuantity?.M || "",
      LStock: existingProduct?.stockQuantity?.L || "",
    },
  });

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file; // Store actual file instead of URL
      setImages(newImages);
      //For preview
      const newImgPreview = [...imgPreview];
      newImgPreview[index] = URL.createObjectURL(file);
      setImgPreview(newImgPreview);
      //Track which image has been updated
      setUpdatedImg((prev) => ({
        ...prev,
        [index === 0 ? "main" : `subImg${index}`]: true,
      }));
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) => ({ ...prev, [size]: !prev[size] }));
  };

  const addProduct = (data) => {
    const formData = new FormData();

    formData.append("name", data.plantName);
    formData.append("category", data.plantCategory);
    formData.append("description", data.plantDescription);
    formData.append("vendorId", vendorId);
    formData.append("isOutOfStock", false);

    if (data.S) {
      formData.append("size[S]", data.SPrice);
      formData.append("stockQuantity[S]", data.SStock);
    }
    if (data.M) {
      formData.append("size[M]", data.MPrice);
      formData.append("stockQuantity[M]", data.MStock);
    }
    if (data.L) {
      formData.append("size[L]", data.LPrice);
      formData.append("stockQuantity[L]", data.LStock);
    }
    images.forEach((image, index) => {
      if (image) {
        formData.append(`images`, image);
      }
    });

    // console.log([...formData]);

    if (existingProduct?._id) {
      formData.append("updatedImages", JSON.stringify(updatedImg));
      // console.log([...formData]);
      dispatch(updatePlant({ plantId: existingProduct._id, formData }));
      navigate(`/vendor/products/view`);
    } else {
      // console.log("Plant added");
      dispatch(addPlant(formData));
      navigate(`/vendor/products/view`);
    }
  };

  useEffect(() => {
    if (existingProduct) {
      //Top image preview
      const topImg = existingProduct.image ? [existingProduct.image] : [];
      //subImg preview filtering out null values
      const subImgs = Object.values(existingProduct.subImg || {}).filter(
        (img) => img
      );
      setImgPreview([...topImg, ...subImgs]);
      // console.log(imgPreview);
    }
  }, [existingProduct]);
  return (
    <div className="bg-white mb-12 mt-32  mx-8 p-8 rounded-xl">
      <form className="flex flex-col" onSubmit={handleSubmit(addProduct)}>
        <label className="poppins font-semibold text-lg">Plant Name</label>
        <input
          type="text"
          placeholder="Enter your plant name here"
          {...register("plantName")}
          className="my-4 p-[10px] border border-lightGreen outline-none rounded-md bg-white mb-2 w-full md:w-3/4 lg:w-1/2 mx-auto"
        ></input>
        <label className="poppins font-semibold text-lg">Plant Pictures</label>

        {/* Top Image */}
        <div className="flex justify-center my-4">
          <label className="relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(0, e)}
            />
            <div className="w-52 h-64 border rounded flex items-center justify-center bg-gray-100">
              {imgPreview[0] ? (
                <img
                  src={imgPreview[0]}
                  alt="Selected"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                "+"
              )}
            </div>
          </label>
        </div>

        {/* Three Images in a Row */}
        <div className="grid grid-cols-3 gap-2 my-4">
          {[1, 2, 3].map((index) => (
            <label key={index} className="relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(index, e)}
              />
              <div className="w-52 h-64 border rounded flex items-center justify-center bg-gray-100">
                {imgPreview[index] ? (
                  <img
                    src={imgPreview[index]}
                    alt="Selected"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  "+"
                )}
              </div>
            </label>
          ))}
        </div>

        <label className="poppins font-semibold text-lg">Plant Category</label>
        <select
          {...register("plantCategory")}
          className="my-4 p-[10px] border border-lightGreen outline-none rounded-md bg-white mb-2 w-full md:w-3/4 lg:w-1/2 mx-auto"
          defaultValue={""}
        >
          <option value="" disabled>
            Choose category from dropdown
          </option>
          <option value="HousePlants">House Plant</option>
          <option value="Orchid">Orchid</option>
          <option value="Outdoor">Outdoor</option>
        </select>
        <label className="poppins font-semibold text-lg ">
          Plant Description
        </label>
        <textarea
          placeholder="Enter your plant’s description here"
          {...register("plantDescription")}
          className="my-4 p-[10px] border border-lightGreen outline-none rounded-md bg-white mb-2 w-[100%] h-56 w-full md:w-3/4  mx-auto"
        ></textarea>

        <table className="w-full text-black poppins">
          <tbody>
            <tr className="border-b">
              <td className="text-left p-6">
                <label className="font-semibold text-lg">Sizes</label>
              </td>
              {["S", "M", "L"].map((size) => (
                <td key={size} className="text-center text-lg p-6">
                  <div className="flex items-center justify-center gap-x-2">
                    <input
                      type="checkbox"
                      {...register(size)}
                      onChange={() => handleSizeChange(size)}
                    />
                    <span>
                      {size === "S"
                        ? "Small"
                        : size === "M"
                        ? "Medium"
                        : "Large"}
                    </span>
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-6">
                <span className="font-semibold text-lg">Prices (Rs)</span>
              </td>
              {["S", "M", "L"].map((size) => (
                <td key={size} className="text-center text-lg p-6">
                  <input
                    type="text"
                    {...register(`${size}Price`)}
                    disabled={!selectedSizes[size]}
                    className={`my-4 p-[10px] border ${
                      selectedSizes[size] ? "border-lightGreen" : "border-grey"
                    } outline-none rounded-md bg-white mb-2 w-[50%]`}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6">
                <span className="font-semibold text-lg">Stock Quantity</span>
              </td>
              {["S", "M", "L"].map((size) => (
                <td key={size} className="text-center text-lg p-6">
                  <input
                    type="text"
                    {...register(`${size}Stock`)}
                    disabled={!selectedSizes[size]}
                    className={`my-4 p-[10px] border ${
                      selectedSizes[size] ? "border-lightGreen" : "border-grey"
                    } outline-none rounded-md bg-white mb-2 w-[50%]`}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-center">
          {existingProduct ? (
            <button
              className={`btn text-lg text-white bg-lightGreen border-0 hover:bg-lightestGreen xl:px-36 px-20 w-full md:w-3/4 lg:w-1/2 `}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Product"}
            </button>
          ) : (
            <button
              className={`btn text-lg text-white bg-lightGreen border-0 hover:bg-lightestGreen xl:px-36 px-20 w-full md:w-3/4 lg:w-1/2 `}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
