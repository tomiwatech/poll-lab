import { Router } from 'express';
import campaignController from '../controllers/campaignController';
import campaignMiddleware from '../middlewares/validators/campaign';

const router = Router();

router.post('/campaigns', campaignMiddleware.verifyToken, campaignMiddleware.validatePostBody, campaignController.create);
router.get('/campaigns', campaignMiddleware.verifyToken, campaignController.getAll);
router.get('/campaigns/:id', campaignMiddleware.verifyToken, campaignController.findOne);
router.put('/campaigns/:id', campaignMiddleware.verifyToken, campaignMiddleware.validatePostBody, campaignController.updateOne);
router.delete('/campaigns/:id', campaignMiddleware.verifyToken, campaignController.deleteOne);


export default router;
