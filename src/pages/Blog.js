import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import BlogDetail from '../components/BlogDetail';
import BlogForm from '../components/BlogForm';

const Blog = () => {
  return (
    <Container className="py-4">
      <Routes>
        <Route path=":id" element={<BlogDetail />} />
        <Route path=":id/edit" element={<BlogForm />} />
        <Route path="new" element={<BlogForm />} />
        <Route path="/blog/new" element={<BlogForm />} />
      </Routes>
    </Container>
  );
};

export default Blog;