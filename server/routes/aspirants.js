import { Router } from 'express';
import aspirantController from '../controllers/aspirantController';
import aspirantMiddleware from '../middlewares/validators/aspirant';

const router = Router();

router.post('/aspirants', aspirantMiddleware.verifyToken, aspirantMiddleware.validatePostBody, aspirantController.create);
router.get('/aspirants', aspirantMiddleware.verifyToken, aspirantController.getAll);
router.get('/aspirants/:id', aspirantMiddleware.verifyToken, aspirantController.findOne);
router.put('/aspirants/:id', aspirantMiddleware.verifyToken, aspirantMiddleware.validatePostBody, aspirantController.updateOne);
router.delete('/aspirants/:id', aspirantMiddleware.verifyToken, aspirantController.deleteOne);


export default router;
