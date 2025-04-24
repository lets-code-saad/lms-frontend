import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";
import { toast } from "react-toastify";

const unEnrollCourse = createAsyncThunk(
  "user/unEnrollCourse",
  async (course_id) => {
    try {
      const result = await axiosInterceptor.post(
        `/user/unEnrollCourse/${course_id}`
      );

      return result?.data;
    } catch (error) {
      toast.error("Error Unenrolling In Course!");
      throw error;
    }
  }
);

export default unEnrollCourse;