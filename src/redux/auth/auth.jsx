// adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

const apiBaseUrl = "https://oberon.neofin.ng/register";
const apiBaseUrlAuth = "https://oberon.neofin.ng/auth";

export const registerAdmin = createAsyncThunk(
  "admin/register",
  async (adminData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `${apiBaseUrl}/start-admin-registration/`,
        adminData
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.status);
      return error.response.status;
    }
  }
);

export const registerStaff = createAsyncThunk(
  "admin/registerStaff",
  async (adminData, thunkAPI) => {
    try {
     const response = await axiosInstance.post(
        `${apiBaseUrl}/add-staff/`,
        adminData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  }
);

export const resendOTP = createAsyncThunk("admin/resendOTP", async (email) => {
  try {
    const response = await axiosInstance.post(
      `${apiBaseUrl}/resend-otp/`,
      email
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response.status);
    return error.response.status;
  }
});

export const changePassword = createAsyncThunk(
  "admin/changePassword",
  async (adminData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `${apiBaseUrlAuth}/change-password/`,
        adminData
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.status);
      return error.response.status;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "admin/forgotPassword",
  async (adminData, thunkAPI) => {
    try {
      console.log(adminData);
      const response = await axiosInstance.post(
        `${apiBaseUrlAuth}/request-password-reset/`,
        adminData
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error(error.response);
      return error?.response;
    }
  }
);

export const confirmPasswordReset = createAsyncThunk(
  "admin/confirmPasswordReset",
  async (adminData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `${apiBaseUrlAuth}/confirm-password-reset/`,
        adminData
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.status);
      return error.response.status;
    }
  }
);

export const login = createAsyncThunk(
  "admin/login",
  async (adminData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `${apiBaseUrlAuth}/login/`,
        adminData
      );
      localStorage.setItem("accessToken", response?.data?.access_token);
      return response;
    } catch (error) {
      console.log(error.response.status);
      return error.response.status;
    }
  }
);

export const completeAdminRegistration = createAsyncThunk(
  "admin/logcompleteAdminRegistrationin",
  async (adminData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `${apiBaseUrl}/com/`,
        adminData
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.status);
      return error.response.status;
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    user: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(registerStaff.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(registerStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(confirmPasswordReset.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(confirmPasswordReset.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(confirmPasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload?.data?.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(completeAdminRegistration.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(completeAdminRegistration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(completeAdminRegistration.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default adminSlice.reducer;
