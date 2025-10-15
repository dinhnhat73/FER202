// src/components/SearchAccount.jsx
import React, { useState } from 'react';
import { Form, Card, Row, Col, Image } from 'react-bootstrap';

const accounts = [
    { id: 1, username: 'john.doe', password: '123', avatar: 'https://i.pravatar.cc/150?u=john.doe' },
    { id: 2, username: 'jane.smith', password: '456', avatar: 'https://i.pravatar.cc/150?u=jane.smith' },
    { id: 3, username: 'peter.jones', password: '789', avatar: 'https://i.pravatar.cc/150?u=peter.jones' },
    { id: 4, username: 'susan.williams', password: 'abc', avatar: 'https://i.pravatar.cc/150?u=susan.williams' },
];

function SearchAccount() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAccounts = accounts.filter(acc => 
    acc.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Tìm kiếm tài khoản</h2>
      <Form.Control
        type="text"
        placeholder="Nhập username để tìm kiếm..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4"
      />
      
      {filteredAccounts.length > 0 ? (
        <Row>
          {filteredAccounts.map(account => (
            <Col md={4} key={account.id} className="mb-3">
              <Card>
                <Card.Img variant="top" src={account.avatar} />
                <Card.Body>
                  <Card.Title>{account.username}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">Không tìm thấy kết quả</p>
      )}
    </div>
  );
}

export default SearchAccount;