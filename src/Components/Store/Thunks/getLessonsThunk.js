import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";

const getLessonsThunk = createAsyncThunk(
  "instructor/getLessons",
  async ({courseId}, { rejectWithValue }) => {
    try {
      const res = await axiosInterceptor.get(
        `instructor/getLessons/${courseId}`
      );
      console.log(res, "response");
      return res?.data;
      
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: error?.message }
      );
    }
  }
);

export default getLessonsThunk;
