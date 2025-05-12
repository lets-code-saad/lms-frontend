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
  Skeleton,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddLessonModal from "./AddLessonModal/AddLessonModal";
import getLessonsThunk from "../../../../../../../Store/Thunks/getLessonsThunk";
import SkeletonForLessons from "../../../../../../../SkeletonLoading/SkeletonForLessons";
import { _ } from "ajv";
import deleteLessonThunk from "../../../../../../../Store/Thunks/deleteLessonThunk";
import SearchIcon from "@mui/icons-material/Search";

const ManageCourseModal = (props) => {
  // restructuring props
  const { open, onClose, courseId } = props;
  // managing the second add lesson modal
  const [lessonOpen, setLessonOpen] = useState(false);
  // setting id to disable only the button that is being disabled
  const [deletingLessonId, setDeletingLessonId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (courseId) {
      dispatch(getLessonsThunk({ courseId }));
    }
  }, [dispatch, courseId]);

  const { getLessons, getLessonsLoading } = useSelector(
    (state) => state.GetLessonsSlice
  );

  const { deleteLessonLoading } = useSelector(
    (state) => state.DeleteLessonSlice
  );
  // delete lesson
  const handleDeleteLesson = async (lessonId) => {
    setDeletingLessonId(lessonId);
    try {
      const res = await dispatch(deleteLessonThunk(lessonId)).unwrap();

      toast.success("Lesson Deleted Successfully!");
      setTimeout(() => {
        setDeletingLessonId(null);
        // close modal
        onClose();
      }, 500);
      // refreshing the lessons when delete or add
      dispatch(getLessonsThunk({ courseId }));
    } catch (error) {
      return error;
    }
  };

  // SEARCH FUNCTIONALITY
  const [searchedLessons, setSearchedLessons] = useState([]);
  const [searchedTerm, setSearchedTerm] = useState(""); // empty
  // getting from the redux, so it displays old courses
    useEffect(() => {
      setSearchedLessons(getLessons)
    },[getLessons])
    // when nothing is searched
    useEffect(() => {
      if (searchedTerm === "") {
        setSearchedLessons(getLessons);
      }
    }, [searchedTerm, getLessons])
  // matching the search term with title
  const searchFilterer = () => {
    const matchedQuery = getLessons?.filter((val) =>
      val.lessonTitle?.toLowerCase().includes(searchedTerm.toLowerCase())
    );
    setSearchedLessons(matchedQuery);
    console.log(searchedLessons, "searched lesson");
  };
  
  return (
    <>
      <ToastContainer position="top-center" />

      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>Manage Lessons</DialogTitle>

        <DialogContent>
          {/* Search box */}
          <Box
            sx={{
              display: "flex",
              mt: 3,
            }}
          >
            <TextField
              value={searchedTerm}
              onChange={(e) => setSearchedTerm(e.target.value)}
              fullWidth
              placeholder="Search any lesson"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "1px solid #6B728033",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #6B728033",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #6B728033",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "action.active", mr: 1 }} />
                ),
                sx: {
                  height: 40,
                  marginRight: "170px",
                  borderRadius: "5px 0 0 5px",
                },
              }}
            />
            <Button
              // disabled={loading}
              onClick={searchFilterer}
              variant="contained"
              sx={{
                height: 40,
                paddingX: "50px",
                whiteSpace: "nowrap",
                borderRadius: "0 5px 5px 0",
                fontSize: "15px",
                textTransform: "capitalize",
                backgroundColor: "#2563EB  ",
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
              Search
            </Button>
          </Box>
          <Button
            onClick={() => setLessonOpen(true)}
            className="text-capitalize mt-2"
            sx={{
              width: "100%",
              bgcolor: "#10B981 ",
              color: "white",
              display: "flex",
              gap: "5px",
              mt: "auto",
              ":hover": { bgcolor: "#059669 " },
            }}
          >
            <EditIcon />
            Add Lesson
          </Button>
          {/* CALLING THE ADD LESSON MODAL */}
          <AddLessonModal
            open={lessonOpen}
            courseId={courseId}
            onClose={() => setLessonOpen(false)}
          />
          {/* All Lessons */}
          {getLessonsLoading
            ? [...Array(5)].map((_, i) => (
                <Box
                  key={i}
                  mt={1}
                  p={2}
                  sx={{
                    backgroundColor: "#f0f0f0",
                    borderLeft: "4px solid #ddd",
                    borderRadius: 1,
                  }}
                >
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </Box>
              ))
            : searchedLessons.map((item, index) => (
                <>
                  <Box
                    mt={1}
                    p={2}
                    sx={{
                      backgroundColor: "#f5f5f5",
                      borderLeft: "4px solid #4caf50",
                      borderRadius: 1,
                    }}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <Box className="d-flex align-items-center gap-3">
                      <Typography className="fw-bold" variant="body2">
                        {`Lesson ${index + 1}:`}
                      </Typography>
                      <Typography className="text-capitalize" variant="body2">
                        {item.lessonTitle}
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        sx={{
                          backgroundColor: "transparent",
                          boxShadow: "none",
                          color: "#2563EB",

                          "&:hover": {
                            backgroundColor: "transparent",
                            boxShadow: "none",
                          },
                          "&:focus": {
                            outline: "none",
                            boxShadow: "none",
                            backgroundColor: "transparent",
                          },
                          "&:active": {
                            boxShadow: "none",
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        <EditIcon sx={{ color: "#059669" }} />
                      </Button>
                      {/* DELETE LESSON BUTTON */}
                      <Button
                        disabled={deleteLessonLoading}
                        onClick={() => {
                          handleDeleteLesson(item._id);
                        }}
                        sx={{
                          backgroundColor: "transparent",
                          boxShadow: "none",
                          color: "#2563EB",

                          "&:hover": {
                            backgroundColor: "transparent",
                            boxShadow: "none",
                          },
                          "&:focus": {
                            outline: "none",
                            boxShadow: "none",
                            backgroundColor: "transparent",
                          },
                          "&:active": {
                            boxShadow: "none",
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        <DeleteIcon sx={{ color: "#059669" }} />
                      </Button>
                    </Box>
                  </Box>
                </>
              ))}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="info" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageCourseModal;
