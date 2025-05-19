import pool from '../config/db.js'
const EditBlog = async(req,res) =>{
  try {
    const {title,content,tags,id} = req.body;
    console.log(id)
    // if not id then,,
    if (!id) {
      return res.status(400).json({ error: "Blog ID is required" });
    }

    const fields = [];
    const values = [];
    let index = 1;
    // cheking which is not null
    if (title !== undefined) {
      fields.push(`title = $${index++}`);
      values.push(title);
    }
    if (content !== undefined) {
      fields.push(`content = $${index++}`);
      values.push(content);
    }
    if (tags !== undefined) {
      fields.push(`tags = $${index++}`);
      values.push(JSON.stringify(tags)); // since tags is an array or JSON
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    values.push(id); // for the WHERE clause
  
    const query = `
      UPDATE blog 
      SET ${fields.join(", ")}
      WHERE id = $${index}
      RETURNING *`;
   
    const updatedBlog = await pool.query(query, values); // updated the details
   
    return res.status(200).json({blog:updatedBlog.rows[0],success:true});
  } catch (error) {
    return res.status(501).json(error)
  }
}

export default EditBlog;