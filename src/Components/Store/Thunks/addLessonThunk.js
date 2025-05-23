import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";

const addLessonThunk = createAsyncThunk(
  "instructor/addLesson",
  async ({ courseId, formData }, {rejectWithValue}) => {
    try {
      const res = await axiosInterceptor.post(
        `instructor/addLesson/${courseId}`,
        formData
      );
      return res?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: error?.message }
      );
    }
  }
);

export default addLessonThunk;
