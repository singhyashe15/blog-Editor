import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Register from '../pages/signup.jsx';
import Login from '../pages/login.jsx';
import Home from '../pages/home.jsx';
import Logout from '../pages/logout.jsx';
import NotFound from '../pages/notFound.jsx';
import Error from '../pages/error.jsx'
import Profile from '../controllers/profile.jsx';
import BlogPost from '../controllers/blog-post.jsx';
import ReadBlog from '../controllers/readblog.jsx';
import Dashboard from '../controllers/dashboard.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // This wraps all pages with Navbar
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'register',
        element: <Register />,
        errorElement: <Error />
      },
      {
        path: 'login',
        element: <Login />,
        errorElement: <Error />
      },
      {
        path:'dashboard',
        element:<Dashboard/>,
        errorElement:<Error/>
      },
      {
        path: 'profile',
        element: <Profile />,
        errorElement: <Error />
      },
      {
        path: 'blog-post',
        element: <BlogPost />,
        errorElement: <Error />
      },
      {
        path : 'read-blog/:id',
        element:<ReadBlog/>,
        errorElement:<Error/>
      }
    ]
  },
  {
    path: 'logout',
    element: <Logout />,
    errorElement: <Error />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;