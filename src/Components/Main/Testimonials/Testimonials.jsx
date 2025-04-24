import React from "react";
import "./Testimonials.css";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";

const availableCourses = [
  {
    title: "Build AI BG Removal SaaS App in React JS",
    review:
      "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    rating: 4.5,
    noOfRatings: 122,
    image: "/imgs/profile_img_1.png",
  },
  {
    title: "Build AI BG Removal SaaS App in React JS",
    review:
      "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    rating: 4.5,
    noOfRatings: 122,
    image: "/imgs/profile_img_1.png",
  },
  {
    title: "Build AI BG Removal SaaS App in React JS",
    review:
      "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    rating: 4.5,
    image: "/imgs/profile_img_1.png",
  },
];

const Testimonials = () => {
  return (
    <>
      <Box sx={{ marginTop: "90px"}} className="container">
        <Box className="testimonHead_lg">
          <Box className="text-center">
            <Typography className="fs-30 mt-3 fw-semibold" variant="p">
              Testimonials
            </Typography>
          </Box>
          <Box className="text-center mt-1">
            <Typography className="fs-15 " variant="p">
              Hear from our learners as they share their journeys of
              transformation, success, and how our <br /> platform has made a
              difference in their lives.
            </Typography>
          </Box>
        </Box>
        {/* SMALL SCREEN HEADINGS */}
        <Box className="testimonHead_sm">
          <Box className="text-center">
            <Typography className="fs-30 mt-3" variant="p">
              Testimonials
            </Typography>
          </Box>
          <Box className="text-center">
            <Typography className="fs-15 mt-3" variant="p">
              Hear from our learners as they share their journeys of
              transformation, success, and how our platform has made a
              difference in their lives.
            </Typography>
          </Box>
        </Box>
        {/* Courses Cards */}
        <Box sx={{ marginTop: "40px" }} className="courseCards">
          <Grid justifyContent="center" container spacing={3}>
            {availableCourses.map((items) => {
              return (
                <Grid
                  sx={{ borderRadius: "8px" }}
                  className="border bg-white"
                  item
                  size={{ xs: 12, sm: 6, lg: 3, xl: 2 }}
                >
                  <Box className="bg-cards">
                    <Box
                      className="d-flex align-items-center gap-4 px-2 py-2"
                    >
                      <Box>
                        <CardMedia
                          sx={{
                            overflow: "hidden",
                            width: "50px",
                            height: "auto",
                          }}
                          component="img"
                          image={items.image}
                          alt="Paella dish"
                        />
                      </Box>
                      <Box
                        sx={{ marginTop: "-10px" }}
                        className="d-flex flex-column align-items-start"
                      >
                        <Typography
                          className="fs-18 fw-medium mt-3"
                          variant="p"
                        >
                          Donald Jackman
                        </Typography>
                        <Typography className="fs-13" variant="p">
                          SWE 1 @ Amazon
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="d-flex flex-column mt-3 gap-1 px-2 pt-1 pb-4">
                    {/* Rating Component */}
                    <Box className="d-flex align-items-center gap-2">
                      <Rating
                        className="text-red"
                        size="medium"
                        name="half-rating-read"
                        defaultValue={5}
                        precision={0.5}
                        readOnly
                      />
                    </Box>
                    <Typography className="fs-15 text-span-2" variant="span">
                      {items.review}
                    </Typography>
                    <Typography
                      className="fs-15 text-blue text-decoration-underline mt-4"
                      variant="span"
                    >
                      Read More
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Testimonials;
