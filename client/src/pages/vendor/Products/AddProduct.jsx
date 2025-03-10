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
  const addProduct = (data) => {
    const formattedData = {
      name: data.plantName,
      category: data.plantCategory,
      description: data.plantDescription,
      size: {},
      stockQuantity: {},
    };

    const handleImageChange = (e, index) => {
      const file = e.target.files[0];
      if (file) {
        const newImages = [...images];
        newImages[index] = URL.createObjectURL(file);
        setImages(newImages);
      }
    };
    const [file, setFile] = useState();
    function handleChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
    }

    // Map through sizes and add only the checked ones
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
      <form className="" onSubmit={handleSubmit(addProduct)}>
        <label className="poppins font-semibold text-lg">Plant Name</label>
        <input
          type="text"
          placeholder="Enter your plant name here"
          {...register("plantName")}
          className="my-4 p-[10px] border border-lightGreen outline-none rounded-md bg-white mb-2 w-[100%]"
        ></input>
        <label className="poppins font-semibold text-lg">Plant Pictures</label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {images.map((image, index) => (
            <label key={index} className="relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                // onChange={handleImageChange(e, index)}
              />
              <div className="w-20 h-20 border rounded flex items-center justify-center bg-gray-100">
                {image ? (
                  <img
                    src={image}
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
          className="my-4 p-[10px] border border-lightGreen outline-none rounded-md bg-white mb-2 w-[100%]"
        >
          <option value="" disabled>
            Choose category from dropdown
          </option>
          <option value="HousePlants">House Plant</option>
          <option value="Orchid">Orchid</option>
          <option value="Outdoor">Outdoor</option>
        </select>
        <label className="poppins font-semibold text-lg">
          Plant Description
        </label>
        <textarea
          placeholder="Enter your plant’s description here"
          {...register("plantDescription")}
          className="my-4 p-[10px] border border-lightGreen outline-none rounded-md bg-white mb-2 w-[100%] h-56"
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
        <button
          className={`btn text-lg text-white bg-lightGreen border-0 hover:bg-lightestGreen xl:px-36 px-20`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
      <h2>Add Image:</h2>
      <input
        type="file"
        onChange={() => {
          console.log(e.target.files);
          setFile(URL.createObjectURL(e.target.files[0]));
        }}
      />
      <img src={file} />
    </div>
  );
};

export default AddProduct;
