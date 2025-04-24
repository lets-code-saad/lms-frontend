import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";
import { toast } from "react-toastify";

const authToProfile = createAsyncThunk("auth/getProfile", async () => {
try {
  const res = await axiosInterceptor.get("/auth/getUserProfile");
  return res?.data; // very important to return the data
} catch (error) {
    toast.error("Sorry User Not Authorized")
    throw error  //important
}
})

export default authToProfile