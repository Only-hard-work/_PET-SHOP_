import axios from "axios";
import { IMGBB_CONFIG } from "../utils/imgbb";
import FormData from 'form-data';

export class ImageService {
  static async uploadImage(imageFile: Express.Multer.File): Promise<string> {
    try {
      // Create form data
      const formData = new FormData();
      
      // Append the image as binary data (preferred method)
      formData.append('image', imageFile.buffer, {
        filename: imageFile.originalname,
        contentType: imageFile.mimetype
      });

      // Optional: Add expiration parameter if needed
      const params = {
        key: 'c12aa1054800b4e7aff43e89e973985f',
        expiration: 600 // Optional: 10 minutes expiration
      };

      const response = await axios.post(IMGBB_CONFIG.UPLOAD_URL, formData, {
        params,
        headers: {
          ...formData.getHeaders(),
          'Accept': 'application/json'
        }
      });

      // Validate response
      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Image upload failed');
      }

      return response.data.data.url;
    } catch (error: any) {
      console.error('ImgBB Upload Error:', {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }
}