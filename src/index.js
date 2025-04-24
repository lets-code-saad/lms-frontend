import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.js";
import AllCourses from "./Components/Main/CoursesSection/AllCourses/AllCourses.jsx";
import SingleCourse from "./Components/Main/CoursesSection/SingleCourse/SingleCourse.jsx";
import { Provider } from "react-redux";
import store from "./Components/Store/Store.js";
import ManageCourses from "./Components/Main/CoursesSection/ManageCourses/ManageCourses.jsx";
import AddCourse from "./Components/Main/CoursesSection/ManageCourses/Right/AddCourse/AddCourse.jsx";
import Dashboard from "./Components/Main/CoursesSection/ManageCourses/Right/Dashboard/Dashboard.jsx";
import MyCourses from "./Components/Main/CoursesSection/ManageCourses/Right/MyCourses/MyCourses.jsx";
import StudentsEnrolled from "./Components/Main/CoursesSection/ManageCourses/Right/StudentsEnrolled/StudentsEnrolled.jsx";
import SkeletonForCards from "./Components/SkeletonLoading/SkeletonForAllCards.jsx";
import Signup from "./Components/Auth/Signup/Signup.jsx";
import Signin from "./Components/Auth/Signin/Signin.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/single-course/:product_id" element={<SingleCourse />} />
        <Route path="/manage-courses" element={<ManageCourses />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/enrolled-students" element={<StudentsEnrolled />} />
        <Route path="/skeleton" element={<SkeletonForCards />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
