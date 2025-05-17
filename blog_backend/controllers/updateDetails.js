import pool from "../config/db.js";

const updateDetail = async (req, res) => {
  try {
    const { bio, youtube, instagram, facebook, twitter } = req.body;
    const updatedFields = {};

    // Add only the fields that have values
    if (bio) updatedFields.bio = bio;
    if (youtube) updatedFields.youtube = youtube;
    if (instagram) updatedFields.instagram = instagram;
    if (facebook) updatedFields.facebook = facebook;
    if (twitter) updatedFields.twitter = twitter;

    // const updated = await pool.query(`SELECT INTO USERS (${name} , ${}) `);

    // if (updated) {
    //   res.status(201).json({ updated, success: true });
    // }
    res.status(401).json({ msg: "updated successfully ", success: false });
  } catch (error) {
    return res.status(501).json({ error });
  }
}

export default updateDetail;