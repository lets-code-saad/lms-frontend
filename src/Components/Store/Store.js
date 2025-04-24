import { configureStore } from "@reduxjs/toolkit";
import GetUserCourses from "./Slices/GetUserCourses";
import SigninSlice from "./Slices/SigninSlice";
import SignupSlice from "./Slices/SignupSlice";
import GetProfileSlice from "./Slices/GetProfileSlice";
import AddCourseSlice from "./Slices/AddCourseSlice";
import GetSingleCourse from "./Slices/GetSingleCourse";
import GetAllCoursesSlice from "./Slices/GetAllCoursesSlice";
import EnrollCourseSlice from "./Slices/EnrollCourseSlice";
import UnEnrollCourseSlice from "./Slices/UnEnrollCourseSlice";

const store = configureStore({
  reducer: {
    GetSingleCourse: GetSingleCourse,
    GetUserCourses: GetUserCourses,
    SignupSlice: SignupSlice,
    SigninSlice: SigninSlice,
    GetProfileSlice: GetProfileSlice,
    AddCourseSlice: AddCourseSlice,
    GetAllCoursesSlice: GetAllCoursesSlice,
    EnrollCourseSlice: EnrollCourseSlice,
    UnEnrollCourseSlice: UnEnrollCourseSlice,
  },
});

export default store;
