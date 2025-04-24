import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import ManageLeft from "../../Left/ManageLeft";
import Navbar from "../../../../../Header/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import fetchCourses from "../../../../../Store/Thunks/coursesThunk";
import "./Dashboard.css";
import SkeletonForDashboard from "../../../../../SkeletonLoading/SkeletonForDashboard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.GetUserCourses);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchCourses());
    }, 3000);
  }, []);

  console.log(courses, "courses");

  return (
    <div>
      <Navbar />
      <Box className="DashboardDiv d-flex container">
        <ManageLeft />
        {loading ? (
          <SkeletonForDashboard />
        ) : (
          <>
            {courses.length === 0 ? (
              <TableRow className="w-100">
                <TableCell colSpan={4} className="d-flex text-center justify-content-center flex-column">
                  <Box className="d-flex justify-content-center">
                    <CardMedia
                      component="img"
                      sx={{ width: "360px", textAlign: "center" }}
                      image="/imgs/Nothing found illustration.jpg"
                    />
                  </Box>
                  <Box py={3}>
                    <Typography variant="body1" fontWeight={500}>
                      No courses found.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Start by adding your first course!
                    </Typography>
                    <Link
                      to="/add-course"
                      className="text-black text-decoration-none"
                    >
                      <Button className="iffNoCourseAddCourse bg-blue text-capitalize text-white py-2 px-3 mt-3 fs-15 border-0 w-25">
                        Add Course
                      </Button>
                    </Link>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              <Box className="d-flex flex-column gap-5">
                <Box
                  sx={{ ml: 1 }}
                  className="dashbaordCards mt-4 d-flex align-items-center gap-3"
                >
                  <Box
                    className="dashboardCard1"
                    sx={{
                      border: "1px solid blue",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      borderRadius: "6px",
                      padding: "10px",
                    }}
                  >
                    <Avatar src="/imgs/patients_icon.svg" />
                    <Box className="d-flex flex-column">
                      <Typography className="fs-24" variant="h5">
                        {"14"}
                      </Typography>
                      <Typography className="text-span fs-15" variant="span">
                        {"Total Courses"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    className="dashboardCard1"
                    sx={{
                      border: "1px solid blue",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      borderRadius: "6px",
                      padding: "10px",
                    }}
                  >
                    <Avatar src="/imgs/appointments_icon.svg" />
                    <Box className="d-flex flex-column">
                      <Typography className="fs-24" variant="h5">
                        {"14"}
                      </Typography>
                      <Typography className="text-span fs-15" variant="span">
                        {"Total Enrollments"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    className="dashboardCard1"
                    sx={{
                      border: "1px solid blue",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      borderRadius: "6px",
                      padding: "10px",
                    }}
                  >
                    <Avatar src="/imgs/earning_icon.svg" />
                    <Box className="d-flex flex-column">
                      <Typography className="fs-24" variant="h5">
                        {"14"}
                      </Typography>
                      <Typography className="text-span fs-15" variant="span">
                        {"Total Earnings"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  className="DashboardTable"
                  sx={{ flex: 1, ml: 1, boxShadow: "none" }}
                >
                  <Box className="">
                    <Typography className="fs-18 fw-medium">
                      Latest Enrollments
                    </Typography>
                  </Box>
                  <TableContainer
                    className="border mt-3"
                    sx={{ boxShadow: "none" }}
                    component={Paper}
                  >
                    <Table aria-label="students enrolled table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{ fontWeight: "600", fontSize: "14px" }}
                          >
                            #
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "600", fontSize: "14px" }}
                          >
                            Student Name
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "600", fontSize: "14px" }}
                          >
                            Course Title
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "600", fontSize: "14px" }}
                          >
                            Date
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {courses.map((student, index) => (
                          <TableRow key={student.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                <Avatar
                                  src={`data:image/${student.thumbnail};base64,${student.thumbnail}`}
                                  sx={{ mr: 1 }}
                                />
                                <Typography>{student?.courseTitle}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{student.courseTitle}</TableCell>
                            <TableCell>
                              {new Date(student.createdAt).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </div>
  );
};

export default Dashboard;
