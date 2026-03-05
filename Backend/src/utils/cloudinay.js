import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

// Lazy initialization - config when used, not on import
let isConfigured = false;

const ensureConfigured = () => {
  if (!isConfigured) {
    console.log("Configuring Cloudinary with:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? "***" : "NOT SET",
      api_secret: process.env.CLOUDINARY_API_SECRET ? "***" : "NOT SET"
    });
    
    cloudinary.config({ 
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
      api_key: process.env.CLOUDINARY_API_KEY, 
      api_secret: process.env.CLOUDINARY_API_SECRET 
    });
    isConfigured = true;
  }
};

const uploadOnCloudinary = async (localFilePath,folderName) => {
  try {
      if (!localFilePath) return null
      
      // Ensure Cloudinary is configured before upload
      ensureConfigured();
      
      //upload the file on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto",
          folder: `/Ecommerce_Plateform/${folderName}`  //cloudinary folder name
      })
      // file has been uploaded successfull
      console.log("file is uploaded on cloudinary ", response.secure_url);
      fs.unlinkSync(localFilePath)
      return response;

  } catch (error) {
      console.error("Cloudinary upload error:", error.message);
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
      }
      throw error; // Throw error instead of returning null
  }
}



export {uploadOnCloudinary}
