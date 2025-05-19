import pool from "../config/db.js"

const getselfBlog = async(req,res)=>{
  try {
    const userId = req.params.id;
   
    const allPublishedBlog = await pool.query("SELECT id,title,content,tags,status,imageUrl,updated_at FROM BLOG WHERE userId=$1 AND status='published'",[userId]);
    const allDraftBlog = await pool.query("SELECT id,title,content,tags,status,imageUrl,updated_at FROM BLOG WHERE userId=$1 AND status='draft'",[userId]);

    const user = await pool.query("SELECT name,bio FROM USERS WHERE id=$1",[userId])
    return res.status(200).json({post : {allPublishedBlog,allDraftBlog,user},success:true});
  } catch (error) {
    return res.status(501).json({error});
  }
}

export default getselfBlog;