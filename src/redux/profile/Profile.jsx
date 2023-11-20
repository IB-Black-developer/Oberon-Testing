
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
const apiBaseUrl = "https://oberon.neofin.ng/profile";

export const updateData = createAsyncThunk(
  "profile/updateData",
  async (adminData, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `${apiBaseUrl}/update-data/`,
        adminData
    
      );
      console.log(response, "yeahh");
      return response?.data;
    } catch (error) {
      console.log(error, "err");
      return error.response;
    }
  }
);

export const deleteStaff = createAsyncThunk(
  "profile/deleteStaff",
  async (user_id) => {
    try {

      const response = await axiosInstance.delete(
        `${apiBaseUrl}/delete-staff/${user_id}/`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.status);
      return error.response.status;
    }
  }
);

export const updateStaff = createAsyncThunk(
  "profile/updateStaff",
  async ({ user_id, formData }, thunkAPI) => {
    try {
      console.log(formData, "formData");

      const response = await axiosInstance.put(
        `${apiBaseUrl}/update-staff/${user_id}/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.status);
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);

export const switchOnPermissions = createAsyncThunk(
  "profile/switchOnPermissions",
  async (permission_id, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `${apiBaseUrl}/switch-on-permission/${permission_id}`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  }
);

export const removePermissions = createAsyncThunk(
  "profile/removePermissions",
  async (permission_id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        `${apiBaseUrl}/remove-permission/${permission_id}`
      );
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error.response.status);
      return error.response.status;
    }
  }
);

export const updateOrganisation = createAsyncThunk(
  "profile/updateOrganisation",
  async (adminData) => {
    try {
      const response = await axiosInstance.put(
        `${apiBaseUrl}/update-organization/`,
        adminData
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const getOrganisation = createAsyncThunk(
  "profile/getOrganisation",
  async () => {
    try {
      const response = await axiosInstance.get(`${apiBaseUrl}/get-organization/`);
      console.log(response);
      return response?.data;
    } catch (error) {
      console.log(error.response.status);
      return error.response.status;
    }
  }
);

export const getProfile = createAsyncThunk("profile/getProfile", async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axiosInstance.get(`${apiBaseUrl}/get-profile/`);
    console.log(response);
    return response?.data;
  } catch (error) {
    console.log(error.response.status);
    return error.response;
  }
});

export const searchAllUsers = createAsyncThunk(
  "profile/searchAllUsers",
  async () => {
    try {
      const response = await axiosInstance.post(`${apiBaseUrl}/search-users/`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.status);
      return error.response.status;
    }
  }
);

export const allUsers = createAsyncThunk("profile/allUsers", async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axiosInstance.get(`${apiBaseUrl}/all-users/`);
    console.log(response);
    return response?.data;
  } catch (error) {
    console.log(error.response);
    return error.response.status;
  }
});

export const getStaff = createAsyncThunk(
  "profile/getStaff",
  async (user_id) => {
    try {
      const response = await axiosInstance.get(`${apiBaseUrl}/get-staff/${user_id}/`);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response.status);
      return error.response.status;
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    profile: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateData.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(updateData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteStaff.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateStaff.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(switchOnPermissions.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(switchOnPermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(switchOnPermissions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(removePermissions.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(removePermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(removePermissions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateOrganisation.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateOrganisation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(updateOrganisation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getOrganisation.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getOrganisation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getOrganisation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(searchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(searchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(searchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(allUsers.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getStaff.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(getStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default profileSlice.reducer;
