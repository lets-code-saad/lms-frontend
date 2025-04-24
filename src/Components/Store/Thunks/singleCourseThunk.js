import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";

const singleCourse = createAsyncThunk("courses/singleCourse", async (product_id) => {
  try {
    const res = await axiosInterceptor.get(
      `/user/getSingleCourse/${product_id}`
    );
    return res?.data
  } catch (error) {
    throw error; // this will make rejected case work properly
  }
});

export default singleCourse;
