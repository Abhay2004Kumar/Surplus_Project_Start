import { v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv"
dotenv.config()

import fs from "fs"

 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY, 
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadCloudinary = async (localFilePath) => {
  try {
      if (!localFilePath) return null;
      console.log('Uploading file to Cloudinary:', localFilePath);
      
      const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto"
      });

      console.log('Cloudinary upload response:', response);

      fs.unlinkSync(localFilePath); // Remove the local file after upload
      return response;
  } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
      fs.unlinkSync(localFilePath); // Remove the local file on error
      return null;
  }
};

const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
    try {
      const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
      console.log('Delete result:', result);
      return result;
    } catch (error) {
      console.error('Error deleting from Cloudinary:', error);
      throw error;
    }
  };



export {uploadCloudinary, deleteFromCloudinary}