import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { CATEGORIES } from '../utils/constants';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      
      // Enhance the data with our additional fields since JSONPlaceholder has limited fields
      const enhancedBlogs = response.data.map((blog, index) => ({
        ...blog,
        // JSONPlaceholder doesn't have these fields, so we add them
        author: user?.username || 'Anonymous',
        category: CATEGORIES[index % CATEGORIES.length],
        date: new Date().toISOString().split('T')[0],
        image: `https://picsum.photos/seed/${CATEGORIES[index % CATEGORIES.length].toLowerCase()}/600/400`
      }));
      
      setBlogs(enhancedBlogs);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getBlogById = (id) => {
    return blogs.find(blog => blog.id === parseInt(id));
  };

  const createBlog = async (blogData) => {
    try {
      setLoading(true);
      // JSONPlaceholder will return the same ID (101) for all created posts
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: blogData.title,
        body: blogData.content,
        userId: 1 // Hardcoded user ID since we're using mock data
      });
      
      // Add our additional fields to the response
      const newBlog = {
        ...response.data,
        content: blogData.content, // Store the content in both body and content
        body: blogData.content,
        author: blogData.author,
        category: blogData.category,
        date: new Date().toISOString().split('T')[0],
        image: blogData.image || `https://loremflickr.com/600/400/${blogData.category.toLowerCase()}`
      };
      
      // Update local state (in a real app, you'd refetch)
      setBlogs([newBlog, ...blogs]);
      setLoading(false);
      return newBlog;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const updateBlog = async (id, blogData) => {
    try {
      setLoading(true);
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        id: parseInt(id),
        title: blogData.title,
        body: blogData.content,
        // userId: 1 // Hardcoded user ID
      });
      
      // Add our additional fields
      const updatedBlog = {
        ...response.data,
        content: blogData.content,
        author: blogData.author,
        category: blogData.category,
        date: blogData.date,
        image: blogData.image
      };
      
      // Update local state
      const updatedBlogs = blogs.map(blog => 
        blog.id === parseInt(id) ? updatedBlog : blog
      );
      setBlogs(updatedBlogs);
      setLoading(false);
      return updatedBlog;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const deleteBlog = async (id) => {
    try {
      setLoading(true);
      // JSONPlaceholder won't actually delete but will return 200
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      
      // Update local state
      // const filteredBlogs = blogs.filter(blog => blog.id !== parseInt(id));
      // setBlogs(filteredBlogs);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return (
    <BlogContext.Provider value={{
      blogs,
      setBlogs,
      loading,
      error,
      getBlogById,
      createBlog,
      updateBlog,
      deleteBlog,
      fetchBlogs
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogs = () => useContext(BlogContext);