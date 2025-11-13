import React from 'react';
import { Table, Button } from 'react-bootstrap';

const PaymentTable = ({ payments, onRefund }) => {
  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>UserId</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {payments.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.userId}</td>
            <td>{p.amount}</td>
            <td>{p.date}</td>
            <td>{p.status}</td>
            <td>
              {p.status !== 'REFUNDED' && (
                <Button size="sm" variant="warning" onClick={() => onRefund(p.id)}>Refund</Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PaymentTable;
