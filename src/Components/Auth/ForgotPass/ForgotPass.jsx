import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
  CardMedia,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./ForgotPass.css";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import signinForAuth from "../../Store/Thunks/signinThunk";
import { useDispatch } from "react-redux";
import authToProfile from "../../Store/Thunks/getProfileThunk";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Navbar from "../../Header/Navbar/Navbar";

const ForgotPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [originalPassword, setOriginalPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await dispatch(signinForAuth(data)).unwrap();
      // getting token from login api
      const token = result?.token;
      localStorage.setItem("token", token);

      // creating a small delay after saving token:
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // get profile call
      const profile = await dispatch(authToProfile()).unwrap(); //unwrap makes it await
      console.log(profile);

      toast.success(result?.message);
      reset(); //just resets the form values , not states
      navigate("/");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Navbar/>
      <Box className="container">
        <Grid
          className="signinDiv"
          container
          justifyContent="space-between"
          alignItems="center"
          minHeight="100vh"
        >
          <Grid item size={{ xs: 12, sm: 12, lg: 6, xl: 6 }}>
            <CardMedia
              className="signin_side_img img-fluid"
              component="img"
              image="/imgs/forgot-password.jpg"
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 12, lg: 5, xl: 6 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Find Your Account
              </Typography>
            </Box>

            {/* Description */}
            <Typography
              variant="body2"
              textAlign="center"
              color="textSecondary"
              mb={2}
            >
              Please enter your email address to search for your account.
            </Typography>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box>
                {/* email */}
                <Typography variant="subtitle2" fontWeight={600} mb={1}>
                  Email
                </Typography>
                <Box>
                  <Controller
                    name="email"
                    rules={{
                      required: "Username is required",
                      pattern: {
                        value: /^[a-zA-Z0-9_]{3,20}$/,
                        message:
                          "Username must contain letter, numbers and underscores",
                      },
                    }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={!!errors.email}
                        placeholder="Email Address"
                        variant="outlined"
                        fullWidth
                        sx={{
                          mb: 1,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "10px",
                            height: "45px",
                            bgcolor: "#fff",
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <Button
                              variant="contained"
                              sx={{
                                height: "40px",
                                fontSize: "14px",
                                width: "140px",
                                padding: "2px 12px",
                                textTransform: "none",
                                boxShadow: "none",
                                borderRadius: "8px",
                                bgcolor: "#49BBBD",
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
                              Send
                            </Button>
                          ),
                        }}
                      />
                    )}
                  />
                  {errors.email && (
                    <Typography
                      sx={{ marginTop: "-10px" }}
                      className="text-danger"
                    >
                      {errors.email.message}
                    </Typography>
                  )}
                </Box>

                {/* OTP CODE */}
                <Box>
                  <Controller
                    name="otp"
                    rules={{
                      required: "Please enter valid otp",
                      pattern: {
                        value: /^[a-zA-Z0-9_]{3,20}$/,
                        message:
                          "Username must contain letter, numbers and underscores",
                      },
                    }}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={errors.otp}
                        placeholder="Enter verification code"
                        variant="outlined"
                        fullWidth
                        sx={{
                          mb: 2,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "10px",
                            height: "45px",
                            bgcolor: "#fff",
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Box
                                sx={{
                                  width: "35px",
                                  height: "35px",
                                  fontSize: "14px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <CountdownCircleTimer
                                  isPlaying
                                  duration={300} // 5 minutes
                                  size={35}
                                  strokeWidth={4}
                                  colors={[
                                    "#004777",
                                    "#F7B801",
                                    "#A30000",
                                    "#A30000",
                                  ]}
                                  colorsTime={[300, 200, 100, 0]}
                                  onComplete={() => {
                                    console.log("Time's up!");
                                    return [false, 0];
                                  }}
                                >
                                  {({ remainingTime }) => {
                                    const minutes = Math.floor(
                                      remainingTime / 60
                                    );
                                    const seconds = remainingTime % 60;
                                    return (
                                      <Typography sx={{ fontSize: "10px" }}>
                                        {minutes}:{seconds < 10 ? "0" : ""}
                                        {seconds}
                                      </Typography>
                                    );
                                  }}
                                </CountdownCircleTimer>
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                  {errors.email && (
                    <Typography
                      sx={{ marginTop: "-10px" }}
                      className="text-danger"
                    >
                      {errors.email.message}
                    </Typography>
                  )}
                </Box>

                {/* password */}
                <Box>
                  <Typography variant="subtitle2" fontWeight={600} mb={1}>
                    Password
                  </Typography>
                  <Controller
                    name="password"
                    rules={{
                      required: "Password is required",
                      pattern: {
                        value: /^.{6,}$/,
                        message: "Password must be at least 6 characters",
                      },
                    }}
                    control={control}
                    render={({ field }) => (
                      <OutlinedInput
                        {...field} // first the component should be controlled before performing onChange
                        onChange={(e) => {
                          field.onChange(e); //update hook-form value
                          setOriginalPassword(e.target.value); // update just state value
                        }}
                        error={errors.password}
                        placeholder="Enter new Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((prev) => !prev)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        sx={{
                          mb: 1,
                          borderRadius: "10px",
                          height: "45px",
                          bgcolor: "#fff",
                        }}
                      />
                    )}
                  />
                  {errors.password && (
                    <Typography
                      sx={{ marginTop: "-10px" }}
                      className="text-danger"
                    >
                      {errors.password.message}
                    </Typography>
                  )}
                </Box>

                {/* confirm password */}
                <Box>
                  <Controller
                    name="confirmPassword"
                    rules={{
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === originalPassword || "Passwords do not match",
                    }}
                    control={control}
                    render={({ field }) => (
                      <OutlinedInput
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // update react-hook-form value
                          setConfirmPassword(e.target.value); //update just state value
                        }}
                        error={errors.confirmPassword}
                        placeholder="Confirm Password"
                        type={showConfirmPass ? "text" : "password"}
                        fullWidth
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowConfirmPass((prev) => !prev)
                              }
                              edge="end"
                            >
                              {showConfirmPass ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        sx={{
                          mb: 2,
                          borderRadius: "10px",
                          height: "45px",
                          bgcolor: "#fff",
                        }}
                      />
                    )}
                  />
                  {errors.confirmPassword ? (
                    <Typography sx={{ color: "red", mt: -1 }}>
                      {errors.confirmPassword.message}
                    </Typography>
                  ) : null}
                </Box>

                <Box className="text-end">
                  <Button
                    disabled={loading}
                    type="submit"
                    className=""
                    variant="contained"
                    sx={{
                      bgcolor: "#49BBBD",
                      borderRadius: "50px",
                      textTransform: "none",
                      py: 1.5,
                      width: "50%",
                      fontSize: "1rem",
                      "&:hover": {
                        bgcolor: "#3AA9AB",
                      },
                    }}
                  >
                    {loading ? (
                      <div className="spinner-button"></div>
                    ) : (
                      "Signin"
                    )}
                  </Button>
                </Box>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ForgotPass;
