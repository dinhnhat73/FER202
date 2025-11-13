import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <>
      <h2>Dashboard</h2>
      <Row className="g-3">
        <Col md={4}>
          <Card><Card.Body><Card.Title>Payments</Card.Title><Card.Text>Manage payments</Card.Text><Link to="/payments">Go</Link></Card.Body></Card>
        </Col>
        <Col md={4}>
          <Card><Card.Body><Card.Title>Users</Card.Title><Card.Text>Manage users</Card.Text><Link to="/users">Go</Link></Card.Body></Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
