import express from "express";
import getBlog from "../controllers/getBlogbyId.js";
import publishBlog from "../controllers/publishBlog.js";
import draftBLog from "../controllers/draftBlog.js";
import getBlogbycategory from "../controllers/getBlogbycategory.js";
import getAllBlogs from "../controllers/getAllBlog.js";
import getselfBlog from "../controllers/getselfBlog.js";

const blogRouter = express.Router();

// post blog as draft
blogRouter.post('/save-draft',draftBLog );
// publish the blog
blogRouter.post('/publish',publishBlog );
// get all blog
blogRouter.get('/',getAllBlogs );
// get blog by id
blogRouter.get('/:id' ,getBlog );
// get selfBlog
blogRouter.get('/self/:id',getselfBlog);
// get blog by category
blogRouter.get("/category/:search",getBlogbycategory);

export default blogRouter;