import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AddBatchService from "../services/AddBatchSlice";
let user = JSON.parse(localStorage.getItem("user"));

let initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    role:"",
    isLogout: false,
    // data:""
  };

  export const createBatches = createAsyncThunk(
    "admin/createbatch",
    async (user, thunkAPI) => {
        let token = thunkAPI.getState().auth.user.TOKEN;
        console.log(token)
      try {
        return await AddBatchService.CreateBatch(user , token);
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.error) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  export let AddBatchSlice = createSlice({
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
        builder.addCase(createBatches.pending, state => {
          state.isLoading = true;
        });
        builder.addCase(createBatches.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = payload;
          state.user = payload;
        //   state.data =payload.data;
        });
        builder.addCase(createBatches.rejected, (state, { payload }) => {
          state.isLoading = false;
          state.isError = true;
          state.message = payload;
          state.user = null;
        });
    },
});
export let { reset } = AddBatchSlice.actions;
export default AddBatchSlice.reducer;