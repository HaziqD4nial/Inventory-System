import db from '../config/db';

async function checkConnection() {
    try {
        const connection = await db.getConnection();
        console.log('✅ Connection successful!');

        const [rows] = await connection.query('SHOW TABLES');
        console.log('📊 Tables in database:', rows);

        connection.release();
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error);
        process.exit(1);
    }
}

checkConnection();
