import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//configuration

export const uploadOnCloudinary = async (localFilePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    if (!localFilePath) {
      return null;
    }
    //upload file on cloudinary
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    // console.log(
    //   "Image is successfuly uploaded on the cloudinary",
    //   uploadResult.url
    // );
    return uploadResult;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation got failed.
    return null;
  }
};

export const deleteFromCloudinary = async (publicIds) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    if (!publicIds || publicIds.length === 0) {
      return null;
    }
    const result = await cloudinary.api.delete_resources(publicIds);
    // console.log("Cloudinary Delete Response:", result);
    return result;
  } catch (error) {
    console.error("Error deleting images from Cloudinary:", error);
    return null;
  }
};
