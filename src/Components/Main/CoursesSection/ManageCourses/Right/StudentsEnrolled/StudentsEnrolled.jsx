import React, { useEffect } from "react";
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
  Button,
  CardMedia,
} from "@mui/material";
import ManageLeft from "../../Left/ManageLeft";
import Navbar from "../../../../../Header/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import fetchCourses from "../../../../../Store/Thunks/coursesThunk";
import "./StudentsEnrolled.css";
import SkeletonForTable from "../../../../../SkeletonLoading/SkeletonForTable";
import { Link } from "react-router-dom";

const StudentsEnrolled = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.GetUserCourses);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchCourses());
    }, 1500);
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Box className="studentsEnrolledDiv d-flex container">
        <ManageLeft />

        <Box
          className="studentsEnrolledTable"
          sx={{ flex: 1, ml: 1, boxShadow: "none" }}
        >
          {loading ? (
            <SkeletonForTable />
          ) : courses.length === 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
              py={5}
              sx={{ minHeight: "60vh" }}
            >
              <CardMedia
                component="img"
                sx={{ width: "360px", mb: 2 }}
                image="/imgs/Nothing found illustration.jpg"
              />
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
                <Button className="bg-blue text-capitalize text-white py-2 px-3 mt-3 fs-15 border-0">
                  Add Course
                </Button>
              </Link>
            </Box>
          ) : (
            <TableContainer
              className="border"
              sx={{ boxShadow: "none" }}
              component={Paper}
            >
              <Table aria-label="students enrolled table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                      #
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                      Student Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
                      Course Title
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600", fontSize: "14px" }}>
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
                          <Avatar src={student.thumbnail} sx={{ mr: 1 }} />
                          <Typography>{student.category}</Typography>
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
          )}
        </Box>
      </Box>
    </div>
  );
};

export default StudentsEnrolled;
