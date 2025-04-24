import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";

const fetchCourses = createAsyncThunk("courses/fetchCourses", async () => {
  try {
    const res = await axiosInterceptor.get("/instructor/getCourses");
    return res?.data?.products;
  } catch (error) {
    throw error; // this will make rejected case work properly
  }
});

export default fetchCourses;
