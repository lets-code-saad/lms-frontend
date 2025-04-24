import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Button,
  Avatar,
  Divider,
  Box,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import BlockIcon from '@mui/icons-material/Block';
import SchoolIcon from "@mui/icons-material/School";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import enrollCourse from "../../../../../Store/Thunks/enrollCourse";
import { toast, ToastContainer } from "react-toastify";
import unEnrollCourse from "../../../../../Store/Thunks/unEnrollCourse";
import authToProfile from "../../../../../Store/Thunks/getProfileThunk";

const ModalEnroll = (props) => {
  // restructuring props
  const {
    open,
    onClose,
    course,
    thumbnail,
    coursePrice,
    courseId,
    user,
    enrollLoading,
    unEnrollLoading,
    isEnrolled
  } = props;

  const dispatch = useDispatch();

  // calling enroll course api
  const handleEnroll = async () => {
    try {
      await dispatch(enrollCourse(courseId)).unwrap();
      toast.success("Enrolled Successfully!");
      // refreshes the page after enrolling
      dispatch(authToProfile())
      onClose();
    } catch (error) {}
  };

  // handling the unenroll call
  const handleUnEnroll = async () => {
    try {
      // it will make the user await
      await dispatch(unEnrollCourse(courseId)).unwrap();
      toast.success("Unenrolled Successfully!");
      // refreshes the page after unenrolling
      dispatch(authToProfile())
      onClose();
    } catch (error) {}
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {isEnrolled
            ? "Cancel Enrollment"
            : "Enroll in Course"}
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={3}>
            {/* Left: Course Image */}
            <Grid item size={{ sm: 12, xs: 12, lg: 3, xl: 3 }}>
              <Avatar
                variant="rounded"
                src={`data:image/${thumbnail};base64,${thumbnail}`}
                alt={course?.title}
                sx={{ width: "100%", height: 140 }}
              />
            </Grid>

            {/* Right: Course Info */}
            <Grid item size={{ sm: 12, xs: 12, lg: 9, xl: 9 }}>
              <Typography variant="h6" fontWeight={600}>
                {course?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                by {course?.instructor?.name || "Instructor"}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <PaymentIcon sx={{ mr: 1 }} />
                {isEnrolled
                  ? "Refund"
                  : "Price:"}{" "}
                <strong style={{ marginLeft: 4 }}>${coursePrice}</strong>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {isEnrolled
                  ? "Are Sure You Want To Cancel The Enrollment?"
                  : " You will pay on delivery. No online payment required."}
              </Typography>
            </Grid>
          </Grid>

          {/* Optional: COD Note */}
          <Box
            mt={4}
            p={2}
            sx={{
              backgroundColor: "#f5f5f5",
              borderLeft: "4px solid #4caf50",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2">
              {isEnrolled ? (
                <BlockIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              ) : (
                <SchoolIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              )}
              This course will be{" "}
              {isEnrolled
                ? "removed"
                : "added"}{" "}
              {isEnrolled
                ? "from"
                : "to"}{" "}
              your account immediately after confirmation.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="info" variant="outlined">
            Cancel
          </Button>
          {user?.userInDB?.enrolledCourses?.includes(courseId) ? (
            <Button
              disabled={unEnrollLoading}
              onClick={handleUnEnroll}
              variant="contained"
              size="large"
              sx={{ backgroundColor: "#F87171" }}
            >
              Unenroll
            </Button>
          ) : (
            <Button
              disabled={enrollLoading}
              onClick={handleEnroll}
              color={"primary"}
              variant="contained"
              size="large"
            >
              Enroll
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalEnroll;
