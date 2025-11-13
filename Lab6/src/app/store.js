import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import paymentsReducer from '../features/payments/paymentsSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    users: usersReducer,
    payments: paymentsReducer,
  },
});

setupListeners(store.dispatch);
export default store;
