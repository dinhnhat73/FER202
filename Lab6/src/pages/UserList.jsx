import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, toggleUserStatus } from '../features/users/usersSlice';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import ConfirmModal from '../components/ConfirmModal';
import { Pagination } from 'react-bootstrap';

const ITEMS_PER_PAGE = 5;

const UserList = () => {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector(state => state.users);
  const [filter, setFilter] = useState({ q: '', role: '', status: '', sortBy: '' });
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const onFilter = (f) => {
    setPage(1);
    setFilter(f);
  };

  const filteredUsers = useMemo(() => {
    let out = [...list];
    if (filter.q) {
      const q = filter.q.toLowerCase();
      out = out.filter(u => (u.username + ' ' + (u.fullName || '')).toLowerCase().includes(q));
    }
    if (filter.role) out = out.filter(u => u.role === filter.role);
    if (filter.status) out = out.filter(u => u.status === filter.status);
    if (filter.sortBy === 'username_asc') out.sort((a,b) => a.username.localeCompare(b.username));
    if (filter.sortBy === 'username_desc') out.sort((a,b) => b.username.localeCompare(a.username));
    return out;
  }, [list, filter]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const pagedUsers = filteredUsers.slice(start, start + ITEMS_PER_PAGE);

  const handleView = (u) => {
    alert(`User details:\nID: ${u.id}\nUsername: ${u.username}\nFullName: ${u.fullName}\nRole: ${u.role}\nStatus: ${u.status}`);
  };

  const handleBanClick = (u) => {
    setSelectedUser(u);
    setShowModal(true);
  };

  const confirmBan = async () => {
    if (!selectedUser) return;
    await dispatch(toggleUserStatus(selectedUser.id));
    setShowModal(false);
  };

  return (
    <div>
      <h3>User Management</h3>
      <UserFilter onFilter={onFilter} />
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <UserTable users={pagedUsers} onView={handleView} onBan={handleBanClick} />

      {totalPages > 1 && (
        <Pagination>
          {[...Array(totalPages).keys()].map(i => (
            <Pagination.Item
              key={i}
              active={i + 1 === page}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}

      <ConfirmModal
        show={showModal}
        title="Xác nhận thay đổi trạng thái"
        message={selectedUser
          ? `Bạn có chắc muốn ${selectedUser.status === 'active' ? 'khóa' : 'mở khóa'} tài khoản "${selectedUser.username}" không?`
          : ''}
        onCancel={() => setShowModal(false)}
        onConfirm={confirmBan}
      />
    </div>
  );
};

export default UserList;
