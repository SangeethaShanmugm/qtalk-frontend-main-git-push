import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AddBatchSlice from "../services/AddBatchSlice";
let user = JSON.parse(localStorage.getItem("user"));


let initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    role:"",
    isLogout: false,
  batchList:""
  };


  export const batchList = createAsyncThunk("admin/batchList",
  async (user, thunkAPI) => { 
    try {
        return await AddBatchSlice.batchList(user);
     } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
     }
  }
  );

  
  export let BatchListSlice = createSlice({
    name: "batch",
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
        builder.addCase(batchList.pending, state => {
          state.isLoading = true;
        });
        builder.addCase(batchList.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.isLoading = false;
          state.isSuccess = true;
          state.message = payload;
          state.user = payload;
          state.batchList =payload.batchList;
        });
        builder.addCase(batchList.rejected, (state, { payload }) => {
          state.isLoading = false;
          state.isError = true;
          state.message = payload;
          state.user = null;
        });
    },
});
export let { reset } = BatchListSlice.actions;
export default BatchListSlice.reducer;