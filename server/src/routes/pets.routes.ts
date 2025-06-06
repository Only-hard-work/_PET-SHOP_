import { Router } from "express";
import { uploadPetImage } from "../middlewares/upload.middleware";
import PetsController from "../controllers/pets.controller";

const router = Router();

router.get("/", PetsController.getAllPets);
router.post("/new", uploadPetImage, PetsController.createPet);
router.post("/update", uploadPetImage, PetsController.updatePet);
router.delete("/delete/:id", PetsController.deletePet);

export default router;
