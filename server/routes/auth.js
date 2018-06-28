import { Router } from 'express';
import authController from '../controllers/authController';
import authMiddleware from '../middlewares/validators/auth';

const router = Router();

// USER SIGNUP AND LOGIN
router.post('/signup', authMiddleware.validateSignup, authController.userSignup);
router.post('/login', authMiddleware.validateLogin, authController.userLogin);
router.get('/verify/:id', authController.verifyUser)
// ADMIN SIGNUP AND LOGIN
router.post('/signup/admin', authMiddleware.validateSignup, authController.adminSignup);
router.post('/login/admin', authMiddleware.validateLogin, authController.adminLogin);


export default router;
