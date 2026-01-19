import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/productController';
import { body } from 'express-validator';

const router = Router();

router.get('/', getProducts);
router.post('/', [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
    body('category').notEmpty().withMessage('Category is required')
], createProduct);

export default router;