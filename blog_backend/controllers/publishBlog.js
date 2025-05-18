import pool from "../config/db.js";

const publishBlog = async (req,res) => {
  try {
    const blog = req.body;
   
    const published = await pool.query("INSERT INTO BLOG (title,content,tags,status,imageUrl,userId) VALUES ($1,$2,$3,$4,$5) RETURNING *", [blog.title,blog.content,JSON.stringify(blog.tags),blog.status,blog.image,blog.id]);
    
    if(published.rowCount){
      return res.status(201).json({msg:"blog publised", success : true});
    }
    return res.status(401).josn({msg:"Some error occured", success:false});
  } catch (error) {
    return res.status(501).json({error});
  }
}

export default publishBlog;