import { Router } from "express";
import petsController from "../controllers/pets.controller";
import { uploadPetImage } from "../middlewares/upload.middleware";

const router = Router();

router.get("/", petsController.getAllPets);
router.get("/popular", petsController.getPopularPets);

router.post("/new", uploadPetImage, petsController.createPet);
router.post("/update", uploadPetImage, petsController.updatePet);

router.delete("/delete/:id", petsController.deletePet);

export default router;
