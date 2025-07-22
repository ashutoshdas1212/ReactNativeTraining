import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// Helper function to convert password to base64
const convertBase64 = (str) => {
  return btoa(str);
};

// Async thunk for login API
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const response = await fetch('https://adminbackend.azurewebsites.net/mobile/1.1.1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: convertBase64(password),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

// Async thunk for OTP validation
export const validateOtp = createAsyncThunk(
  'auth/validateOtp',
  async ({id, otp}, {rejectWithValue}) => {
    try {
      const response = await fetch('https://adminbackend.azurewebsites.net/mobile/1.1.1/validateOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'OTP validation failed');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    loginId: null,
    isOtpRequired: false,
    signupData: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loginId = null;
      state.isOtpRequired = false;
      state.error = null;
    },
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
    clearSignupData: (state) => {
      state.signupData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loginId = action.payload.id;
        state.isOtpRequired = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // OTP validation cases
      .addCase(validateOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(validateOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isOtpRequired = false;
        state.loginId = null;
        state.error = null;
      })
      .addCase(validateOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {clearError, logout, setSignupData, clearSignupData} = authSlice.actions;

export default authSlice.reducer;