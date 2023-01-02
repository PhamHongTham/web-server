import dotenv from "dotenv";
import cloudinary from "cloudinary";

dotenv.config();

const configCloudynary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const uploadImage = async (path) => {
  try {
    const data = await cloudinary.uploader.upload(path, {
      folder: "Boogle",
    });
  
    return data.secure_url;
  } catch (error) {
    return {
      code: 400,
      message: 'Server Error'
    }
  }
};

export default configCloudynary;
