import pool from "../config/db.js";

const getBlog = async(req,res) =>{
  try {
    const {id} = await req.params;

   const blog =  await pool.query("SELECT id,title,content,tags,status FROM BLOG WHERE id=$1", [id]);

   if(blog.rowCount == 0){
    return res.status(301).json({msg:"Blogs not Founded", success: false});
   }

   return res.status(201).json({blog,success:true});
  } catch (error) {
    return res.status(501).json(error);
  }
}

export default getBlog;