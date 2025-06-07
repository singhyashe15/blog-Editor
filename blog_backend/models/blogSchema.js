import pool from "../config/db.js";

const BlogSchema = async () => {
  try {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS blog (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      content VARCHAR(255),
      tags JSONB , 
      status VARCHAR(255) CHECK (status IN ('draft', 'published')),
      imageUrl VARCHAR(255),
      userId INTEGER REFERENCES users(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);
    console.log("Blog Table Created Successfully");
  } catch (err) {
    console.error("Error Creating Blog Table:", err);
  }
}

export default BlogSchema;