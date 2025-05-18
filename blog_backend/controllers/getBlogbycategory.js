import pool from "../config/db.js"

const getBlogbycategory = async (req, res) => {
  try {
    const category = req.params.search;

    const blogbyCategory = await pool.query(`
      SELECT title, content, tags, imageurl 
      FROM blog 
      WHERE status = 'published'
      AND EXISTS (
      SELECT 1 FROM jsonb_array_elements_text(tags) AS tag
      WHERE tag ILIKE '%' || $1 || '%'
      )`, [JSON.stringify([category])]);

    res.status(201).json({ blogbyCategory, success: true });
  } catch (error) {
    console.log(error)
    return res.status(501).json(error)
  }
}

export default getBlogbycategory;