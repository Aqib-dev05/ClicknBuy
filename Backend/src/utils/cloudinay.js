import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Lazy initialization - config when used, not on import
let isConfigured = false;

const ensureConfigured = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  isConfigured = true;
};

const uploadOnCloudinary = async (localFilePath, folderName) => {
  ensureConfigured();
  try {
    if (!localFilePath) return null;


    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: `/Ecommerce_Plateform/${folderName}`, //cloudinary folder name
    });
    // file has been uploaded successfull
    console.log("file is uploaded on cloudinary ", response.secure_url);
    await fs.promises.unlink(localFilePath);
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    if (fs.existsSync(localFilePath)) {
    await fs.promises.unlink(localFilePath);
     
    }
    throw error; // Throw error instead of returning null
  }
};

const deleteFromCloudinary = async (public_id) => {
  try {
    if (!public_id) return null;

    // Ensure Cloudinary is configured before delete
    ensureConfigured();

    // Delete the file from Cloudinary
    const response = await cloudinary.uploader.destroy(public_id);
    console.log("File deleted from Cloudinary:", public_id);
    return response;
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
    throw error;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
