import pool from "../config/db.js";

const getAllBlogs = async(req,res) => {
  try {
    const allBlogs = await pool.query("SELECT title,tags,content,image FROM blogs WHERE status='published'");

    if(allBlogs.rowCount === 0){
      return res.status(200).json({msg : "No BLog right now !" , success : false});
    }
    return req.status(201).json({allBlogs,success : true});
  } catch (error) {
    return res.status(501).json(error);
  }
}

export default getAllBlogs;