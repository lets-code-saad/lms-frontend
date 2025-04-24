import {
  Box,
  Button,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./TopCourses.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SkeletonForLoading from "../../../SkeletonLoading/SkeletonForAllCards";
import SkeletonForCards from "../../../SkeletonLoading/SkeletonForCards";
import getAllCourses from "../../../Store/Thunks/getAllCourses";

const Courses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // parenthesis because it is a function
  dispatch(getAllCourses())
},[dispatch])

  const { allCourses, loading } = useSelector(
    (state) => state.GetAllCoursesSlice
  );

  return (
    <>
      <Box sx={{ marginTop: "90px" }} className="container">
        <Box className="coursesHead_lg">
          <Box className="text-center">
            <Typography className="fs-30 mt-3 fw-semibold" variant="p">
              Learn from the best
            </Typography>
          </Box>
          <Box className="text-center mt-1">
            <Typography className="fs-15 " variant="p">
              Discover our top-rated courses across various categories. From
              coding and design to <br /> business and wellness, our courses are
              crafted to deliver results.
            </Typography>
          </Box>
        </Box>
        {/* SMALL SCREEN HEADINGS */}
        <Box className="coursesHead_sm">
          <Box className="text-center">
            <Typography className="fs-30 mt-3 fw-semibold" variant="p">
              Learn from the best
            </Typography>
          </Box>
          <Box className="text-center">
            <Typography className="fs-15 mt-3" variant="p">
              Discover our top-rated courses across various categories. From
              coding and design to business and wellness, our courses are
              crafted to deliver results.
            </Typography>
          </Box>
        </Box>
        {/* Courses Cards */}
        <Box sx={{ marginTop: "40px" }} className="courseCards">
          <Grid container spacing={2}>
            {loading ? (
              <SkeletonForCards />
            ) : (
              allCourses?.slice(0, 4)?.map((items) => {
                return (
                  <Grid
                    sx={{ borderRadius: "8px" }}
                    className="border bg-white"
                    item
                    size={{ xs: 12, sm: 6, lg: 3, xl: 2 }}
                  >
                    <Link
                      className="text-decoration-none text-black"
                      to={`/single-course/${items._id}`}
                    >
                      <Box>
                        <CardMedia
                          sx={{ overflow: "hidden" }}
                          className="img-fluid"
                          component="img"
                          image={`data:image/${items?.thumbnail};base64,${items?.thumbnail}`}
                          alt="Paella dish"
                        />
                        <Box className="d-flex flex-column gap-1 px-2 py-1">
                          <Typography className="fw-bold fs-15" variant="h6">
                            {items?.courseTitle}
                          </Typography>
                          <Typography
                            className="fs-13 text-span-2"
                            variant="span"
                          >
                            {items.author}
                          </Typography>
                          {/* Rating Component */}
                          <Box className="d-flex align-items-center gap-2">
                            <Typography
                              className="fs-13 fw-medium"
                              variant="span"
                            >
                              {items.rating}
                            </Typography>
                            <Rating
                              className="text-red"
                              size="small"
                              name="half-rating-read"
                              defaultValue={2.5}
                              precision={0.5}
                              readOnly
                            />
                            <Typography
                              className="fs-13 text-span"
                              variant="span"
                            >
                              {items.noOfRatings}
                            </Typography>
                          </Box>
                          <Typography className="fs-16 fw-bold" variant="h6">
                            {items.Courseprice}
                          </Typography>
                        </Box>
                      </Box>
                    </Link>
                  </Grid>
                );
              })
            )}
          </Grid>
          <Box sx={{ marginTop: "50px" }} className="text-center">
            <Link to="/all-courses">
              <Button
                disabled={loading}
                variant="contained"
                sx={{
                  height: 40,
                  paddingX: "30px",
                  whiteSpace: "nowrap",
                  border: "1px solid #8A8C8F",
                  borderRadius: "5px",
                  fontSize: "15px",
                  textTransform: "unset",
                  background: "none",
                  boxShadow: "none",
                  color: "#8A8C8F",
                  "&:hover": {
                    boxShadow: "none",
                  },

                  // On focus: no outline, no border glow
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },

                  // On active (click/press): no visual push effect
                  "&:active": {
                    boxShadow: "none",
                  },
                }}
              >
                Show all courses
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Courses;
