import db from './config/db';

const createTables = async () => {
    const connection = await db.getConnection();
    try {
        console.log('✅ Connected to database');

        // 1. Auxiliary Tables
        await connection.query(`
      CREATE TABLE IF NOT EXISTS CATEGORY_TB (
        CategoryID INT AUTO_INCREMENT PRIMARY KEY,
        CategoryName VARCHAR(100) NOT NULL
      )
    `);
        console.log('Created CATEGORY_TB');

        await connection.query(`
      CREATE TABLE IF NOT EXISTS LOCATION_TB (
        LocationID INT AUTO_INCREMENT PRIMARY KEY,
        BranchName VARCHAR(100) NOT NULL,
        RoomDetails VARCHAR(255)
      )
    `);
        console.log('Created LOCATION_TB');

        await connection.query(`
      CREATE TABLE IF NOT EXISTS SUPPLIER_TB (
        SupplierID INT AUTO_INCREMENT PRIMARY KEY,
        SupplierName VARCHAR(255) NOT NULL,
        ContactPerson VARCHAR(100),
        Email VARCHAR(100) UNIQUE
      )
    `);
        console.log('Created SUPPLIER_TB');

        // 2. User Table
        await connection.query(`
      CREATE TABLE IF NOT EXISTS USER_TB (
        UserID INT AUTO_INCREMENT PRIMARY KEY,
        StaffID VARCHAR(50) UNIQUE NOT NULL,
        FullName VARCHAR(150) NOT NULL,
        Role VARCHAR(20) CHECK (Role IN ('Admin', 'Staff')),
        Department VARCHAR(50)
      )
    `);
        console.log('Created USER_TB');

        // 3. Delivery Header Table
        await connection.query(`
      CREATE TABLE IF NOT EXISTS DELIVERY_TB (
        DeliveryID INT AUTO_INCREMENT PRIMARY KEY,
        InvoiceNo VARCHAR(100) UNIQUE NOT NULL,
        DONumber VARCHAR(100) NOT NULL,
        SupplierID INT,
        DriverName VARCHAR(100),
        DeliveryDate DATE,
        Status VARCHAR(20) DEFAULT 'Pending',
        FOREIGN KEY (SupplierID) REFERENCES SUPPLIER_TB(SupplierID)
      )
    `);
        console.log('Created DELIVERY_TB');

        // 4. Asset Master Table
        await connection.query(`
      CREATE TABLE IF NOT EXISTS ASSET_TB (
        AssetID INT AUTO_INCREMENT PRIMARY KEY,
        SerialNumber VARCHAR(100) UNIQUE NOT NULL,
        AssetName VARCHAR(255) NOT NULL,
        Status VARCHAR(20) DEFAULT 'Available',
        CategoryID INT,
        LocationID INT,
        UserID INT,
        DeliveryID INT,
        FOREIGN KEY (CategoryID) REFERENCES CATEGORY_TB(CategoryID),
        FOREIGN KEY (LocationID) REFERENCES LOCATION_TB(LocationID),
        FOREIGN KEY (UserID) REFERENCES USER_TB(UserID),
        FOREIGN KEY (DeliveryID) REFERENCES DELIVERY_TB(DeliveryID)
      )
    `);
        console.log('Created ASSET_TB');

        // 5. Audit/Transaction Log
        await connection.query(`
      CREATE TABLE IF NOT EXISTS TRANSACTION_LOG_TB (
        LogID INT AUTO_INCREMENT PRIMARY KEY,
        AssetID INT,
        ActionType VARCHAR(50),
        ActionDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        PerformedBy INT,
        FOREIGN KEY (AssetID) REFERENCES ASSET_TB(AssetID),
        FOREIGN KEY (PerformedBy) REFERENCES USER_TB(UserID)
      )
    `);
        console.log('Created TRANSACTION_LOG_TB');

        console.log('✅ All tables created successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    } finally {
        connection.release();
    }
};

createTables();
