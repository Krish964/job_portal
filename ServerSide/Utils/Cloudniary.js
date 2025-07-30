import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});


const uploadFileonCloudinary = async (localfilePath) => {
try {
  if (!localfilePath) return null;

  // UPLOAD FILE ON CLOUDINARY
   const response = await cloudinary.uploader.upload(localfilePath, {
    resource_type: "auto"
  })
  // file has been uploaded successfully
  console.log("file has been uploaded succesfully" , response.url)
} catch (error) {
  console.log("file has not been uploaded" , error)
}
}


export {uploadFileonCloudinary}