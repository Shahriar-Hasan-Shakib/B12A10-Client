// Image upload utility - ImgBB image upload helper
import { IMGBB_API_KEY, IMGBB_UPLOAD_URL } from "@src/constants";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("key", IMGBB_API_KEY);

  try {
    const response = await fetch(IMGBB_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error("Failed to upload image");
  }
};

export const validateImageFile = (
  file: File
): { isValid: boolean; error?: string } => {
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Please upload a valid image file (JPG, PNG, WEBP, GIF)",
    };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: "Image size should not exceed 5MB" };
  }

  return { isValid: true };
};
