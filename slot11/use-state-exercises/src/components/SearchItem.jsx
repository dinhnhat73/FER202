// src/components/SearchItem.jsx
import React, { useState } from 'react';
import { Form, Card } from 'react-bootstrap';

const initialItems = [
    { id: 1, name: 'Apple', category: 'Fruit' },
    { id: 2, name: 'Carrot', category: 'Vegetable' },
    { id: 3, name: 'Banana', category: 'Fruit' },
    { id: 4, name: 'Broccoli', category: 'Vegetable' },
    { id: 5, name: 'Orange', category: 'Fruit' },
];

function SearchItem() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredList = initialItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card style={{ width: '25rem', margin: '20px auto' }}>
      <Card.Body>
        <Card.Title>Tìm kiếm sản phẩm</Card.Title>
        <Form.Control
          type="text"
          placeholder="Nhập tên sản phẩm để tìm kiếm..."
          value={searchTerm}
          onChange={handleSearch}
          className="mb-3"
        />
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredList.length > 0 ? (
            filteredList.map(item => (
              <li key={item.id} style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
                {item.name} <span style={{ color: '#1976d2' }}>({item.category})</span>
              </li>
            ))
          ) : (
            <li style={{ color: '#888', textAlign: 'center', padding: '10px 0' }}>
              Không tìm thấy kết quả
            </li>
          )}
        </ul>
      </Card.Body>
    </Card>
  );
}

export default SearchItem;