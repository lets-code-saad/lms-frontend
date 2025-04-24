import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";

const signinForAuth = createAsyncThunk("auth/signin", async (data) => {
  try {
    const res = await axiosInterceptor.post(
      "/auth/signinRoute",
      data
    );
    return res?.data;
  } catch (error) {
    toast.error("SIGNIN FAILED");
    throw error;
  }
});

export default signinForAuth;
