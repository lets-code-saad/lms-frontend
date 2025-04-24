import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import "./HeroSection.css"
const HeroSection = () => {
  return (
    <>
      <Box className="heroSection_lg container">
        <Box className="d-flex flex-column align-items-center">
          <Typography
            variant="h4"
            className="fs-45 text-center"
            fontWeight="bold"
          >
            Empower your future with the <br /> courses designed to{" "}
            <span className="text-blue">fit your choice.</span>
          </Typography>
          <Typography className="fs-15 mt-3" variant="p">
            We bring together world-class instructors, interactive content, and
            a supportive <br /> community to help you achieve your personal and
            professional goals.
          </Typography>
          {/* Search box */}
          <Box
            sx={{
              display: "flex",
              mt: 3,
            }}
          >
            <TextField
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
      </Box>

      {/* small screen heroSection */}
      <Box className="heroSection_sm container">
        <Box className="d-flex flex-column align-items-center">
          <Typography
            variant="h4"
            className="fs-28 text-center"
            fontWeight="bold"
          >
            Empower your future with the courses designed to{" "}
            <span className="text-blue">fit your choice.</span>
          </Typography>
          <Typography className="fs-13 mt-3 text-center" variant="p">
            We bring together world-class instructors, interactive content, and
            a supportive community to help you achieve your personal and
            professional goals.
          </Typography>
          {/* Search box */}
          <Box
            className="container"
            sx={{
              display: "flex",
              mt: 3,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search any courses"
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "action.active", mr: 1 }} />
                ),
                sx: {
                  height: 44,
                  marginRight: "170px",
                  borderRadius: "5px 0 0 5px",
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                height: 44,
                paddingX: "50px",
                whiteSpace: "nowrap",
                borderRadius: "0 5px 5px 0",
                fontSize: "15px",
                textTransform: "capitalize",
                backgroundColor: "#2563EB",
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default HeroSection
