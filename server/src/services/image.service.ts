import axios from "axios";
import FormData from "form-data";
import { IMGBB_CONFIG } from "../utils/imgbb";

export class ImageService {
  private static async uploadImage(
    imageFile: Express.Multer.File
  ): Promise<string> {
    try {
      const formData = new FormData();

      formData.append("image", imageFile.buffer, {
        filename: imageFile.originalname,
        contentType: imageFile.mimetype,
      });

      const params = {
        key: "c12aa1054800b4e7aff43e89e973985f",
        expiration: 600,
      };

      const response = await axios.post(IMGBB_CONFIG.UPLOAD_URL, formData, {
        params,
        headers: {
          ...formData.getHeaders(),
          Accept: "application/json",
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.error?.message || "Image upload failed");
      }

      return response.data.data.url;
    } catch (error: any) {
      console.error("ImgBB Upload Error:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  static async getImageUrl(
    imageFile: Express.Multer.File | undefined
  ): Promise<string | string> {
    let imageUrl = "";

    if (imageFile) {
      imageUrl = await this.uploadImage(imageFile);
    }

    return imageUrl;
  }
}
