import { Router } from 'express';
import { getDeliveries, getDeliveryById, createDelivery, updateDeliveryStatus } from '../controllers/deliveryController';

const router = Router();

router.get('/', getDeliveries);
router.get('/:id', getDeliveryById);
router.post('/', createDelivery);
router.put('/:id/status', updateDeliveryStatus);

export default router;
