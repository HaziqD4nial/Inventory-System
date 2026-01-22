import { Router } from 'express';
import { getAssets, createAsset } from '../controllers/assetController';

const router = Router();

router.get('/', getAssets);
router.post('/', createAsset);

export default router;
