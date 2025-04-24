import React, { useEffect, useState } from "react";
import "./RightSingle.css";
import {
  Box,
  Button,
  CardMedia,
  Divider,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import AlarmIcon from "@mui/icons-material/Alarm";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useDispatch, useSelector } from "react-redux";
import ModalEnroll from "./ModalEnroll/ModalEnroll";
import singleCourse from "../../../../Store/Thunks/singleCourseThunk";
import enrollCourse from "../../../../Store/Thunks/enrollCourse";
import authToProfile from "../../../../Store/Thunks/getProfileThunk";

const RightSingle = ({ courseId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.GetProfileSlice);
  // checking if the user is enrolled or not using state

  // calling profile api to check if the user is enrolled or not
  useEffect(() => {
    dispatch(authToProfile());
  }, [dispatch]);


  //for opening the payment enroll modal
  const [open, setOpen] = useState(false);

  const { getSingleCourse } = useSelector((state) => state.GetSingleCourse);
  const { enrollLoading } = useSelector(
    (state) => state.EnrollCourseSlice
  );
  const { unEnrollLoading } = useSelector(
    (state) => state.UnEnrollCourseSlice
  );

  // checking if the user is Enrolled or not
  const isEnrolled = user?.userInDB?.enrolledCourses?.includes(courseId)

  return (
    <>
      <Box sx={{ background: "linear-gradient(to bottom, #E6FFFF, #FFFFFF)" }}>
        <Box sx={{ borderRadius: "8px" }} className="border bg-white">
          <CardMedia
            sx={{ overflow: "hidden" }}
            className="img-fluid"
            component="img"
            image={`data:image/${getSingleCourse.thumbnail};base64,${getSingleCourse.thumbnail}`}
            alt="Paella dish"
          />
          <Box className="d-flex flex-column gap-1 px-2 py-1">
            <Box className="d-flex align-items-center gap-1  text-red">
              <AlarmIcon className="fs-18" />
              <Typography className="fs-15" variant="p">
                <b>5 days </b>left at this price!
              </Typography>
            </Box>
            <Box className="d-flex align-items-center gap-3">
              <Typography className="fs-30 fw-bold" variant="h6">
                {getSingleCourse.coursePrice}
              </Typography>
              <Typography
                className="fs-18 text-span text-decoration-line-through"
                variant="p"
              >
                $19.99
              </Typography>
              <Typography
                className="fs-18 text-span text-decoration-line-through"
                variant="p"
              >
                50% Off
              </Typography>
            </Box>
            {/* Rating Component */}
            <Box className="d-flex align-items-center gap-2">
              <Box className="d-flex align-items-center">
                <Rating
                  className="text-red"
                  value={getSingleCourse.ratings}
                  max={1}
                  size="small"
                  name="half-rating-read"
                  readOnly
                />
                <Typography className="fs-13 fw-medium" variant="span">
                  {"4.5"}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box className="d-flex align-items-center gap-1">
                <AccessTimeIcon className="fs-13 text-span" />
                <Typography className="fs-13 text-span" variant="span">
                  {"30 Hours"}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box className="d-flex align-items-center gap-1">
                <AutoStoriesIcon className="fs-13 text-span" />
                <Typography className="fs-13 text-span" variant="span">
                  {"54 Lessons"}
                </Typography>
              </Box>
            </Box>
            {/* Enroll Now Modal Also */}
            {isEnrolled ? (
              <Button
                disabled={unEnrollLoading}
                onClick={() => setOpen(true)}
                variant="contained"
                sx={{
                  height: 40,
                  paddingX: "50px",
                  whiteSpace: "nowrap",
                  borderRadius: "5px",
                  marginTop: "10px",
                  fontSize: "15px",
                  textTransform: "capitalize",
                  backgroundColor: "#F87171",
                  boxShadow: "none",
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
                Cancel Enrollment
              </Button>
            ) : (
              <Button
                disabled={enrollLoading}
                onClick={() => setOpen(true)}
                variant="contained"
                sx={{
                  height: 40,
                  paddingX: "50px",
                  whiteSpace: "nowrap",
                  borderRadius: "5px",
                  marginTop: "10px",
                  fontSize: "15px",
                  textTransform: "capitalize",
                  backgroundColor: "#2563EB",
                  boxShadow: "none",
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
                Enroll Now
              </Button>
            )}

            {/* modal sending open and close as props */}
            <ModalEnroll
              courseId={courseId}
              thumbnail={getSingleCourse?.thumbnail}
              coursePrice={getSingleCourse?.coursePrice}
              author={getSingleCourse?.author}
              user={user}
              open={open}
              isEnrolled={isEnrolled}
              enrollLoading={enrollLoading}
              unEnrollLoading={unEnrollLoading}
              title={getSingleCourse?.courseTitle}
              course={getSingleCourse}
              onClose={() => setOpen(false)}
            />

            <Box className="course-contents d-flex flex-column align-items-start">
              <Typography variant="h6" className="fs-18 mt-2">
                What’s in the course?
              </Typography>
              <ul className="course_contents d-flex flex-column list-unstyled text-span">
                <li>{getSingleCourse.warrantyInformation}</li>
                <li>{getSingleCourse.returnPolicy}</li>
                <li>{getSingleCourse.availabilityStatus}</li>
                <li>{getSingleCourse.shippingInformation}</li>
              </ul>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RightSingle;
