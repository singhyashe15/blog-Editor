import pool from "../config/db.js";

const getCurrentBlogs = async(req,res) => {
  try {
    const currentBlogs = await pool.query("SELECT title,tags,content,image FROM blogs WHERE month(updated_at)");

    if(currentBlogs.rowCount === 0){
      return res.status(200).json({msg : "No BLog right now !" , success : false});
    }
    return req.status(201).json({currentBlogs,success : true});
  } catch (error) {
    return res.status(501).json(error);
  }
}

export default getCurrentBlogs;