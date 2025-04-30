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
import "./MyCourses.css";
import SkeletonForTable from "../../../../../SkeletonLoading/SkeletonForTable";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalDeleteCourse from "./ModalDeleteCourse/ModalDeleteCourse";

const MyCourses = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.GetUserCourses);
  // const {loading} = useState((state)=>state.GetCourses)
console.log(courses, "courses");

  useEffect(() => {
      dispatch(fetchCourses());
  }, [dispatch]);

  // handling the modal 
  const [open,setOpen] = useState(false)
// storing the course id
const [selectedCourseId, setSelectedCourseId] =useState(null)

  return (
    <div>
      <Navbar />
      <Box className="MyCoursesDiv d-flex container">
        <ManageLeft />

        <Box
          className="MyCoursesTable"
          sx={{ flex: 1, ml: 1, boxShadow: "none" }}
        >
          {loading ? (
            <SkeletonForTable />
          ) : (
            <TableContainer
              className="border"
              sx={{ boxShadow: "none" }}
              component={Paper}
            >
              <Table aria-label="students enrolled table">
                <TableHead>
                  {courses?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
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
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: "600", fontSize: "14px" }}
                      >
                        #
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: "600", fontSize: "14px" }}
                      >
                        All Courses
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: "600", fontSize: "14px" }}
                      >
                        Earnings
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: "600", fontSize: "14px" }}
                      >
                        Students
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontWeight: "600", fontSize: "14px" }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  )}
                </TableHead>

                <TableBody>
                  {courses?.map((student, index) => (
                    <TableRow key={student._id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Avatar
                            src={`data:image/${student.thumbnail};base64,${student.thumbnail}`}
                            sx={{ mr: 1 }}
                          />
                          <Typography className="courseTitle">
                            {student.courseTitle}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        {student.coursePrice}
                      </TableCell>
                      <TableCell align="center">
                        {student.enrolledStudentCount}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => {
                            setOpen(true);
                            setSelectedCourseId(student._id);
                          }}
                          sx={{
                            boxShadow: "none",
                            "&:hover": {
                              backgroundColor: "inherit",
                              boxShadow: "none",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                {/* calling the delete modal */}
                <ModalDeleteCourse
                  open={open}
                  courseId={selectedCourseId}
                  onClose={() => setOpen(false)}
                />
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default MyCourses;
