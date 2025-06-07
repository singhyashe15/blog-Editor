import pool from '../config/db.js'

const BlogComment = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blogComment(
        id SERIAL PRIMARY KEY,
        sender VARCHAR(255) NOT NULL,
        sender_id INTEGER NOT NULL,
        comment VARCHAR(255),
        blog_id INTEGER REFERENCES blog(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.error(" blogComment created successfully");
  } catch (error) {
    console.error("Error Creating Blog Table:", error);
  }
}

export default BlogComment;