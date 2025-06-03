import { Router } from 'express';
// import { checkJwt } from '../middlewares/auth.middleware';
// import { checkRole } from '../middlewares/role.middleware';
import petsController from '../controllers/pets.controller';

const router = Router();

// Публичные маршруты
router.get('/', petsController.getAllPets);
router.get('/popular', petsController.getPopularPets);
router.post('/new', petsController.createPet);
router.post('/delete', petsController.deletePet);
// router.get('/:id', petsController.getPetById);

// Защищенные маршруты (только для админа)
// router.post('/', [checkJwt, checkRole(['admin'])], petsController.createPet);
// router.put('/:id', [checkJwt, checkRole(['admin'])], petsController.updatePet);
// router.delete('/:id', [checkJwt, checkRole(['admin'])], petsController.deletePet);

export default router;
