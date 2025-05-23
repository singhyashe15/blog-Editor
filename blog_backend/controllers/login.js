import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
  try {
    const user = await req.body;
    // checking email exist or not
    const Found = await pool.query("SELECT * FROM USERS WHERE EMAIL=$1", [user.email]);
    if (Found.rows.length === 0) {
      return res.status(404).json({ msg: "Invalid Credentials" ,success:false});
    }
    // decrypting the password
    const hpass = await bcrypt.compare(user.password, Found.rows[0].password);
    if (hpass === false) {
      return res.status(404).json({ msg: "Invalid Password",success:false });
    }

    const token_data = {
      name: Found.rows[0].name,
      id: Found.rows[0].id
    }
    // generating authentication
    const token = jwt.sign(token_data, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
  
    const cookieOptions = {
      http: true,
      secure: true,
      sameSite: 'None'
    }
    return res.cookie('token', token, cookieOptions).status(200).json({
      message: "Login successfully",
      data:token_data,
      token: token,
      success: true
    })

  } catch (error) {
    return res.status(501).json({ msg: "Internal Server Error", error })
  }
}

export default Login;