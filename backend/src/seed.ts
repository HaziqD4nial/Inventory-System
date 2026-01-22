import db from './config/db';

const seedDatabase = async () => {
    const connection = await db.getConnection();
    try {
        console.log('🌱 Seeding database...');

        // 0. Clean up existing data (Order matters due to FKs)
        await connection.query('DELETE FROM TRANSACTION_LOG_TB');
        // await connection.query('DELETE FROM ASSET_TB'); // Assets depend on Deliveries but ASSET_TB also refs DELIVERY?
        // ASSET_TB refs DELIVERY_TB (DeliveryID). DELIVERY_TB refs SUPPLIER_TB.
        // So ASSET_TB must be deleted before DELIVERY_TB.
        await connection.query('DELETE FROM ASSET_TB');
        await connection.query('DELETE FROM DELIVERY_TB');
        await connection.query('DELETE FROM SUPPLIER_TB');
        await connection.query('DELETE FROM CATEGORY_TB');
        await connection.query('DELETE FROM LOCATION_TB');
        await connection.query('DELETE FROM USER_TB');

        // Reset Auto Increments (Might fail if FKs exist, skipping error check)
        try {
            await connection.query('ALTER TABLE CATEGORY_TB AUTO_INCREMENT = 1');
            await connection.query('ALTER TABLE SUPPLIER_TB AUTO_INCREMENT = 1');
            await connection.query('ALTER TABLE DELIVERY_TB AUTO_INCREMENT = 1');
            await connection.query('ALTER TABLE ASSET_TB AUTO_INCREMENT = 1');
        } catch (e) { console.log('Skipping auto-increment reset', e); }

        // 1. Seed Categories
        await connection.query(`
      INSERT INTO CATEGORY_TB (CategoryName) VALUES 
      ('frozen-products'), ('fresh-produce'), ('dairy-products'), ('beverages'), ('cleaning-supplies')
    `);
        console.log('✅ Categories seeded');

        // 2. Seed Suppliers
        await connection.query(`
      INSERT INTO SUPPLIER_TB (SupplierName, Email) VALUES 
      ('Fresh Foods Distributor', 'contact@freshfoods.com'),
      ('Dairy Express', 'orders@dairyexpress.com'),
      ('Premium Produce Co.', 'sales@premiumproduce.com')
    `);
        console.log('✅ Suppliers seeded');

        // 3. Seed Deliveries
        const [suppliers]: any = await connection.query('SELECT SupplierID FROM SUPPLIER_TB');
        await connection.query(`
      INSERT INTO DELIVERY_TB (InvoiceNo, DONumber, SupplierID, DriverName, DeliveryDate, Status) VALUES 
      ('INV-001', 'DO-001', ?, 'Mike Johnson', NOW(), 'Pending'),
      ('INV-002', 'DO-002', ?, 'Sarah Williams', DATE_ADD(NOW(), INTERVAL 1 DAY), 'Pending')
    `, [suppliers[0].SupplierID, suppliers[1].SupplierID]);
        console.log('✅ Deliveries seeded');

        // 4. Seed Assets (Items for Delivery 1)
        const [deliveries]: any = await connection.query('SELECT DeliveryID FROM DELIVERY_TB WHERE DONumber = "DO-001"');
        const [categories]: any = await connection.query('SELECT CategoryID FROM CATEGORY_TB WHERE CategoryName = "frozen-products"');

        if (deliveries.length > 0 && categories.length > 0) {
            await connection.query(`
        INSERT INTO ASSET_TB (SerialNumber, AssetName, CategoryID, Status, DeliveryID) VALUES 
        ('SN-1001', 'Frozen Peas', ?, 'Available', ?),
        ('SN-1002', 'Ice Cream Vanilla', ?, 'Available', ?),
        ('SN-1003', 'Frozen Pizza', ?, 'Available', ?)
      `, [categories[0].CategoryID, deliveries[0].DeliveryID, categories[0].CategoryID, deliveries[0].DeliveryID, categories[0].CategoryID, deliveries[0].DeliveryID]);
            console.log('✅ Assets (Items) seeded');
        }

        console.log('🎉 Database seeding completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    } finally {
        connection.release();
    }
};

seedDatabase();
