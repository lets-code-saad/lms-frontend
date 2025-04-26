import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";
import { toast } from "react-toastify";

const resetPassword = createAsyncThunk("auth/reset-password", async ({data}, {rejectWithValue}) => {
  try {
    const res = await axiosInterceptor.post("/auth/reset-password", data);
    return res?.data;
  } catch (error) {
return rejectWithValue(error?.response?.data || "Something Went Wrong")
  }
});

export default resetPassword;
