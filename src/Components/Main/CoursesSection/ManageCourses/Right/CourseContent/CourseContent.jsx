import React, { useEffect, useState } from "react";
import Navbar from "../../../../../Header/Navbar/Navbar";
import ManageLeft from "../../Left/ManageLeft";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "./CourseContent.css";
import { Controller, useForm } from "react-hook-form";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import addCourse from "../../../../../Store/Thunks/addCourseThunk";
import LessonsSidebar from "./LessonsSidebar/LessonsSidebar";
import { Link } from "react-router-dom";
import fetchCourses from "../../../../../Store/Thunks/coursesThunk";


const CourseContent = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseTitle: "",
      courseDescription: "",
      coursePrice: "",
      thumbnail: null,
    },
  });
  const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.AddCourseSlice);
    // fetching courses api from redux
  const { courses } = useSelector((state) => state.GetUserCourses);
  // fetching courses so that it continuosly checks if there is course
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const [lessons, setLessons] = useState([
    { lessonTitle: "", lessonDescription: "", lessonVideoURL: null },
  ]);
  const [currLessonIndex, setCurrLessonIndex] = useState(null);
  const [currentLesson, setCurrentLesson] = useState({
    lessonTitle: "",
    lessonDescription: "",
    lessonVideoURL: null,
  });

  const handleSave = (e) => {
    if (currLessonIndex !== null) {
      // updating current lesson
      const updatedLesson = [...lessons];
      updatedLesson[currLessonIndex] = currentLesson;
      setLessons(updatedLesson);
      toast.success("Lesson Updated!");
    } else {
      // adding new lesson
      setLessons([...lessons, currentLesson]);
    }
    // resetting the form after a delay
    setTimeout(() => {
      // resetting current lesson
      setCurrentLesson({
        lessonTitle: "",
        lessonDescription: "",
        lessonVideoURL: null,
      });
      // resetting the index also
      setCurrLessonIndex(null);
    },300)
  };


  const handleChange = (e) => {
    const { value, name } = e.target;
    // updates the field , with latest value

    setCurrentLesson((prev) => ({ ...prev, [name]: value }));
  };
  // handlinjg lesson click
  const handleLessonClick = (index) => {
    setCurrentLesson(lessons[index]);
    setCurrLessonIndex(index);
    reset({
      lessonTitle: lessons[index].lessonTitle || "",
      lessonDescription: lessons[index].lessonDescription || "",
      lessonVideoURL: lessons[index].lessonVideoURL || null,
    });
  };

  // storing null because we are getting file, not the string
  const [selectedThumb, setSelectedThumb] = useState(null);

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Box className="d-flex gap-2 container">
        <Box className="addCourseDiv">
          <ManageLeft />
        </Box>
        {courses.length === 0 ? (
          <Box className="w-100 d-flex flex-column align-items-center py-5">
            <Box className="d-flex justify-content-center">
              <CardMedia
                component="img"
                sx={{ width: "360px", textAlign: "center" }}
                image="/imgs/Nothing found illustration.jpg"
              />
            </Box>
            <Box py={3} className="text-center">
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
                <Button className="iffNoCourseAddCourse bg-blue text-capitalize text-white py-2 px-3 mt-3 fs-15 border-0">
                  Add Course
                </Button>
              </Link>
            </Box>
          </Box>
        ) : (<Grid
          className="w-100"
          container
          spacing={3}
          justifyContent={"space-between"}
        >
          <Grid item size={{ xs: 12, sm: 6, lg: 3, xl: 3 }}>
            {/* Calling the sidebar */}
            <LessonsSidebar
              currLessonIndex={currLessonIndex}
              setCurrLessonIndex={setCurrLessonIndex}
              handleLessonClick={handleLessonClick}
              lessons={lessons}
              setLessons={setLessons}
              currentLesson={currentLesson}
              setCurrentLesson={setCurrentLesson}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, lg: 9, xl: 9 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box className="inputsFields d-flex flex-column gap-3">
                {/* TITLE */}
                <Box className="d-flex flex-column">
                  <label className="text-border">Lesson Title</label>
                  <Controller
                    name="lessonTitle"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Please Enter The Lesson Title",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        name="lessonTitle"
                        value={currentLesson.lessonTitle}
                        onChange={handleChange}
                        error={errors.courseTitle}
                        placeholder="Type Here"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              border: "1px solid #25252580",
                            },
                            "&:hover fieldset": {
                              border: "1px solid #25252580",
                            },
                            "&.Mui-focused fieldset": {
                              border: "1px solid #25252580",
                            },
                          },
                        }}
                        InputProps={{
                          sx: {
                            height: 40,
                            marginRight: "170px",
                            borderRadius: "5px",
                            marginTop: "7px",
                          },
                        }}
                      />
                    )}
                  />
                  {errors.lessonTitle && (
                    <span className="text-danger mt-1">
                      {errors.lessonTitle.message}
                    </span>
                  )}
                </Box>
                {/* DESCRIPTION */}
                <Box className="d-flex flex-column">
                  <label className="text-border">Lesson Description</label>
                  <Controller
                    name="lessonDescription"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Please Enter The Lesson Description",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        name="lessonDescription"
                        value={currentLesson.lessonDescription}
                        fullWidth
                        onChange={handleChange}
                        multiline
                        rows={4}
                        errors={errors?.courseDescription}
                        placeholder="Type Here"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              border: "1px solid #25252580",
                            },
                            "&:hover fieldset": {
                              border: "1px solid #25252580",
                            },
                            "&.Mui-focused fieldset": {
                              border: "1px solid #25252580",
                            },
                          },
                        }}
                        InputProps={{
                          sx: {
                            marginRight: "170px",
                            borderRadius: "5px",
                            marginTop: "7px",
                          },
                        }}
                      />
                    )}
                  />
                  {errors.lessonDescription && (
                    <span className="text-danger mt-1">
                      {errors.lessonDescription.message}
                    </span>
                  )}
                </Box>
                <Box className="thumbnailOrPriceDiv d-flex align-items-center justify-content-between">
                  <Box className="courseThumbDiv d-flex align-items-center gap-3">
                    <Typography className="fs-15 text-border">
                      Upload Video
                    </Typography>
                    <Controller
                      rules={{
                        required: {
                          value: true,
                          message: "Please Upload A Video Of Lesson",
                        },
                      }}
                      name="lessonVideoURL"
                      control={control}
                      render={({ field }) => (
                        <>
                          <label htmlFor="thumbnailUplod">
                            <input
                              name="lessonVideoURL"
                              // value={currentLesson.lessonVideoURL}
                              id="thumbnailUplod"
                              type="file"
                              accept="video/*"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                const file = e.target.files[0];

                                if (file) {
                                  const url = URL.createObjectURL(file);
                                  setCurrentLesson({
                                    ...currentLesson,
                                    lessonVideoURL: url,
                                  });
                                  field.onChange(file); // important!
                                }
                              }}
                            />

                            <Button
                              component="span"
                              type="button"
                              variant="contained"
                              sx={{
                                width: "10px",
                                // paddingX: "50px",
                                whiteSpace: "nowrap",
                                borderRadius: "5px",
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
                              {selectedThumb ? (
                                <ChangeCircleIcon className="fs-30" />
                              ) : (
                                <CardMedia
                                  sx={{ width: "30px" }}
                                  component="img"
                                  image="/imgs/file_upload_icon.svg"
                                />
                              )}
                            </Button>
                          </label>
                          <CardMedia
                            sx={{ width: "50px" }}
                            component="img"
                            image={selectedThumb}
                          />
                        </>
                      )}
                    />
                    <Box>
                      {errors.thumbnail && (
                        <Typography
                          variant="body1"
                          className="text-danger pt-4"
                        >
                          {errors.thumbnail.message}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Button
                    disabled={loading}
                    onClick={handleSave}
                    type="submit"
                    variant="contained"
                    sx={{
                      height: 40,
                      paddingX: "30px",
                      whiteSpace: "nowrap",
                      borderRadius: "5px",
                      fontSize: "15px",
                      marginTop: "20px",
                      textTransform: "uppercase",
                      backgroundColor: "#a5a3a3",
                      boxShadow: "none",
                      textTransform: "capitalize",
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
                    {loading ? (
                      <div className="spinner-button"></div>
                    ) : (
                      "Save Lesson"
                    )}
                  </Button>
                </Box>
              </Box>
            </form>
          </Grid>
        </Grid>)}
      </Box>
    </div>
  );
};

export default CourseContent;
