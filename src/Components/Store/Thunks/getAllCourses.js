import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";
import { toast } from "react-toastify";

const getAllCourses = createAsyncThunk("/user/allCourses", async () => {
try {
        const res = await axiosInterceptor.get("/user/getAllCourses");
        return res?.data;
} catch (error) {
    toast.error("Error Loading Courses")
    throw error
}
})

export default getAllCourses