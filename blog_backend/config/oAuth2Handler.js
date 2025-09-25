import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from 'dotenv';
import pool from "./db.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
dotenv.config();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let dbUser = null;

        // Example: check if user exists by email
        const email = profile.emails[0].value;
        const isEmailFound = await pool.query(
          "SELECT * FROM USERS WHERE EMAIL=$1",
          [email]
        );

        if (isEmailFound.rows.length === 0) {
          const salt = await bcrypt.genSalt(10);
          const hashPass = await bcrypt.hash(profile.id, salt);

          dbUser = await pool.query(
            "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *",
            [profile.displayName, email, hashPass]
          );

          // (optional) send welcome email
          // await sendEmail(profile.displayName, email);
        }
        const user = {
          name: profile?.displayName,
          email,
          googleId: profile?.id,
          id : dbUser?.id
        };

        // Create JWT token
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        accessToken = jwt.sign(user, jwtSecretKey, { expiresIn: "5d" });

        // Pass both user and token
        return cb(null, user, { accessToken });
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);


export default passport;