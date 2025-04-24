import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authToProfile from "../../Store/Thunks/getProfileThunk";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { deepOrange } from "@mui/material/colors";

const Navbar = ({ onDashboardClick }) => {
  // Account menu
  const [accAnchorEl, setAccAnchorEl] = useState(null);
  const accOpen = Boolean(accAnchorEl);
  const handleClick = (event) => {
    setAccAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAccAnchorEl(null);
  };

  // account menu

  // Dashboard menu
  const [dashboardAnchorEl, setDashboardAnchorEl] = useState(null);
  const dashboardOpen = Boolean(dashboardAnchorEl);
  const handleDashboardClose = () => setDashboardAnchorEl(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // calling profile api
  useEffect(() => {
    dispatch(authToProfile());
  }, [dispatch]);

  const { user } = useSelector((state) => state.GetProfileSlice);

  // function for capitalizing the name
  const formatName = (username) => {
    return username
      .split("_")
      .filter(Boolean)
      .map((word) => word.replace(/[^a-zA-Z]/g, "").toLowerCase())
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  return (
    <>
      <Box className="navBar_large">
        <Box className="container pt-3 d-flex align-items-center justify-content-between">
          <Link className="text-decoration-none text-black" to="/">
            <Box className="logo d-flex align-items-center gap-1">
              <img src="/imgs/logo-icon.svg" alt="" />
              <Typography className="fs-24" variant="span">
                Edemy
              </Typography>
            </Box>
          </Link>
          {/* nav-links */}
          <Box className="d-flex align-items-center gap-4">
            {user?.userInDB?.role === "instructor" ? ( // optional chaining
              <Link
                to="/add-course"
                className="text-black text-decoration-none"
              >
                <Button className="bg-blue text-capitalize text-white py-2 px-3 fs-15 border-0 rounded-pill">
                  Add Course
                </Button>
              </Link>
            ) : null}

            {user?.userInDB?.role == "instructor" ? (
              <Divider
                orientation="vertical"
                className="text-black"
                variant="middle"
                flexItem
              />
            ) : null}

            {!user ? (
              <Link to="/signin" className="text-black text-decoration-none">
                <Button
                  sx={{
                    width: "10px",
                    whiteSpace: "nowrap",
                    borderRadius: "5px",
                    fontSize: "15px",
                    textTransform: "capitalize",
                    boxShadow: "none",
                    "&:hover": { boxShadow: "none", background: "none" },
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                      background: "none",
                    },
                    "&:active": { boxShadow: "none" },
                  }}
                  className="fs-15 text-pg"
                >
                  Login
                </Button>
              </Link>
            ) : (
              <Box className="d-flex align-items-center gap-1">
                {" "}
                <Typography className="fs-14 fw-medium" variant="span">
                  {`Hi! ${formatName(user?.userInDB?.username)}`}
                </Typography>
                {/* Account Icon Menu */}
                {!user?.userInDB?.username ? (
                  <Link
                    to="/signup"
                    className="text-black text-decoration-none"
                  >
                    <Button className="bg-blue text-capitalize text-white py-2 px-3 fs-15 border-0 rounded-pill">
                      Create Account
                    </Button>
                  </Link>
                ) : (
                  <button
                    onClick={handleClick}
                    style={{ background: "none" }}
                    className="bg-none border-0"
                  >
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>
                      {user?.userInDB?.username.charAt(0).toUpperCase()}
                    </Avatar>
                  </button>
                )}
              </Box>
            )}
            {!user && (
              <Link to="/signup" className="text-black text-decoration-none">
                <Button className="bg-blue text-capitalize text-white py-2 px-3 fs-15 border-0 rounded-pill">
                  Create Account
                </Button>
              </Link>
            )}
          </Box>
        </Box>
        <Divider
          sx={{ marginTop: "10px" }}
          orientation="horizontal"
          component="div"
        />
      </Box>

      {/* Mobile Screen Nav */}
      <Box className="navBar_small">
        <Box className="container pt-3 d-flex align-items-center justify-content-between">
          <Link className="text-decoration-none text-black" to="/">
            <Box className="logo d-flex align-items-center gap-1">
              <img src="/imgs/logo-icon.svg" alt="" />
              <Typography className="fs-24" variant="span">
                Edemy
              </Typography>
            </Box>
          </Link>

          {/* nav-links */}
          <Box className="d-flex align-items-center gap-2">
            {/* Dashboard Icon Menu */}
            {user?.userInDB?.role === "instructor" && (
              <button
                onClick={(e) => setDashboardAnchorEl(e.currentTarget)}
                style={{ background: "none" }}
                className="bg-none border-0"
              >
                <DashboardIcon />
              </button>
            )}

            {/* Account Icon Menu */}
            {!user?.userInDB?.username ? (
              <Box className="d-flex align-items-center gap-2">
                <Link to="/signin" className="text-black text-decoration-none">
                  <Button
                    sx={{
                      width: "10px",
                      whiteSpace: "nowrap",
                      borderRadius: "5px",
                      fontSize: "15px",
                      textTransform: "capitalize",
                      boxShadow: "none",
                      "&:hover": { boxShadow: "none", background: "none" },
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                        background: "none",
                      },
                      "&:active": { boxShadow: "none" },
                    }}
                    className="fs-15 text-pg"
                  >
                    Login
                  </Button>
                </Link>

                {/* Signup page if no login */}

                <Link to="/signup" className="text-black text-decoration-none">
                  <Button className="bg-blue text-capitalize text-white py-2 px-3 fs-15 border-0 rounded-pill">
                    Create Account
                  </Button>
                </Link>
              </Box>
            ) : (
              <button
                onClick={handleClick}
                style={{ background: "none" }}
                className="bg-none border-0"
              >
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  {user?.userInDB?.username.charAt(0).toUpperCase()}
                </Avatar>
              </button>
            )}

            {/* Account Menu */}
            <Menu
              className="account_menu"
              anchorEl={accAnchorEl}
              open={accOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              PaperProps={{ sx: { mt: 6.5, ml: 2 } }}
            >
              <MenuItem onClick={handleClose}>
                {user?.userInDB?.username
                  ? `${formatName(user?.userInDB?.username)}`
                  : "Profile"}
              </MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive
                    ? "menuActive text-decoration-none text-black"
                    : "text-decoration-none text-black"
                }
              >
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("token"); // removes the token, and again asks the user to login
                    handleClose();
                    navigate("/");
                  }}
                >
                  Logout
                </MenuItem>
              </NavLink>
            </Menu>

            {/* Dashboard Menu */}
            <Menu
              anchorEl={dashboardAnchorEl}
              open={dashboardOpen}
              onClose={handleDashboardClose}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              PaperProps={{ sx: { mt: 6, ml: -2.5 } }}
            >
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "menuActive text-decoration-none text-black"
                    : "text-decoration-none text-black"
                }
              >
                <MenuItem onClick={handleDashboardClose}>Dashboard</MenuItem>
              </NavLink>
              <NavLink
                to="/add-course"
                className={({ isActive }) =>
                  isActive
                    ? "menuActive text-decoration-none text-black"
                    : "text-decoration-none text-black"
                }
              >
                <MenuItem onClick={handleDashboardClose}>Add Course</MenuItem>
              </NavLink>
              <NavLink
                to="/enrolled-students"
                className={({ isActive }) =>
                  isActive
                    ? "menuActive text-decoration-none text-black"
                    : "text-decoration-none text-black"
                }
              >
                <MenuItem onClick={handleDashboardClose}>Enrolled</MenuItem>
              </NavLink>
              <NavLink
                to="/my-courses"
                className={({ isActive }) =>
                  isActive
                    ? "menuActive text-decoration-none text-black"
                    : "text-decoration-none text-black"
                }
              >
                <MenuItem onClick={handleDashboardClose}>My Courses</MenuItem>
              </NavLink>
            </Menu>
          </Box>
        </Box>
        <Divider
          sx={{ marginTop: "10px" }}
          orientation="horizontal"
          component="div"
        />
      </Box>
    </>
  );
};

export default Navbar;
