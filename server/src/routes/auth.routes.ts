import Router from 'express';
// import { registerValidator, loginValidator } from '../validators/auth.validator';
import AuthContoller from '../controllers/auth.controller';

const router = Router();

router.post('/register', AuthContoller.register);
router.post('/login', AuthContoller.login);
// router.get('/me', AuthContoller.getMe);

export default router;
