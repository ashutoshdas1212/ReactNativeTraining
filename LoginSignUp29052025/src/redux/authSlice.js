import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Helper to encode password to base64
const convertBase64 = (str) => {
  if (typeof btoa !== 'undefined') {
    return btoa(str);
  } else if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64');
  } else {
    throw new Error('No base64 encoding available');
  }
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://adminbackend.azurewebsites.net/mobile/1.1.1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password: convertBase64(password),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const validateOtp = createAsyncThunk(
  'auth/validateOtp',
  async ({ id, otp }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://adminbackend.azurewebsites.net/mobile/1.1.1/validateOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, otp }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'OTP validation failed');
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  registeredUsers: [], // { email, password, ... }
  currentUser: null,
  loginId: null,
  loginStatus: 'idle',
  loginError: null,
  otpStatus: 'idle',
  otpError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.registeredUsers.push(action.payload);
    },
    logout: (state) => {
      state.currentUser = null;
      state.loginId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = 'loading';
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = 'succeeded';
        state.loginId = action.payload.id;
        state.currentUser = action.meta.arg.email;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.loginError = action.payload;
      })
      .addCase(validateOtp.pending, (state) => {
        state.otpStatus = 'loading';
        state.otpError = null;
      })
      .addCase(validateOtp.fulfilled, (state, action) => {
        state.otpStatus = 'succeeded';
      })
      .addCase(validateOtp.rejected, (state, action) => {
        state.otpStatus = 'failed';
        state.otpError = action.payload;
      });
  },
});

export const { registerUser, logout } = authSlice.actions;
export default authSlice.reducer;