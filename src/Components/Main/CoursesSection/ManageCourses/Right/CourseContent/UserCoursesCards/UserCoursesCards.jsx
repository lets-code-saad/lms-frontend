import React, { useEffect, useState } from "react";
import "./UserCoursesCards.css";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  Rating,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../../../../Header/Navbar/Navbar";
import Footer from "../../../../../../Footer/Footer";
import SkeletonForAllCards from "../../../../../../SkeletonLoading/SkeletonForAllCards";
import ManageLeft from "../../../Left/ManageLeft";
import fetchCourses from "../../../../../../Store/Thunks/coursesThunk";
import EditIcon from "@mui/icons-material/Edit";
import ManageCourseModal from "./ManageCourseModal/ManageCourseModal";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import LayersIcon from "@mui/icons-material/Layers";

const UserCoursesCards = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  // fetching courses api from redux
  const { courses, loading } = useSelector((state) => state.GetUserCourses);
  // button loding
  const [buttonLoading, setButtonLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  // fetch data on mount
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // When courses are updated from Redux, reflect that in filteredItems
  useEffect(() => {
    setFilteredItems(courses);
  }, [courses]);

  // reset the filter when search input is cleared
  useEffect(() => {
    if (searchTerm === "") {
      // show all cards when there is not search term
      setFilteredItems(courses);
    }
  }, [searchTerm, courses]);

  // Search filter handler
  const searchFilterer = () => {
    const searched = courses.filter((value) =>
      value.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(searched);
  };

  // load more functionality
  const [visibleCourses, setvisibleCourses] = useState(8);

  // load more buton
  const handleLoadMore = () => {
    setButtonLoading(true);
    setTimeout(() => {
      setvisibleCourses((prev) => prev + visibleCourses);
    }, 1500);
  };

  // managing the manage course modal
  const [open, setOpen] = useState(false);
  // fetching course id in the state
  const [courseId, setCourseId] = useState(null)
  return (
    <>
      {/* navbar */}
      <Navbar />
      <Box className="coursesCardsWithLeftSidebar d-flex gap-2 container">
        <Box className="addCourseDiv">
          <ManageLeft />
        </Box>
        {courses.length === 0 ? (
          <Box className="w-100 d-flex flex-column align-items-center">
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
        ) : (
          <Box sx={{ marginTop: "10px" }} className="courses container">
            {/* cards head & search */}
            <Box className="d-flex flex-wrap align-items-center justify-content-between">
              <Box>
                <Box>
                  <Typography className="fs-30 mt-3 fw-semibold" variant="p">
                    Your Courses
                  </Typography>
                </Box>
                <Box
                  className="fs-15 d-flex align-items-center gap-2"
                  sx={{ marginTop: "-5px" }}
                >
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "active text-decoration-none"
                        : "text-decoration-none"
                    }
                  >
                    <Typography className="" variant="p">
                      Home
                    </Typography>
                  </NavLink>

                  <Typography>/</Typography>

                  <Typography>Courses List</Typography>
                </Box>
              </Box>
              {/* Search box */}
              <Box
                sx={{
                  display: "flex",
                  mt: 3,
                }}
              >
                <TextField
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  fullWidth
                  placeholder="Search any courses"
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
                  disabled={loading}
                  onClick={searchFilterer}
                  variant="contained"
                  sx={{
                    height: 40,
                    paddingX: "50px",
                    whiteSpace: "nowrap",
                    borderRadius: "0 5px 5px 0",
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
                  Search
                </Button>
              </Box>
            </Box>
            {/* all courses cards */}
            <Box sx={{ marginTop: "40px" }} className="courseCards">
              <Grid container spacing={2}>
                {loading ? (
                  <SkeletonForAllCards />
                ) : (
                      filteredItems?.slice(0, visibleCourses).map((items) => {
                        // generating random value < 5 for rating component
                        const randomRatingValue = (
                          Math.random() * 4 +
                          1
                        ).toFixed(2); // it will fix it to just 2 digits
                        const randomRatedUsers = Math.ceil(
                          Math.random() * 1000 + 1
                        );
                        return (
                          <Grid
                            key={items._id}
                            sx={{
                              borderRadius: "8px",
                              width: "100%",
                            }}
                            className="border bg-white"
                            item
                            size={{ xs: 12, sm: 6, lg: 3, xl: 2 }}
                          >
                            <Box>
                              <CardMedia
                                sx={{
                                  overflow: "hidden",
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "140px",
                                }}
                                component="img"
                                image={`data:image/${items?.thumbnail};base64,${items?.thumbnail}`}
                                alt="Paella dish"
                              />
                              <Box className="d-flex flex-column gap-1 px-2 py-1">
                                <Typography
                                  className="text-capitalize fw-bold fs-15"
                                  variant="h6"
                                >
                                  {items?.courseTitle}
                                </Typography>
                                <Typography
                                  className="fs-13 text-span-2"
                                  variant="span"
                                >
                                  {items.author}
                                </Typography>
                                {/* Rating Component */}
                                <Box className="d-flex align-items-center gap-2">
                                  <Typography
                                    className="fs-13 fw-medium"
                                    variant="span"
                                  >
                                    {randomRatingValue}
                                  </Typography>
                                  <Rating
                                    className="text-red"
                                    size="small"
                                    name="half-rating-read"
                                    value={parseFloat(randomRatingValue)}
                                    precision={0.5}
                                    readOnly
                                  />
                                  <Typography
                                    className="fs-13 text-span"
                                    variant="span"
                                  >
                                    ({randomRatedUsers})
                                  </Typography>
                                </Box>
                                <Typography
                                  className="fs-16 fw-bold"
                                  variant="h6"
                                >
                                  ${items.coursePrice}
                                </Typography>
                              {/* MANAGE COURSE */}
                              <Button
                                onClick={() => {
                                  setOpen(true);
                                  // getting course id here
                                  setCourseId(items?._id);
                                }}
                                className="text-capitalize mt-2"
                                sx={{
                                  width: "100%",
                                  bgcolor: "#2563EB",
                                  color: "white",
                                  display: "flex",
                                  gap: "5px",
                                  mt: "auto", // Ensures alignment at bottom
                                }}
                              >
                                <LayersIcon />
                                Manage Course
                              </Button>
                              </Box>
                            </Box>
                          </Grid>
                        );
                      })
                )}
                </Grid>
                {/* CALLING THE MANAGE COURSES MODAL */}
                <ManageCourseModal courseId={courseId} open={open} onClose={()=>setOpen(false)} />
                
              <Box className="text-center mt-5">
                {/* Show button only if there are more courses */}
                {visibleCourses < filteredItems.length && (
                  <Button
                    onClick={handleLoadMore}
                    disabled={buttonLoading || loading}
                    variant="contained"
                    sx={{
                      height: 40,
                      paddingX: "30px",
                      whiteSpace: "nowrap",
                      border: "1px solid #8A8C8F",
                      borderRadius: "5px",
                      fontSize: "15px",
                      textTransform: "unset",
                      background: "none",
                      boxShadow: "none",
                      color: "#8A8C8F",
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
                    {buttonLoading ? (
                      <div className="spinner-button"></div>
                    ) : (
                      "Load more"
                    )}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      {/* footer */}
      <Footer />
    </>
  );
};

export default UserCoursesCards;
