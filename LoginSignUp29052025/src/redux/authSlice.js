import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {encode as btoa} from 'base-64';

// Utility for base64 encoding (for password)
const encodePassword = password => {
  return btoa(password);
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const base64Password = encodePassword(password);
      const response = await fetch(
        'https://adminbackend.azurewebsites.net/mobile/1.1.1/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password: base64Password,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok || !data.status) {
        return rejectWithValue(data.message || 'Login failed');
      }

      return {
        id: data.data?.id,
        otp: data.data?.otp,
        user: data.data,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for OTP validation
export const validateOTP = createAsyncThunk(
  'auth/validateOTP',
  async ({id, otp}, {rejectWithValue}) => {
    try {
      const response = await fetch(
        'https://adminbackend.azurewebsites.net/mobile/1.1.1/validateOtp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, otp}),
        },
      );

      const data = await response.json();
      if (!response.ok || !data.status) {
        return rejectWithValue(data.message || 'OTP validation failed');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // User object after login/OTP
    id: null, // User ID
    otp: null, // OTP value
    token: null, // JWT token for authenticated requests
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
   
    logout: state => {
      state.user = null;
      state.id = null;
      state.otp = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      // Login flow
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.otp = action.payload.otp;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        if (
          action.payload &&
          typeof action.payload === 'string' &&
          action.payload.toLowerCase().includes('multiple attempts')
        ) {
          state.error = null;
        } else {
          state.error = action.payload;
        }
      })
      // OTP validation flow
      .addCase(validateOTP.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.token =
          action.payload.token || action.payload.data?.token || null;
      })
      .addCase(validateOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
