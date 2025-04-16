import React from 'react';
import { Card, Button, Spinner, Badge } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useBlogs } from '../context/BlogContext';
import RoleBasedButton from './RoleBasedButton';
import { ROLES } from '../utils/constants';

const BlogDetail = () => {
  const { id } = useParams();
  const { getBlogById, deleteBlog, loading } = useBlogs();
  const navigate = useNavigate();
  
  const blog = getBlogById(id);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await deleteBlog(id);
      navigate('/');
    }
  };

  if (loading && !blog) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!blog) {
    return <div className="text-center py-5">Blog not found</div>;
  }

  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={blog.image} className="blog-image" />
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          By {blog.author} • {blog.date}
        </Card.Subtitle>
        <Badge bg="secondary" className="mb-3">{blog.category}</Badge>
        <Card.Text style={{ whiteSpace: 'pre-line' }}>{blog.content}</Card.Text>
        <div className="d-flex justify-content-between">
          <Link to="/" className="btn btn-outline-secondary">
            Back to Blogs
          </Link>
          <div>
            <RoleBasedButton 
              role={ROLES.EDITOR}
              className="btn btn-warning me-2"
              as={Link}
              to={`/blog/${id}/edit`}
            >
              Edit
            </RoleBasedButton>
            <RoleBasedButton 
              role={ROLES.ADMIN}
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </RoleBasedButton>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BlogDetail;