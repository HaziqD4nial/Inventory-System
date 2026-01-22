import { Request, Response } from 'express';
import db from '../config/db';

export const getDeliveries = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query(`
      SELECT d.*, s.SupplierName, s.SupplierID 
      FROM DELIVERY_TB d 
      LEFT JOIN SUPPLIER_TB s ON d.SupplierID = s.SupplierID
      ORDER BY d.DeliveryDate DESC
    `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching deliveries', error });
    }
};

export const getDeliveryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [rows]: any = await db.query(`
      SELECT d.*, s.SupplierName 
      FROM DELIVERY_TB d 
      LEFT JOIN SUPPLIER_TB s ON d.SupplierID = s.SupplierID
      WHERE d.DeliveryID = ?
    `, [id]);

        if (rows.length === 0) {
            res.status(404).json({ message: 'Delivery not found' });
            return;
        }

        // Fetch items (Assets) associated with this delivery
        const [items] = await db.query('SELECT * FROM ASSET_TB WHERE DeliveryID = ?', [id]);

        res.json({ ...rows[0], items });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching delivery details', error });
    }
};

export const createDelivery = async (req: Request, res: Response) => {
    const { InvoiceNo, DONumber, SupplierID, DriverName, DeliveryDate } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO DELIVERY_TB (InvoiceNo, DONumber, SupplierID, DriverName, DeliveryDate) VALUES (?, ?, ?, ?, ?)',
            [InvoiceNo, DONumber, SupplierID, DriverName, DeliveryDate]
        );
        res.status(201).json({ id: (result as any).insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: 'Error creating delivery', error });
    }
};

export const updateDeliveryStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { Status } = req.body;
    try {
        await db.query('UPDATE DELIVERY_TB SET Status = ? WHERE DeliveryID = ?', [Status, id]);
        res.json({ message: 'Status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating status', error });
    }
};
