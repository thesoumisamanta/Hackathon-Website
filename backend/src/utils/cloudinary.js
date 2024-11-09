import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



// Upload an image
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("Local file path is required");
        }

        if(!fs.existsSync(localFilePath)) {
            throw new Error(`File not found at local path : ${localFilePath}` );
        }

        const configStatus = {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Not Set',
            api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not Set',
            api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not Set'
        }

        

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "hackathons",   
            public_id: 'hackathon_' + Date.now(),
        })

        
     

        return response
        
    } catch (error) {

        
        throw error

    } finally {
        try {
            if(localFilePath && fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath)
            }
        } catch (error) {
            console.error("Error in cleanup local file", error)
        }
    }
}

export {uploadOnCloudinary}