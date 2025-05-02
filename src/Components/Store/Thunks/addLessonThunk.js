import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";

const addLessonThunk = createAsyncThunk(
  "instructor/addLesson",
  async ({ course_id, formData }) => {
    try {
      const res = await axiosInterceptor.post(
        `instructor/addLesson/${course_id}`,
        formData
      );
      return res?.data;
    } catch (error) {
     throw error;
    }
  }
);

export default addLessonThunk;
