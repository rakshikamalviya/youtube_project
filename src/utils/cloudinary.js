import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("api key ",process.env.CLOUDINARY_API_KEY)
const uploadOnCloudinary = async (localFilePath) => {
    console.log("localfile",localFilePath)
    try {
        if (!localFilePath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,
             {
            resource_type: "auto"
        });
        //file has been uploaded successfully
        // console.log("file is uploaded on cloudinary!!" ,response.url);
        fs.unlinkSync(localFilePath);
        return response;

    }catch (error) {
        console.log("cloudinary",error)
      if(localFilePath) fs.unlinkSync(localFilePath);
       //remove the localy saved temparary 
       // file as the upload operation got failed
       return null;
    }
};

export {uploadOnCloudinary};




    
    