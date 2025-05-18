import pool from "../config/db.js"

const draftBLog = async (req,res) =>{
  try {
    const blog = await req.body;
    const draft = await pool.query("INSERT INTO BLOG (title,content,tags,status,imageUrl,userId) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO UPDATE  SET title = $1, content = $2, tags = $3, status=$4, imageUrl=$5, updated_at = NOW() RETURNING *", [blog.title,blog.content,JSON.stringify(blog.tags),blog.status,blog.image,blog.id]);

    if(draft){
      return res.status(201).json({msg:"blog drafted ", success : true});
    }
    return res.status(401).josn({msg:"Some error occured", success:false});
  } catch (error) {
    return res.status(501).json(error)
  }
}

export default draftBLog;