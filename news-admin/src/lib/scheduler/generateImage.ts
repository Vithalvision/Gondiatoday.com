import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function generateAndUploadImage(prompt: string) {
  const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
  const upload = await cloudinary.uploader.upload(pollinationsUrl, {
    folder: "ai-articles",
  });
  return upload.secure_url;
}