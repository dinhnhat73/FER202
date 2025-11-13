import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const UserFilter = ({ onFilter }) => {
  const [q, setQ] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('');

  const apply = () => {
    onFilter({ q, role, status, sortBy });
  };

  return (
    <Row className="mb-3">
      <Col md={4}>
        <Form.Control placeholder="Search username or full name" value={q} onChange={(e) => setQ(e.target.value)} />
      </Col>
      <Col md={2}>
        <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="banned">Banned</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort</option>
          <option value="username_asc">Username A→Z</option>
          <option value="username_desc">Username Z→A</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Button onClick={apply}>Apply</Button>
      </Col>
    </Row>
  );
};

export default UserFilter;
