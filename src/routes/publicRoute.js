import express from 'express';
const router = express();
import { registerUser, loginUser } from '../controllers/user/userController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;