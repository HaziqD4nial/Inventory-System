import { Request, Response } from 'express';
import db from '../config/db';

export const getAssets = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM ASSET_TB');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assets', error });
    }
};

export const createAsset = async (req: Request, res: Response) => {
    const { SerialNumber, AssetName, CategoryID, LocationID, DeliveryID } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO ASSET_TB (SerialNumber, AssetName, CategoryID, LocationID, DeliveryID, Status) VALUES (?, ?, ?, ?, ?, "Available")',
            [SerialNumber, AssetName, CategoryID, LocationID, DeliveryID]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating asset', error });
    }
};
