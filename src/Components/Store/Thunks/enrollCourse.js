import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptor from "../../../Middlewares/axiosInterceptor";
import { toast } from "react-toastify";

const enrollCourse = createAsyncThunk("user/enrollCourse", async (course_id) => {
try {
        const result = await axiosInterceptor.post(
          `/user/enrollCourse/${course_id}`
    );
    console.log(result,"result");
    
        return result?.data;
} catch (error) {
toast.error("Error Enrolling In Course!")
    throw error
}
})

export default enrollCourse