import React, { useState } from "react";
import { useForm } from "react-hook-form";
const AddProduct = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const [selectedSizes, setSelectedSizes] = useState({
    S: false,
    M: false,
    L: false,
  });
  const [images, setImages] = useState([null, null, null, null]);
  const handleSizeChange = (size) => {
    setSelectedSizes((prev) => ({ ...prev, [size]: !prev[size] }));
  };
  // const [file, setFile] = useState();
  // function handleChange(e) {
  //   console.log(e.target.files);
  //   setFile(URL.createObjectURL(e.target.files[0]));
  // }

  const handleImageChange = (index, e) => {
    console.log(index);
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };
  const addProduct = (data) => {
    const formattedData = {
      name: data.plantName,
      category: data.plantCategory,
      description: data.plantDescription,
      size: {},
      stockQuantity: {},
      images,
    };

    if (data.S) {
      formattedData.size.S = Number(data.SPrice);
      formattedData.stockQuantity.S = Number(data.SStock);
    }
    if (data.M) {
      formattedData.size.M = Number(data.MPrice);
      formattedData.stockQuantity.M = Number(data.MStock);
    }
    if (data.L) {
      formattedData.size.L = Number(data.LPrice);
      formattedData.stockQuantity.L = Number(data.LStock);
    }

    console.log(formattedData);
  };
  return (
    <div className="bg-white my-16 mx-8 p-8 rounded-xl">
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
              {images[0] ? (
                <img
                  src={images[0]}
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
                {images[index] ? (
                  <img
                    src={images[index]}
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
          <button
            className={`btn text-lg text-white bg-lightGreen border-0 hover:bg-lightestGreen xl:px-36 px-20 w-full md:w-3/4 lg:w-1/2 `}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
