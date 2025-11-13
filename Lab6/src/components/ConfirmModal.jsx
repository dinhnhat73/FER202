import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, title, message, onConfirm, onCancel }) => {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || 'Xác nhận thao tác'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>Hủy</Button>
        <Button variant="danger" onClick={onConfirm}>Xác nhận</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
