const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkConnection() {
    console.log('Testing connection with:');
    console.log('Host:', process.env.DB_HOST);
    console.log('User:', process.env.DB_USER);
    console.log('Database:', process.env.DB_NAME);

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log('✅ Connection successful!');

        const [rows] = await connection.query('SHOW TABLES');
        console.log('📊 Tables in database:', rows);

        await connection.end();
    } catch (error) {
        console.error('❌ Connection failed:', error);
    }
}

checkConnection();
