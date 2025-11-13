import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';

const UserTable = ({ users, onView, onBan }) => {
  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Avatar</th>
          <th>Username</th>
          <th>Full Name</th>
          <th>Role</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td><Image src={u.avatar || `https://ui-avatars.com/api/?name=${u.username}`} roundedCircle width={40} /></td>
            <td>{u.username}</td>
            <td>{u.fullName}</td>
            <td>{u.role}</td>
            <td>{u.status}</td>
            <td>
              <Button size="sm" className="me-2" onClick={() => onView(u)}>View Details</Button>
              <Button size="sm" variant={u.status === 'active' ? 'danger' : 'success'} onClick={() => onBan(u)}>
                {u.status === 'active' ? 'Ban Account' : 'Unban'}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
