import pool from "../config/db.js"

const getselfBlog = async(req,res)=>{
  try {
    const userId = req.params.id;
    const allPublishedBlog = await pool.query("SELECT id,title,content,tag,status FROM BLOG WHERE userId=$1 AND status='published'",[userId]);
    const allDraftBlog = await pool.query("SELECT id,title,content,tag,status FROM BLOG WHERE userId=$1 AND status='draft'",[userId])
    return res.status(200).json({allPublishedBlog,allDraftBlog,success:true});
  } catch (error) {
    return res.status(501).json({error});
  }
}

export default getselfBlog;