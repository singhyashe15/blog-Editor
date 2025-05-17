import pool from "../config/db.js";

const userTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        bio VARCHAR(255) ,
        instagram VARCHAR(100),
        facebook VARCHAR(100),
        twitter VARCHAR(100),
        youtube VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ User Table Created Successfully");
  } catch (err) {
    console.error("❌ Error Creating User Table:", err);
  }
};

export default userTable;
