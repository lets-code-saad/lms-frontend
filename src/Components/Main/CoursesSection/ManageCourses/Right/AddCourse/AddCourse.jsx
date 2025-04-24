import React, { useEffect, useState } from "react";
import Navbar from "../../../../../Header/Navbar/Navbar";
import ManageLeft from "../../Left/ManageLeft";
import { Box, Button, CardMedia, TextField, Typography } from "@mui/material";
import "./AddCourse.css";
import { Controller, useForm } from "react-hook-form";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import addCourse from "../../../../../Store/Thunks/addCourseThunk";

const AddCourse = () => {
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

  // storing null because we are getting file, not the string
  const [selectedThumb, setSelectedThumb] = useState(null);
  // loading state
  // const [loading, setLoading] = useState(false);
  const { loading } = useSelector((state) => state.AddCourseSlice);
  // fetching courses api from redux
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("courseTitle", data?.courseTitle);
      formData.append("courseDescription", data?.courseDescription);
      formData.append("coursePrice", data?.coursePrice);
      formData.append("thumbnail", data?.thumbnail);

      const result = await dispatch(addCourse(formData)).unwrap();
      toast.dismiss()
      toast.success("Course Added Successfully", { position: "top-center" });
      setTimeout(() => {
        reset(); //reset the form
        setSelectedThumb(null); // reset the thumbnail
      }, 1000);
    } catch (error) {
      toast.dismiss()
      toast.error("Course Add Failed");
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Box className="addCourseDiv d-flex gap-4 container">
        <ManageLeft />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="inputsFields d-flex flex-column gap-3">
            <Box className="d-flex flex-column">
              <label className="text-border">Course Title</label>
              <Controller
                name="courseTitle"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please Enter The Course Title",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
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
              {errors.courseTitle && (
                <span className="text-danger mt-1">
                  {errors.courseTitle.message}
                </span>
              )}
            </Box>

            <Box className="d-flex flex-column">
              <label className="text-border">Course Description</label>
              <Controller
                name="courseDescription"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please Enter The Course Description",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
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
              {errors.courseDescription && (
                <span className="text-danger mt-1">
                  {errors.courseDescription.message}
                </span>
              )}
            </Box>
            <Box className="thumbnailOrPriceDiv d-flex align-items-center justify-content-between">
              <Box className="d-flex flex-column">
                <label className="text-border">Course Price</label>
                <Controller
                  name="coursePrice"
                  rules={{
                    required: {
                      value: true,
                      message: "Please Enter The Course Price",
                    },
                  }}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      errors={errors?.coursePrice}
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
                          width: "170px",
                          marginRight: "170px",
                          borderRadius: "5px",
                          marginTop: "7px",
                        },
                      }}
                    />
                  )}
                />
                {errors.coursePrice && (
                  <span className="text-danger mt-1">
                    {errors.coursePrice.message}
                  </span>
                )}
              </Box>
              <Box className="d-flex flex-column ">
                <Box className="courseThumbDiv d-flex align-items-center gap-3">
                  <Typography className="fs-15 text-border">
                    Course Thumbnail
                  </Typography>
                  <Controller
                    rules={{
                      required: {
                        value: true,
                        message: "Please Upload A Thumbnail",
                      },
                    }}
                    name="thumbnail"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label htmlFor="thumbnailUplod">
                          <input
                            id="thumbnailUplod"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const url = URL.createObjectURL(file);
                                setSelectedThumb(url);
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
                </Box>
                <Box>
                  {errors.thumbnail && (
                    <Typography variant="body1" className="text-danger pt-4">
                      {errors.thumbnail.message}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
            <Box>
              <Button
                disabled={loading}
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
                  backgroundColor: "black",
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
                {loading ? <div className="spinner-button"></div> : "Add"}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default AddCourse;
