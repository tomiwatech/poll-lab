import { Router } from 'express';
import endorsementController from '../controllers/endorsementController';
import endorsementMiddleware from '../middlewares/validators/endorsement';

const router = Router();

router.post('/', endorsementMiddleware.verifyToken, endorsementMiddleware.validatePostBody, endorsementController.create);
router.get('/', endorsementMiddleware.verifyToken, endorsementController.getAll);
router.get('/:id', endorsementMiddleware.verifyToken, endorsementController.findOne);
router.put('/:id', endorsementMiddleware.verifyToken, endorsementMiddleware.validatePostBody, endorsementController.updateOne);
router.delete('/:id', endorsementMiddleware.verifyToken, endorsementController.deleteOne);


export default router;
