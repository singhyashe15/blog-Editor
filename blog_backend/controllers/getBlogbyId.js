import pool from "../config/db.js";

const getBlog = async (req, res) => {
  try {
    const { id } = await req.params;

    const blog = await pool.query("SELECT id,title,content,tags,status FROM BLOG WHERE id=$1", [id]);

    if (blog.rowCount == 0) {
      return res.status(301).json({ msg: "Blogs not Founded", success: false });
    }
    // fetch the user who has published that blog
    const user = await pool.query("SELECT name FROM USER WHERE id=$1", [blog.rows[0].userId]);
    
    return res.status(201).json({ post: { user, blog }, success: true });
  } catch (error) {
    return res.status(501).json(error);
  }
}

export default getBlog;