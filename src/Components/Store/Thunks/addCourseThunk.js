import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";
import { toast } from "react-toastify";

const addCourse = createAsyncThunk("instructor/addCourse", async (data) => {
  try {
    const res = await axiosInterceptor.post("/instructor/addCourse", data);
    return res?.data;
  } catch (error) {
    toast.error("API FAILED");
    throw error; // this will make rejected case work properly
  }
});

export default addCourse;
