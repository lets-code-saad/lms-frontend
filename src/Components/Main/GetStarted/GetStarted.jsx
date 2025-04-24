import React from "react";
import { Box, Button, Typography } from "@mui/material";
import "./GetStarted.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const GetStarted = () => {
  return (
    <>
      <Box sx={{ marginTop: "90px" }} className="container">
        <Box className="getStarted_lg">
          <Box className="text-center">
            <Typography className="fs-38 mt-3 fw-semibold" variant="p">
              Learn anything, anytime, anywhere
            </Typography>
          </Box>
          <Box className="text-center mt-1">
            <Typography className="fs-16" variant="p">
              Incididunt sint fugiat pariatur cupidatat consectetur sit cillum
              anim id veniam <br /> aliqua proident excepteur commodo do ea.
            </Typography>
          </Box>
        </Box>
        {/* SMALL SCREEN HEADINGS */}
        <Box className="getStarted_sm">
          <Box className="text-center">
            <Typography className="fs-38 mt-3 fw-semibold" variant="p">
              Learn anything, anytime, anywhere
            </Typography>
          </Box>
          <Box className="text-center">
            <Typography className="fs-16 mt-3" variant="p">
              Incididunt sint fugiat pariatur cupidatat consectetur sit cillum
              anim id veniam aliqua proident excepteur commodo do ea.
            </Typography>
          </Box>
        </Box>
        <Box className="startBtns mt-3 d-flex align-items-center justify-content-center">
          <Button
            variant="contained"
            sx={{
              height: 40,
              paddingX: "30px",
              whiteSpace: "nowrap",
              borderRadius: "5px",
              fontSize: "14px",
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
            Get Started
          </Button>
          <Button
            variant="contained"
            sx={{
              color: "black",
              height: 40,
              whiteSpace: "nowrap",
              fontSize: "14px",
              textTransform: "capitalize",
              background: "none",
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
            endIcon={<ArrowForwardIcon />}
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default GetStarted;
