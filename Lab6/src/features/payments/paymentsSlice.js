import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/payments');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || 'Lỗi tải payments');
    }
  }
);

export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const res = await api.post('/payments', paymentData);
      return res.data;
    } catch (err) {
      if (err.response && err.response.status === 402) {
        return rejectWithValue('Tài khoản không đủ tiền');
      }
      return rejectWithValue(err.message || 'Không thể tạo payment');
    }
  }
);

export const refundPayment = createAsyncThunk(
  'payments/refundPayment',
  async (paymentId, { rejectWithValue }) => {
    try {
      const res = await api.post(`/payments/${paymentId}/refund`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || 'Refund thất bại');
    }
  }
);

const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchPayments.fulfilled, (state, action) => { state.isLoading = false; state.list = action.payload; })
      .addCase(fetchPayments.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

      .addCase(createPayment.pending, (state) => { state.error = null; })
      .addCase(createPayment.fulfilled, (state, action) => { state.list.push(action.payload); })
      .addCase(createPayment.rejected, (state, action) => { state.error = action.payload; })

      .addCase(refundPayment.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.list.findIndex(p => p.id === updated.id);
        if (idx >= 0) state.list[idx] = updated;
      });
  },
});

export default paymentsSlice.reducer;
