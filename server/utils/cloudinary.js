const { v2 } = require("cloudinary");
const cloudinary = v2;
const fs = require("fs");
const uploadOnCloudinary = async (localFilePath) => {
  //configuration
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
    //   uploadResult
    //  );
    return uploadResult;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation got failed.
    return null;
  }
};

module.exports = uploadOnCloudinary;
