import dotenv from "dotenv";
import cloudinary from "cloudinary";

dotenv.config();

const configCloudynary = () => {
  cloudinary.config({
    cloud_name:"caokhahieu",
    api_key: "881165443171997",
    api_secret:"IOIQP1_BMFFIUgJRY3dKHZRGf4Y"
  });
};

export default configCloudynary;
