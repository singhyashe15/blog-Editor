import jwt from "jsonwebtoken";

const verifyToken = (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify token with your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    return res.status(200).json({ msg: "User validated", user: decoded });
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(403).json({ msg: "Token is not valid" });
  }
};

export default verifyToken;
