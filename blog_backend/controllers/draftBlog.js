import pool from "../config/db.js"

const draftBLog = async (req,res) =>{
  try {
    const {blog} = await req.body;
    const draft = await pool.query("INSERT INTO BLOG (title,content,tags,status) VALUES ($1,$2,$3,$4,$5) RETURNING *", [blog.title,blog.content,blog.tags,blog.status]);

    if(draft){
      return res.status(201).json({msg:"blog drafted ", success : true});
    }
    return res.status(401).josn({msg:"Some error occured", success:false});
  } catch (error) {
    return res.status(501).json(error)
  }
}

export default draftBLog;