import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayments, createPayment, refundPayment } from '../features/payments/paymentsSlice';
import PaymentTable from '../components/PaymentTable';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';

const PaymentList = () => {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector(state => state.payments);

  const [formData, setFormData] = useState({ userId: '', amount: '', date: '', status: 'PENDING' });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const validateForm = () => {
    if (!formData.userId) return 'User ID không được để trống';
    if (isNaN(formData.userId)) return 'User ID phải là số';
    if (!formData.amount) return 'Số tiền không được để trống';
    if (isNaN(formData.amount) || formData.amount <= 0) return 'Số tiền phải là số dương';
    if (!formData.date) return 'Ngày thanh toán không được để trống';
    return null;
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) {
      setFormError(err);
      return;
    }
    setFormError('');
    dispatch(createPayment(formData));
    setFormData({ userId: '', amount: '', date: '', status: 'PENDING' });
  };

  const onRefund = (id) => {
    if (!window.confirm('Xác nhận hoàn tiền giao dịch này?')) return;
    dispatch(refundPayment(id));
  };

  return (
    <div>
      <h3>Payments</h3>

      <Form onSubmit={handleCreate} className="mb-4">
        <Row className="align-items-end">
          <Col md={2}>
            <Form.Group>
              <Form.Label>User ID</Form.Label>
              <Form.Control
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="PENDING">PENDING</option>
                <option value="SUCCESS">SUCCESS</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button type="submit">Create Payment</Button>
          </Col>
        </Row>
        {formError && <Alert variant="danger" className="mt-2">{formError}</Alert>}
      </Form>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <PaymentTable payments={list} onRefund={onRefund} />
    </div>
  );
};

export default PaymentList;
