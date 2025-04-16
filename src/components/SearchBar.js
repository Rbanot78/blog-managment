import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default SearchBar;