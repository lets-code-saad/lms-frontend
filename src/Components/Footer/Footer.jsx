import React from 'react'
import "./Footer.css"
import { Box, Button, CardMedia, Divider, Grid, TextField, Typography } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
const Footer = () => {
  return (
    <>
      <Box sx={{ marginTop: "95px" }} className="footer bg-footer py-5">
        <Box className="container">
          <Grid container className="">
            <Grid
              sx={{ borderRadius: "8px" }}
              className=""
              item
              size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}
            >
              {/* <CardMedia component="img" image="/imgs/logo-icon.svg" /> */}
              <Box className="logo d-flex align-items-center gap-1">
                <img src="/imgs/logo-icon.svg" alt="" />
                <Typography
                  className="fs-24 fw-medium text-white"
                  variant="span"
                >
                  Edemy
                </Typography>
              </Box>
              <Box className="paragraph mt-3">
                <Typography
                  sx={{ color: "#FFFFFFCC" }}
                  className="fs-14 text-span"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </Typography>
              </Box>
            </Grid>
            <Grid
              sx={{ borderRadius: "8px" }}
              className="footer_company_links text-center"
              item
              size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}
            >
              <Box className="text-white d-flex flex-column">
                <Typography className="fs-16 fw-medium" variant="span">
                  Company
                </Typography>
                <ul className="list-unstyled mt-3 text-span">
                  <li>Home</li>
                  <li>About Us</li>
                  <li>Contact Us</li>
                  <li>Privacy Policy</li>
                </ul>
              </Box>
            </Grid>
            <Grid
              sx={{ borderRadius: "8px" }}
              className=""
              item
              size={{ xs: 12, sm: 6, lg: 4, xl: 2 }}
            >
              <Box className="text-white d-flex flex-column">
                <Typography className="fs-16 fw-medium" variant="span">
                  Subscribe to our newsletter
                </Typography>
                <Typography className="fs-15 mt-3 text-span" variant="span">
                  The latest news, articles, and resources, sent to your inbox
                  weekly.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    mt: 3,
                  }}
                >
                  <TextField
                    className="text-white"
                    fullWidth
                    placeholder="Enter your email"
                    sx={{
                      backgroundColor: "#1F2937!important",
                      // Styling the border
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "1px solid #6B72804D",
                        },
                        "&:hover fieldset": {
                          border: "1px solid #6B72804D",
                        },
                        "&.Mui-focused fieldset": {
                          border: "1px solid #6B72804D",
                        },
                      },
                      // Make input text white
                      "& .MuiInputBase-input": {
                        color: "white", // ← This is the key line
                      },
                      // Optional: also style the placeholder
                      "& .MuiInputBase-input::placeholder": {
                        color: "rgba(255,255,255,0.6)", // or full white
                      },
                    }}
                    InputProps={{
                      sx: {
                        height: 40,
                        marginRight: "170px",
                        borderRadius: "5px 0 0 5px",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      height: 40,
                      paddingX: "30px",
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
                    Subscribe
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Divider
            sx={{ borderColor: "#888888!important", marginTop: "20px" }}
            orientation="horizontal"
            component="div"
          />
          <Box className="text-center">
            <Typography className="fs-15 mt-3 text-span " variant="span">
              Copyright 2024 © Edemy. All Right Reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Footer
