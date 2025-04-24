import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";

const signupForAuth = createAsyncThunk("/auth/signupPage", async (data) => {
  try {
    const res = await axiosInterceptor.post(
      "/auth/signupRoute",
      data
    );
    return res.data; // returns { message, newUser }
  } catch (error) {
    toast.error("Signup Failed"); // still toast the error
  }
});

export default signupForAuth;
