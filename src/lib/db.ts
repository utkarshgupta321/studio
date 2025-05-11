import mysql from 'mysql2/promise';

    const pool = mysql.createPool({
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '3306', 10),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    export default pool;
    export const connect = async () => {
      try {
        await pool.getConnection();
        console.log('Connected to the database');
      } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
      }
    };