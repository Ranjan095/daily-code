import cloudinary from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  secure: true,
});

export const uploadOnCloudinary = async (localFilePath,folder_name) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary

    let callBack = (res) => {
      console.log(`image upload on cloudinary URL: ${res.url}`);
    };

    const response = await cloudinary.uploader.upload(localFilePath, callBack, {
      folder: `youtube_twitter/${folder_name}`,
      use_filename: true,
      resource_type: "auto",
    });
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};
