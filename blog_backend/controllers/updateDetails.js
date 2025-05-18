import pool from "../config/db.js";

const updateDetail = async (req, res) => {
  try {
    const { bio, youtube, instagram, facebook, twitter, id } = req.body;

    const updated = await pool.query(
      "UPDATE USER SET bio = $1 , youtube = $2 , instagram = $3, facebook = $4 , twitter = $5 WHERE id = $6"
      , [bio, youtube, instagram, facebook, twitter, id]);
    if (updated) {
      res.status(401).json({ msg: "updated successfully ", success: true });
    }
    res.status(401).json({ msg: "Some problem while updating", success: false });
  } catch (error) {
    return res.status(501).json({ error });
  }
}

export default updateDetail;