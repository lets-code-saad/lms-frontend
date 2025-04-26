import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";
import { toast } from "react-toastify";

const deleteCourse = createAsyncThunk(
  "instructor/delete-course",
  async (course_id, { rejectWithValue }) => {
    try {
      const res = await axiosInterceptor.post(
        `/instructor/delete-course/${course_id}`
      );
      return res?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export default deleteCourse;
