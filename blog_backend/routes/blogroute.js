import express from "express";
import getAllBlog from "../controllers/getAllBlog.js";
import getBlog from "../controllers/getBlogbyId.js";
import publishBlog from "../controllers/publishBlog.js";
import draftBLog from "../controllers/draftBlog.js";
import getCurrentBlogs from "../controllers/getCurrentBlogs.js";
import getBlogbycategory from "../controllers/getBlogbycategory.js";

const blogRouter = express.Router();

// post blog as draft
blogRouter.post('/save-draft',draftBLog );
// publish the blog
blogRouter.post('/publish',publishBlog );
// get all blog
blogRouter.get('/',getAllBlog );
// get blog by id
blogRouter.get('/:id' ,getBlog );
// get currentBlog
blogRouter.get('/getCurrentBlogs',getCurrentBlogs);
// get blog by category
blogRouter.get("/category/:search",getBlogbycategory);

export default blogRouter;