import { Box, Typography } from '@mui/material';
import React from 'react'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const CourseStructure = () => {
    
  return (
    <>
      <Box>
        <Box className="structureHead">
          <Typography className="fs-18 mt-3 fw-semibold" variant="p">
            Course Structure
          </Typography>
          <Box className="d-flex align-items-center gap-1">
            <Typography className="fs-13">22 sections </Typography>
            <Typography className="fs-13">/</Typography>
            <Typography className="fs-13" variant="span">
              54 lectures
            </Typography>
            <Typography className="fs-13">/</Typography>
            <Typography className="fs-13" variant="span">
              27h 25m total duration
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <Accordion defaultExpanded>
            <AccordionSummary
              sx={{ backgroundColor: "#E3E3E3" }}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <ExpandMoreIcon className="text-span" />
              <Typography variant="span" className="fw-semibold">
                Project Introduction
              </Typography>
              <Typography component="span" className="ms-auto text-muted small">
                3 lectures – 45 mins
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="d-flex flex-column gap-3">
                <Box className="d-flex justify-content-between align-items-center">
                  <Box className="d-flex align-items-center gap-2">
                    <PlayCircleIcon fontSize="small" color="action" />
                    <Typography>
                      App Overview – Build Text-to-Image SaaS
                    </Typography>
                  </Box>
                  <Typography className="text-muted small">10 mins</Typography>
                </Box>
                {/* 2 */}
                <Box className="d-flex justify-content-between align-items-center">
                  <Box className="d-flex align-items-center gap-2">
                    <PlayCircleIcon fontSize="small" color="action" />
                    <Typography>
                      Tech Stack – React, Node.js, MongoDB.
                    </Typography>
                  </Box>
                  <Typography className="text-muted small">15 mins</Typography>
                </Box>
                {/* 3 */}
                <Box className="d-flex justify-content-between align-items-center">
                  <Box className="d-flex align-items-center gap-2">
                    <PlayCircleIcon fontSize="small" color="action" />
                    <Typography>
                      Tech Stack – React, Node.js, MongoDB.
                    </Typography>
                  </Box>
                  <Typography className="text-muted small">15 mins</Typography>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* 2 */}
          <Accordion defaultExpanded>
            <AccordionSummary
              sx={{ backgroundColor: "#E3E3E3" }}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <ExpandMoreIcon className="text-span" />
              <Typography variant="span" className="fw-semibold">
                Project Setup and configuration
              </Typography>
              <Typography component="span" className="ms-auto text-muted small">
                3 lectures – 45 mins
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="d-flex flex-column gap-3">
                <Box className="d-flex justify-content-between align-items-center">
                  <Box className="d-flex align-items-center gap-2">
                    <PlayCircleIcon fontSize="small" color="action" />
                    <Typography>
                      App Overview – Build Text-to-Image SaaS
                    </Typography>
                  </Box>
                  <Typography className="text-muted small">10 mins</Typography>
                </Box>
                <Box className="d-flex justify-content-between align-items-center">
                  <Box className="d-flex align-items-center gap-2">
                    <PlayCircleIcon fontSize="small" color="action" />
                    <Typography>
                      Tech Stack – React, Node.js, MongoDB.
                    </Typography>
                  </Box>
                  <Typography className="text-muted small">15 mins</Typography>
                </Box>
                <Box className="d-flex justify-content-between align-items-center">
                  <Box className="d-flex align-items-center gap-2">
                    <PlayCircleIcon fontSize="small" color="action" />
                    <Typography>
                      Tech Stack – React, Node.js, MongoDB.
                    </Typography>
                  </Box>
                  <Typography className="text-muted small">15 mins</Typography>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* 3 */}
          <Accordion>
            <AccordionSummary
              sx={{ backgroundColor: "#E3E3E3" }}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <ExpandMoreIcon className="text-span" />
              <Typography variant="span" className="fw-semibold">
                Tailwind Setup
              </Typography>
              <Typography component="span" className="ms-auto text-muted small">
                3 lectures – 45 mins
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="d-flex flex-column gap-3">
                <Box className="d-flex justify-content-between align-items-center">
                  <Box className="d-flex align-items-center gap-2">
                    <PlayCircleIcon fontSize="small" color="action" />
                    <Typography>
                      App Overview – Build Text-to-Image SaaS
                    </Typography>
                  </Box>
                  <Typography className="text-muted small">10 mins</Typography>
                </Box>
                {/* 2 */}
                <Box className="d-flex justify-content-between align-items-center">
                  <Box className="d-flex align-items-center gap-2">
                    <PlayCircleIcon fontSize="small" color="action" />
                    <Typography>
                      Tech Stack – React, Node.js, MongoDB.
                    </Typography>
                  </Box>
                  <Typography className="text-muted small">15 mins</Typography>
                </Box>
                {/* 3 */}
                <Box className="d-flex justify-content-between align-items-center">
                  <Box className="d-flex align-items-center gap-2">
                    <PlayCircleIcon fontSize="small" color="action" />
                    <Typography>
                      Tech Stack – React, Node.js, MongoDB.
                    </Typography>
                  </Box>
                  <Typography className="text-muted small">15 mins</Typography>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Course description */}
        <Box className="courseDescription mt-4">
          <Typography className="fs-18 mt-3 fw-semibold" variant="p">
            Course Description
          </Typography>
          <Box className="mt-2 d-flex flex-column align-items-start text-span gap-2">
            <Typography className="fs-13">
              This is the most comprehensive and in-depth JavaScript course with
              30 JavaScript projects.{" "}
            </Typography>
            <Typography className="fs-13">
              JavaScript is currently the most popular programming language in
              the world. If you are an aspiring web developer or full stack
              developer, JavaScript is a must to learn. It also helps you to get
              high-paying jobs all over the world.
            </Typography>
            
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CourseStructure
