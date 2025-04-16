import React from 'react';
import { Form } from 'react-bootstrap';
import { CATEGORIES } from '../utils/constants';

const Filter = ({ value, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All Categories</option>
        {CATEGORIES.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default Filter;