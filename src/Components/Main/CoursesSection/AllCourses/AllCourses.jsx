import React, { useEffect, useState } from "react";
import "./AllCourses.css";
import Navbar from "../../../Header/Navbar/Navbar";
import {
  Autocomplete,
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
import Footer from "../../../Footer/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import SkeletonForAllCards from "../../../SkeletonLoading/SkeletonForAllCards";
import getAllCourses from "../../../Store/Thunks/getAllCourses";
import formatName from "../../../Utils/FormatName";

const AllCourses = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  // const { courses } = useSelector((state) => state.CoursesSlice)
  const { allCourses, loading } = useSelector(
    (state) => state.GetAllCoursesSlice
  );
  // button loding
  const [buttonLoading, setButtonLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  // fetch data on mount
  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  // When courses are updated from Redux, reflect that in filteredItems
  useEffect(() => {
    setFilteredItems(allCourses);
  }, [allCourses]);

  // reset the filter when search input is cleared
  useEffect(() => {
    if (searchTerm === "") {
      // show all cards when there is not search term
      setFilteredItems(allCourses);
    }
  }, [searchTerm, allCourses]);

  // Search filter handler
  const searchFilterer = () => {
    const searched = allCourses.filter((value) =>
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

  return (
    <>
      {/* navbar */}
      <Navbar />
      <Box sx={{ marginTop: "40px" }} className="courses container">
        {/* cards head & search */}
        <Box className="d-flex flex-wrap align-items-center justify-content-between">
          <Box>
            <Box>
              <Typography className="fs-30 mt-3 fw-semibold" variant="p">
                Courses List
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
            <Autocomplete
              fullWidth
              freeSolo // allows any input, not just from suggestions
              options={searchTerm.length>0 ? allCourses?.filter((item)=>item.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()))?.map((course) => course.courseTitle) : []}
              inputValue={searchTerm}
              onInputChange={(event, newInputValue) =>
                setSearchTerm(newInputValue)
              }
              onChange={(event, newVal) => {
                
                if (typeof newVal === "string") {
                  setSearchTerm(newVal)
                }
                searchFilterer()}
              }
              filterOptions={(options, state) =>
                options.filter((option) =>
                  option.toLowerCase().includes(state.inputValue.toLowerCase())
                )
              }
              sx={{
                width: "100%",
                // marginRight: "170px",
                "& .MuiOutlinedInput-root": {
                  height: 40,
                  borderRadius: "5px 0 0 5px",
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
              renderInput={(params) => (
                <TextField
                  sx={{width:"100%",marginRight:"170px"}}
                fullWidth
                  {...params}
                  placeholder="Search any courses"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <SearchIcon sx={{ color: "action.active", mr: 1 }} />
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                />
              )}
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
                const randomRatingValue = (Math.random() * 4 + 1).toFixed(2); // it will fix it to just 2 digits
                const randomRatedUsers = Math.ceil(Math.random() * 1000 + 1);
                return (
                  <Grid
                    key={items.id}
                    sx={{
                      borderRadius: "8px",
                      width: "100%",
                    }}
                    className="border bg-white"
                    item
                    size={{ xs: 12, sm: 6, lg: 3, xl: 2 }}
                  >
                    <Link
                      className="text-decoration-none text-black"
                      to={`/single-course/${items._id}`}
                    >
                      {loading && filteredItems.length === 0 ? (
                        <SkeletonForAllCards />
                      ) : (
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
                              ({formatName(items.user?.username)})
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
                            <Typography className="fs-16 fw-bold" variant="h6">
                              ${items.coursePrice}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Link>
                  </Grid>
                );
              })
            )}
          </Grid>
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
      {/* footer */}
      <Footer />
    </>
  );
};

export default AllCourses;
