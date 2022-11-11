import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./../services/authService";
let user = JSON.parse(localStorage.getItem("user"));
let initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  role:"",
  isLogout: false
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.TOKEN;

    try {
      return await authService.register(user,token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const logOut = createAsyncThunk("auth/logoutuser", async (_, thunkAPI) => {
  try {
    console.log(thunkAPI);
    let token = thunkAPI.getState().auth.user.TOKEN;
    return await authService.logout(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export let authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: builder => {
    builder.addCase(register.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = payload;
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
      state.user = null;
    });
    //signin in case
    builder.addCase(signIn.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
      state.role = payload.role;
    });
    builder.addCase(signIn.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
      state.user = null;
      state.isLogout=true;
    });
    builder.addCase(logOut.fulfilled, state => {
      state.user = null;
    });
  },
});

export let { reset } = authSlice.actions;
export default authSlice.reducer;
