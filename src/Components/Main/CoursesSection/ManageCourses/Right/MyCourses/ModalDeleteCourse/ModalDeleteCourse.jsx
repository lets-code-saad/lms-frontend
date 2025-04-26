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
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import deleteCourse from "../../../../../../Store/Thunks/deleteCourseThunk";
import { useState } from "react";
import fetchCourses from "../../../../../../Store/Thunks/coursesThunk";

const ModalDeleteCourse = (props) => {
  // restructuring props
  const {
    open,
    onClose,
    courseId
  } = props;

  const dispatch = useDispatch();

  const { deleteCallLoading, deleteUser } = useSelector((state) => state.DeleteCourseSlice)

  const handleDeleteCourse = async () => {
  try {
    const res = await dispatch(deleteCourse(courseId)).unwrap();
    toast.success(res?.message || "Course deleted successfully!");
    onClose(); // modal will close after successful call
    // callilng fetchCourses to update the page, when the course deletes
dispatch(fetchCourses())
  } catch (error) {
    const errorMsg = error?.message
    toast.error(errorMsg);
  }
}

  return (
    <>
      <ToastContainer position="top-center" />

        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "12px",
              boxShadow: "none",
              overflow: "visible",
            },
          }}
          BackdropProps={{
            sx: {
              backgroundColor: "rgba(0,0,0,0.05)",
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: "bold", p: 2 }}>
            Delete Course
          </DialogTitle>

          <Divider
            sx={{ marginTop: "0px" }}
            orientation="horizontal"
            component="div"
          />

          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this course?
            </Typography>
          </DialogContent>

          <DialogActions sx={{}}>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                minWidth: "120px",
                borderRadius: "8px",
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={deleteCallLoading}
              onClick={handleDeleteCourse}
              variant="contained"
              sx={{
                minWidth: "120px",
                borderRadius: "8px",
                backgroundColor: "#F87171",
                "&:hover": {
                  backgroundColor: "#EF4444",
                },
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

    </>
  );
};

export default ModalDeleteCourse;
