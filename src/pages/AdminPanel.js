import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlogList from '../components/BlogList';

const AdminPanel = () => {
  return (
    <Container className="py-4 admin-panel">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Panel</h2>
        <Button as={Link} to="/blog/new" variant="success">
          + Create New Blog
        </Button>
      </div>
      <BlogList />
    </Container>
  );
};

export default AdminPanel;