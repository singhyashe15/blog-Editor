import express from "express";
import pool from "./config/db.js";
import userTable from "./models/user.js";
import blogSchema from './models/blogSchema.js'
import authRouter from "./routes/auth.js";
import blogRouter from "./routes/blogroute.js";
import cors from "cors";

// const app = express();

// define port
const port = 3000 ;

import {app,server} from './socket/socket.js'
import BlogComment from "./models/blogComment.js";

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  optionsSuccessStatus: 200
}));

app.use(express.json());


// connect with dbs
pool.connect()
  .then(() => console.log("✅ Connected to Blog DBS"))
  .catch((err) => console.error("❌ Database Connection Error:", err));

// initialise schema
blogSchema();
userTable();
BlogComment();

// handling the api 
app.use('/api/auth',authRouter)
app.use('/api/blogs',blogRouter);

// connect to the port
server.listen(port,()=>{
  console.log("Server runnning at specifed port")
})