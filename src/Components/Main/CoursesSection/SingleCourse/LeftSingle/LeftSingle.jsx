import { Box, Grid, Rating, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AlarmIcon from "@mui/icons-material/Alarm";
import CourseStructure from "./CourseStructure/CourseStructure";
import { useDispatch, useSelector } from "react-redux";
import singleCourse from "../../../../Store/Thunks/singleCourseThunk";
import formatName from "../../../../Utils/FormatName";

const LeftSingle = ({ courseId, getSingleCourse, isEnrolled }) => {
  const dispatch = useDispatch();
  // generating random value < 5 for rating component
  const randomRatingValue = (Math.random() * 4 + 1).toFixed(2); // it will fix it to just 2 digits
  const randomRatedUsers = Math.ceil(Math.random() * 1000 + 1);
  const username = getSingleCourse?.user?.username;
  console.log(username, "username");

  return (
    <>
      <Box>
        <Box className="left-head d-flex flex-column gap-2">
          <Box>
            <Typography className="fs-40 mt-3 fw-semibold" variant="p">
              {getSingleCourse?.courseTitle}
            </Typography>
          </Box>
          <Box>
            <Typography className="fs-15 mt-3" variant="p">
              {getSingleCourse?.courseDescription}
            </Typography>
          </Box>
          {/* Rating Component */}
          <Box className="d-flex align-items-center gap-2">
            <Typography className="fs-13 fw-medium" variant="span">
              {randomRatingValue}
            </Typography>
            <Rating
              className="text-red"
              size="small"
              name="half-rating-read"
              value={parseFloat(randomRatingValue)}
              precision={0.5}
              readOnly
            />
            <Typography className="fs-13 text-blue" variant="span">
              ({randomRatedUsers})
            </Typography>
          </Box>
          <Box className="d-flex align-items-center gap-1">
            <Typography className="fs-13 ">Course By</Typography>
            <Typography className="fs-13 text-blue" variant="span">
              ({formatName(username)})
            </Typography>
          </Box>
          {/* Course Structure Component */}
          <Box className="mt-4">
            <CourseStructure
              getSingleCourse={getSingleCourse}
              isEnrolled={isEnrolled}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LeftSingle;
