import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useBlogs } from '../context/BlogContext';
import { CATEGORIES } from '../utils/constants';
import { useNavigate, useParams } from 'react-router-dom';

const BlogForm = () => {
  const { id } = useParams();
  const { blogs, getBlogById, createBlog, updateBlog, loading, error } = useBlogs();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: CATEGORIES[0],
    image: ''
  });
  
  const [errors, setErrors] = useState({});
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const blogToEdit = getBlogById(id);
      if (blogToEdit) {
        setFormData({
          title: blogToEdit.title,
          content: blogToEdit.content || blogToEdit.body,
          author: blogToEdit.author || 'Anonymous',
          category: blogToEdit.category || CATEGORIES[0],
          image: blogToEdit.image || ''
        });
      }
    }
  }, [id, isEditMode, getBlogById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (isEditMode) {
        await updateBlog(id, formData);
      } else {
        await createBlog(formData);
      }
      navigate(isEditMode ? `/blog/${id}` : '/');
    } catch (err) {
      console.error('Error saving blog:', err);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">{isEditMode ? 'Edit Blog' : 'Create New Blog'}</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form.Group className="mb-3">
          <Form.Label>Title *</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Content *</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="content"
            value={formData.content}
            onChange={handleChange}
            isInvalid={!!errors.content}
          />
          <Form.Control.Feedback type="invalid">
            {errors.content}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Author *</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            isInvalid={!!errors.author}
          />
          <Form.Control.Feedback type="invalid">
            {errors.author}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL (optional)"
          />
          <Form.Text className="text-muted">
            Leave blank to use a random image based on category
          </Form.Text>
        </Form.Group>
        
        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Saving...</span>
              </>
            ) : isEditMode ? 'Update Blog' : 'Create Blog'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BlogForm;