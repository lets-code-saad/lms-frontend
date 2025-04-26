import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";
import { toast } from "react-toastify";

const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInterceptor.post("/auth/forgot-password", data);
      return res?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export default forgotPassword;
