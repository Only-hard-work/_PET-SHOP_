import { Router } from 'express';
// import { checkJwt } from '../middlewares/auth.middleware';
// import { checkRole } from '../middlewares/role.middleware';
import petsController from '../controllers/pets.controller';
import { uploadPetImage } from '../middlewares/upload.middleware';

const router = Router();

// Публичные маршруты
router.get('/', petsController.getAllPets);
router.get('/popular', petsController.getPopularPets);
router.post('/new', uploadPetImage, petsController.createPet);

router.delete('/delete/:id', petsController.deletePet);
// router.get('/:id', petsController.getPetById);

// Защищенные маршруты (только для админа)
// router.post('/', [checkJwt, checkRole(['admin'])], petsController.createPet);
// router.put('/:id', [checkJwt, checkRole(['admin'])], petsController.updatePet);
// router.delete('/:id', [checkJwt, checkRole(['admin'])], petsController.deletePet);

export default router;
