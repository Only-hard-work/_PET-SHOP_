import multer from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

// const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//   if (file.mimetype.startsWith("iamge/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed"));
//   }
// };


export const uploadPetImage = multer({
  storage,
  limits: { fieldSize: 5 * 1024 * 1024 }, // limit 5mb
}).single('image');
