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
import "./Signin.css";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import signinForAuth from "../../Store/Thunks/signinThunk";
import { useDispatch } from "react-redux";
import authToProfile from "../../Store/Thunks/getProfileThunk";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <Box className="container">
      <ToastContainer position="top-center" />
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
            image="/imgs/signin page.jpg"
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 12, lg: 5, xl: 6 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Welcome to Edemy!
            </Typography>

            {/* Toggle Button (Login/Register) */}
            <Box
              sx={{
                bgcolor: "#B6E2E1",
                display: "flex",
                borderRadius: "50px",
                p: "5px",
                justifyContent: "space-between",
                width: "250px",
                mx: "auto",
                mb: 2,
              }}
            >
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "activeAuth bg-none text-white text-decoration-none"
                    : "text-decoration-none text-white"
                }
                to="/signin"
              >
                <Button
                  sx={{
                    borderRadius: "50px",
                    textTransform: "none",
                    width: "50%",
                    color: "white!important",
                  }}
                >
                  Login
                </Button>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "activeAuth bg-none text-decoration-none"
                    : "text-decoration-none"
                }
                to="/signup"
              >
                <Button
                  sx={{
                    borderRadius: "50px",
                    textTransform: "none",
                    width: "50%",
                    color: "white!important",
                  }}
                >
                  Register
                </Button>
              </NavLink>
            </Box>
          </Box>

          {/* Description */}
          <Typography
            variant="body2"
            textAlign="center"
            color="textSecondary"
            mb={2}
          >
            Please Login To Continue
          </Typography>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              {/* email */}
              <Box>
                <Typography variant="subtitle2" mb={1}>
                  User name
                </Typography>
                <Controller
                  name="username"
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
                      error={errors.username}
                      placeholder="Enter your User name"
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
                    />
                  )}
                />
                {errors.username && (
                  <Typography
                    sx={{ marginTop: "-10px" }}
                    className="text-danger"
                  >
                    {errors.username.message}
                  </Typography>
                )}
              </Box>

              {/* password */}
              <Box>
                <Typography variant="subtitle2" mb={1}>
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
                      {...field}
                      error={errors.password}
                      placeholder="Enter your Password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
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
                {errors.password && (
                  <Typography
                    sx={{ marginTop: "-10px" }}
                    className="text-danger"
                  >
                    {errors.password.message}
                  </Typography>
                )}
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Typography variant="body2" sx={{ cursor: "pointer" }}>
                  Forgot Password ?
                </Typography>
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
                  {loading ? <div className="spinner-button"></div> : "Signin"}
                </Button>
              </Box>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signin;
