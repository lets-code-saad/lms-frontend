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
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useForm } from "react-hook-form";
import addLessonThunk from "../../../../../../../../Store/Thunks/addLessonThunk";
import getLessonsThunk from "../../../../../../../../Store/Thunks/getLessonsThunk";

const AddLessonModal = (props) => {
  const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      defaultValues: {
        lessonTitle: "",
        lessonDescription: "",
        lessonVideoURL: null,
      },
    });
  
  // restructuring props
  const { open, onClose, courseId } = props;

  const dispatch = useDispatch();

  // restructuring lessons
  const { stateLessons, addLessonLoading } = useSelector(
    (state) => state.AddLessonSlice
  );
  console.log("Lessons", stateLessons);
  
    
  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append("lessonTitle", data?.lessonTitle)
    formData.append("lessonDescription", data?.lessonDescription);
    formData.append("lessonVideoURL", data?.lessonVideoURL);

    const res = await dispatch(addLessonThunk({ courseId, formData })).unwrap()
      toast.success("Lesson Added Successfully!")
    setTimeout(() => {
      onClose()
    },500)
        console.log("Form data:", data);
    reset();
    dispatch(getLessonsThunk({courseId}))
      };
    
  return (
    <>
      <ToastContainer position="top-center" />

      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>Add Lesson</DialogTitle>

        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box className="inputsFields d-flex flex-column gap-3">
                {/* TITLE */}
                <Box className="d-flex flex-column">
                  <label className="text-border">Lesson Title</label>
                  <Controller
                    name="lessonTitle"
                    control={control}
                    rules={{
                      required: "Please Enter The Lesson Title",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        error={!!errors.lessonTitle}
                        // helperText={errors.lessonTitle?.message}
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
                </Box>
                {/* Error */}
                {errors.lessonTitle && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ mt: -1, ml: 0 }} // ensures left alignment
                  >
                    {errors.lessonTitle.message}
                  </Typography>
                )}
                {/* DESCRIPTION */}
                <Box className="d-flex flex-column">
                  <label className="text-border">Lesson Description</label>
                  <Controller
                    name="lessonDescription"
                    control={control}
                    rules={{
                      required: "Please Enter The Lesson Description",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={4}
                        error={!!errors.lessonDescription}
                        // helperText={errors.lessonDescription?.message}
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
                </Box>
                {/* Error */}
                {errors.lessonDescription && (
                  <Typography
                    color="error"
                    variant="body2"
                    sx={{ mt: -1, ml: 0 }} // ensures left alignment
                  >
                    {errors.lessonDescription.message}
                  </Typography>
                )}
                {/* VIDEO UPLOAD */}
                <Box className="thumbnailOrPriceDiv d-flex align-items-center justify-content-between">
                  <Box className="courseThumbDiv d-flex align-items-center gap-3">
                    <Typography className="fs-15 text-border">
                      Upload Video
                    </Typography>
                    <Controller
                      name="lessonVideoURL"
                      control={control}
                      rules={{ required: "Please upload a video file" }}
                      render={({ field: { onChange } }) => (
                        <>
                          <label htmlFor="videoUpload">
                            <input
                              id="videoUpload"
                              type="file"
                              accept="video/*"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  onChange(file);
                                }
                              }}
                            />
                            <Button
                              component="span"
                              type="button"
                              variant="contained"
                              sx={{
                                borderRadius: "5px",
                                fontSize: "15px",
                                textTransform: "capitalize",
                                backgroundColor: "#2563EB",
                                boxShadow: "none",
                                "&:hover": {
                                  boxShadow: "none!important",
                                },
                              }}
                            >
                              Upload
                            </Button>
                          </label>
                          {errors.lessonVideoURL && (
                            <Typography color="error" variant="body2">
                              {errors.lessonVideoURL.message}
                            </Typography>
                          )}
                        </>
                      )}
                    />
                  </Box>
                </Box>
                <Box className="d-flex justify-content-end">
                  {" "}
                  <Box className="d-flex align-items-center">
                    <Box>
                      <Button
                        disabled={addLessonLoading}
                        type="submit"
                        variant="contained"
                        sx={{
                          height: 40,
                          paddingX: "30px",
                          borderRadius: "5px",
                          fontSize: "15px",
                          //   marginTop: "20px",
                          backgroundColor: "#2563EB",
                          boxShadow: "none!important",
                          textTransform: "capitalize",
                          "&:hover": {
                            boxShadow: "none!important",
                          },

                          // On focus: no outline, no border glow
                          "&:focus": {
                            outline: "none",
                            boxShadow: "none!important",
                          },

                          // On active (click/press): no visual push effect
                          "&:active": {
                            boxShadow: "none!important",
                          },
                        }}
                      >
                        {addLessonLoading ? (
                          <div className="spinner-button"></div>
                        ) : (
                          `Upload Lesson`
                        )}
                      </Button>
                    </Box>
                    <DialogActions>
                      <Button onClick={onClose} color="info" variant="outlined">
                        Close
                      </Button>
                    </DialogActions>
                  </Box>
                </Box>
              </Box>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddLessonModal;
