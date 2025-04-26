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
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./ForgotPass.css";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import signinForAuth from "../../Store/Thunks/signinThunk";
import { useDispatch, useSelector } from "react-redux";
import authToProfile from "../../Store/Thunks/getProfileThunk";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Navbar from "../../Header/Navbar/Navbar";
import forgotPassword from "../../Store/Thunks/forgotPassThunk";
import resetPassword from "../../Store/Thunks/resetPassThunk";

const ForgotPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  // api slices
  const { forgotCallLoading, forgotUser, forgotError } = useSelector(
    (state) => state.ForgotPasswordSlice
  );
  const { resetCallLoading, resetUser, resetError } = useSelector(
    (state) => state.ResetPasswordSlice
  );

  // STATES
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [originalPassword, setOriginalPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState("email");
  const [backendErr, setBackendErr] = useState("");
  const [isSend, setIsSend] = useState(false)
  const [timer,setTimer] = useState(300) // 300 sec , 5 minutes
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {
    control,
    handleSubmit,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange", // added for real-time validation
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  // loading timer effect
  useEffect(() => {
    let interval;
    if (isSend && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    if (timer === 0) {
      setIsSend(false);
    }
    return () => clearInterval(interval);
  }, [isSend, timer]);


const handleEmailSubmission = async (data) => {
  try {
    const res = await dispatch(forgotPassword(data)).unwrap();
    toast.success(res?.message); // use API response
    setStep("otp");
    setIsSend(true); // start timer
  } catch (error) {
    setBackendErr(error?.message);
    setTimeout(() => {
      setBackendErr("")
    }, 5000);
    
  }
};


  const handlePassSubmission = async (data) => {
    try {
     const res=  await dispatch(resetPassword({ data })).unwrap();
      toast.success(res?.message);
      reset();
    } catch (error) {
      setBackendErr(error?.message);
      setTimeout(() => {
        setBackendErr("")
      }, 5000);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Navbar />
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

            <Typography
              variant="body2"
              textAlign="center"
              color="textSecondary"
              mb={2}
            >
              Please enter your email address to search for your account.
            </Typography>

            <Box>
              {/* Email */}
              <Typography variant="subtitle2" fontWeight={600} mb={1}>
                Email
              </Typography>

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                }}
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
                          disabled={isSend || forgotCallLoading}
                          onClick={async () => {
                            const isValid = await trigger("email");
                            if (isValid) {
                              const value = getValues();
                              handleEmailSubmission({ email: value.email });
                            }
                          }}
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
                            "&:hover": { boxShadow: "none" },
                            "&:focus": { outline: "none", boxShadow: "none" },
                            "&:active": { boxShadow: "none" },
                          }}
                        >
                          {forgotCallLoading ? (
                            <div className="spinner-button"></div>
                          ) : isSend ? (
                            `${Math.floor(timer / 60)}:${
                              timer % 60 < 10 ? "0" : ""
                            }${timer % 60}` // will display countdown timer from 5 minutes
                          ) : (
                            "Send"
                          )}
                        </Button>
                      ),
                    }}
                  />
                )}
              />
              {/* field err */}
              {errors.email && (
                <Typography sx={{ marginTop: "-5px" }} className="text-danger">
                  {errors.email.message}
                </Typography>
              )}
              {/* backend err */}
              {backendErr ? (
                <Typography sx={{ marginTop: "-5px" }} className="text-danger">
                  {backendErr}
                </Typography>
              ) : null}

              {step === "otp" && (
                <Box>
                  {" "}
                  {/* OTP */}
                  <Box>
                    <Controller
                      name="otp"
                      control={control}
                      rules={{
                        required: "Please enter a valid OTP",
                        pattern: {
                          value: /^\d{6}$/,
                          message: "OTP must be exactly 6 digits",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          error={!!errors.otp}
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
                                    duration={300}
                                    size={35}
                                    strokeWidth={4}
                                    colors={[
                                      "#004777",
                                      "#F7B801",
                                      "#A30000",
                                      "#A30000",
                                    ]}
                                    colorsTime={[300, 200, 100, 0]}
                                    onComplete={() => [false, 0]}
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
                    {errors.otp && (
                      <Typography
                        sx={{ marginTop: "-5px" }}
                        className="text-danger"
                      >
                        {errors.otp.message}
                      </Typography>
                    )}
                    {/* backend err */}
                    {backendErr ? (
                      <Typography
                        sx={{ marginTop: "-5px" }}
                        className="text-danger"
                      >
                        {backendErr}
                      </Typography>
                    ) : null}
                  </Box>
                  {/* Password */}
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600} mb={1}>
                      Password
                    </Typography>
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: "Password is required",
                        pattern: {
                          value: /^.{6,}$/,
                          message: "Password must be at least 6 characters",
                        },
                      }}
                      render={({ field }) => (
                        <OutlinedInput
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setOriginalPassword(e.target.value);
                          }}
                          error={!!errors.password}
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
                        sx={{ marginTop: "-5px" }}
                        className="text-danger"
                      >
                        {errors.password.message}
                      </Typography>
                    )}
                  </Box>
                  {/* Confirm Password */}
                  <Box>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{
                        required: "Confirm password is required",
                        validate: (value) =>
                          value === originalPassword ||
                          "Passwords do not match",
                      }}
                      render={({ field }) => (
                        <OutlinedInput
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setConfirmPassword(e.target.value);
                          }}
                          error={!!errors.confirmPassword}
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
                    {errors.confirmPassword && (
                      <Typography sx={{ color: "red", mt: -1 }}>
                        {errors.confirmPassword.message}
                      </Typography>
                    )}
                  </Box>
                  {/* Submit */}
                  <Box className="text-end">
                    <Button
                      onClick={async () => {
                        const isValid = await trigger([
                          "otp",
                          "password",
                          "confirmPassword",
                        ]);
                        if (isValid) {
                          const values = getValues();
                          handlePassSubmission({
                            otp: values.otp,
                            password: values.password,
                          });
                        }
                      }}
                      disabled={resetCallLoading}
                      type="button"
                      variant="contained"
                      sx={{
                        bgcolor: "#49BBBD",
                        borderRadius: "50px",
                        textTransform: "none",
                        py: 1.5,
                        width: "50%",
                        fontSize: "1rem",
                        "&:hover": { bgcolor: "#3AA9AB" },
                      }}
                    >
                      {resetCallLoading ? (
                        <div className="spinner-button"></div>
                      ) : (
                        "Change Password"
                      )}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ForgotPass;
