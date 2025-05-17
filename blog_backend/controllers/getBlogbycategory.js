import pool from "../config/db.js"

const getBlogbycategory = async(req,res) => {
  try {
    const category = req.params.search
    
    const blogbyCategory = await pool.query("SELECT title, content, tags, imageurl FROM blog WHERE tags::jsonb @> $1::jsonb AND status = 'published'",[JSON.stringify([category])] );
  
    res.status(201).json({blogbyCategory,success:true});
  } catch (error){
    console.log(error)
    return res.status(501).json(error)
  }
} 

export default getBlogbycategory;