import pool from "../config/db.js"

const getAllBlog = async(req,res)=>{
  try {
    const allBlog = await pool.query("SELECT id,title,content,tag,status FROM BLOG");
    return res.status(200).json({allBlog,success:true});
  } catch (error) {
    return res.status(501).json({error});
  }
}

export default getAllBlog;