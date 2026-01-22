import { Request, Response } from 'express';
import db from '../config/db';

export const getCategories = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM CATEGORY_TB');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    const { CategoryName } = req.body;
    try {
        const [result] = await db.query('INSERT INTO CATEGORY_TB (CategoryName) VALUES (?)', [CategoryName]);
        res.status(201).json({ id: (result as any).insertId, CategoryName });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};
