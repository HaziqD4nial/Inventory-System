import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import db from '../config/db';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  const { name, description, price, quantity, category } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, quantity, category) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, quantity, category]
    );
    res.status(201).json({ id: (result as any).insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};