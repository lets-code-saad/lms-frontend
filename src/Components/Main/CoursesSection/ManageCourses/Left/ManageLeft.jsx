import { Box, CardMedia, Divider, Typography } from "@mui/material";
import React from "react";
import SchoolIcon from "@mui/icons-material/School"
import { NavLink, Outlet } from "react-router-dom"
import "./ManageLeft.css";
const ManageLeft = ({ showSidebar }) => {
  return (
    <>
      <Box sx={{ height: "80vh" }} className="manageCourseDiv d-flex mt-1">
        <Box
          sx={{ width: "250px",height:"47px" }}
          className="manageCourseNav d-flex flex-column gap-2"
        >
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "active text-decoration-none text-black"
                : "text-decoration-none text-black"
            }
          >
            <Box className="manageCourseNavLink d-flex align-items-center gap-1 py-2 ps-2">
              <CardMedia
                className=""
                sx={{ width: "20px" }}
                component="img"
                image="/imgs/home_icon.svg"
              />
              <Typography className="fs-16">Dashboard</Typography>
            </Box>
          </NavLink>
          <NavLink
            to="/add-course"
            className={({ isActive }) =>
              isActive
                ? "active text-decoration-none text-black"
                : "text-decoration-none text-black"
            }
          >
            <Box className="manageCourseNavLink d-flex align-items-center gap-1 py-2 ps-2 pe-5">
              <CardMedia
                className=""
                sx={{ width: "20px" }}
                component="img"
                image="/imgs/add_icon.svg"
              />
              <Typography className="fs-16">Add Course</Typography>
            </Box>
          </NavLink>
          <NavLink
            to="/my-courses"
            className={({ isActive }) =>
              isActive
                ? "active text-decoration-none text-black"
                : "text-black text-decoration-none"
            }
          >
            <Box className="manageCourseNavLink d-flex align-items-center gap-1 py-2 ps-2 pe-5">
              <SchoolIcon className="" sx={{ width: "20px" }} />
              <Typography className="fs-16">My Courses</Typography>
            </Box>
          </NavLink>
          <NavLink
            to="/enrolled-students"
            className={({ isActive }) =>
              isActive
                ? "active text-decoration-none text-black"
                : "text-black text-decoration-none"
            }
          >
            <Box className="manageCourseNavLink d-flex align-items-center gap-1 py-2 ps-2 pe-5">
              <CardMedia
                className=""
                sx={{ width: "20px" }}
                component="img"
                image="/imgs/person_tick_icon.png"
              />
              <Typography className="fs-16">Student Enrolled </Typography>
            </Box>
          </NavLink>
        </Box>

        <Divider
          className="courseManagerDivider"
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#ddd" }}
        />
      </Box>
    </>
  );
};

export default ManageLeft;
