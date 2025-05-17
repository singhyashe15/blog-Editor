import { createContext, useContext, useState } from "react";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  
  const [search, setSearch] = useState("");

  return (
    <BlogContext.Provider value={{ search,setSearch }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);

