import express from "express";
import { Server } from "socket.io";
import http from "http";
import pool from "../config/db.js";

const app = express();
const server = http.createServer(app);

// allow only limited url
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, // Allow all origins (use specific domain in production)
    methods: ["GET", "POST"],
  },
});

// initiate the socket connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Joining room
  socket.on("room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on('send-comment', async(id)=>{
    const allComments = await pool.query("SELECT id,sender,sender_id,comment,blog_id FROM BLOGCOMMENT WHERE blog_id=$1",[Number(id)]);

    if(allComments.rowCount > 0){
      io.to(id).emit("all-comment", allComments.rows); // broadcating the comment
    }
  })


  // Sending comment to correct blog room
  socket.on("comment",async (data) => {
    console.log("Received comment:", data);

    // storing in the database
    const res = await pool.query("INSERT INTO BLOGCOMMENT (sender,sender_id,comment,blog_id) VALUES ($1,$2,$3,$4)",[data?.sender,data?.sender_id,data.comment,Number(data?.roomId)]);
    // getting all comment for specific blogs
    const allComments = await pool.query("SELECT id,sender,sender_id,comment,blog_id FROM BLOGCOMMENT WHERE blog_id=$1",[Number(data?.roomId)]);
    console.log(allComments.rows)

    if(res.rowCount > 0){
      io.to(data?.roomId).emit("all-comment", allComments.rows); // broadcating the comment
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

export { app, server };
