import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import BlogList from '../components/BlogList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ROLES } from '../utils/constants';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { user, hasRole } = useContext(AuthContext);

  return (
    <Container className="py-4">
      {user && user.role === ROLES.ADMIN&&<Button className='mb-3' as={Link} to="/blog/new" variant="success">
          + Create New Blog
        </Button>}
      <Row className="search-container">
        <Col md={6}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </Col>
        <Col md={6}>
          <Filter value={categoryFilter} onChange={setCategoryFilter} />
        </Col>
      </Row>
      <BlogList searchTerm={searchTerm} categoryFilter={categoryFilter} />
    </Container>
  );
};

export default Home;