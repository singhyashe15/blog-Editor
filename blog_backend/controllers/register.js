import pool from "../config/db.js";
import bcryptjs from "bcryptjs";
import sendEmail from "../helpers/sendEmail.js";

const Register = async(req,res)=>{
  try {
    const user = await req.body;

    const isEmailFound = await pool.query("SELECT email from users WHERE email = $1",[user.email]);

    if(isEmailFound.rowCount > 0){
      return res.status(401).json({msg:"Email already exist ,use another email",success:false});
    } 

    const salt = await bcryptjs.genSalt(10);
    const hashPass = await bcryptjs.hash(user.password,salt);

    const email = await sendEmail(user.name,user.email);

    if(email.success){
      const created = await pool.query("INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *",[user.name,user.email,hashPass]);
      if(created){
        return res.status(201).json({msg:"Successfully registered", success : true});
      }
    }
    return res.status(404).json({msg:"Email not exist"});
  } catch (error) {
    return res.status(501).json({error});
  }
}

export default Register;