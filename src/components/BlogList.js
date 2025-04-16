import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Pagination, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useBlogs } from '../context/BlogContext';
import RoleBasedButton from './RoleBasedButton';
import { ROLES } from '../utils/constants';


const BlogList = ({ searchTerm, categoryFilter }) => {
    const { blogs, loading, deleteBlog, fetchBlogs, updateBlog,setBlogs } = useBlogs();
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(6);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
  
    useEffect(() => {
      let result = blogs;
      
      if (searchTerm) {
        result = result.filter(blog => 
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (blog.author && blog.author.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      if (categoryFilter) {
        result = result.filter(blog => blog.category === categoryFilter);
      }
      
      setFilteredBlogs(result);
      setCurrentPage(1);
    }, [blogs, searchTerm, categoryFilter]);
  
    const handleDelete = async (id) => {
      if (window.confirm('Are you sure you want to delete this blog?')) {
        try {
          await deleteBlog(id);
          setBlogs(blogs.filter(blog => blog.id !== id)); // Update local state
        } catch (error) {
          console.error('Error deleting blog:', error);
        }
      }
    };

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this blog?')) {
//       await deleteBlog(id);
//     }
//   };

  if (loading && blogs.length === 0) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (currentBlogs.length === 0) {
    return <div className="text-center py-5">No blogs found</div>;
  }


  return (
    <>
      <Row xs={1} md={2} lg={3} className="g-4">
        {currentBlogs.map(blog => (
          <Col key={blog.id}>
            <Card className="blog-card h-100">
              <Card.Img variant="top" src={
                // "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg"
                blog.image} className="blog-image" />
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  By {blog.author} • {blog.date}
                </Card.Subtitle>
                <Badge bg="secondary" className="mb-2">{blog.category}</Badge>
                <Card.Text className="text-truncate">
                  {blog.content}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Link to={`/blog/${blog.id}`} className="btn btn-primary">
                    Read More
                  </Link>
                  <div>
                    <RoleBasedButton 
                      role={ROLES.EDITOR}
                      className="btn btn-warning me-2"
                      as={Link}
                      to={`/blog/${blog.id}/edit`}
                    >
                      Edit
                    </RoleBasedButton>
                    <RoleBasedButton 
                      role={ROLES.ADMIN}
                      className="btn btn-danger"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Delete
                    </RoleBasedButton>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <Pagination className="mt-4">
          <Pagination.Prev 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(currentPage - 1)} 
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(currentPage + 1)} 
          />
        </Pagination>
      )}
    </>
  );
};

export default BlogList;