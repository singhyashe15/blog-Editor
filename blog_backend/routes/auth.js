import express from "express";
import Login from '../controllers/login.js';
import updateDetail from "../controllers/updateDetails.js";
import Register from "../controllers/register.js";

const authRouter = express.Router();

authRouter.post('/register',Register);

authRouter.post('/login',Login );

authRouter.post('/update-details',updateDetail);

export default authRouter;