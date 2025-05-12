import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import LockIcon from '@mui/icons-material/Lock';

const CourseStructure = ({ getSingleCourse, isEnrolled }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  return (
    <>
      <Box>
        <Box className="structureHead">
          <Typography className="fs-18 mt-3 fw-semibold" variant="p">
            Course Structure
          </Typography>
          <Box className="d-flex align-items-center gap-1">
            <Typography className="fs-13" variant="span">
              {`${getSingleCourse?.lessons?.length} Lessons`}
            </Typography>
            <Typography className="fs-13">/</Typography>
            <Typography className="fs-13" variant="span">
              27h 25m total duration
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          {/* Displaying one course to be default expanded on each course*/}
          <Accordion defaultExpanded>
            <AccordionSummary
              sx={{ backgroundColor: "#E3E3E3" }}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <ExpandMoreIcon className="text-span" />
              <Typography variant="span" className="fw-semibold">
                {getSingleCourse?.lessons?.[0]?.lessonTitle ||
                  "No lessons available"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="d-flex flex-column gap-3">
                <Box className="d-flex justify-content-between align-items-center">
                  <Box
                    onClick={() => {
                      if (isEnrolled) {
                        setActiveVideo(getSingleCourse?.lessons?.[0]);
                      }
                    }}
                    className="d-flex align-items-center gap-2"
                  >
                    {isEnrolled ? (
                      <PlayCircleIcon fontSize="small" color="action" />
                    ) : (
                      <LockIcon fontSize="small" color="action" />
                    )}
                    <Typography>
                      {getSingleCourse?.lessons?.[0]?.lessonVideoURL}
                    </Typography>
                  </Box>
                </Box>
                  {/* conditionally rendering the video */}
                  {activeVideo === getSingleCourse?.lessons?.[0] && (
                    <Box mt={2}>
                      <video width="600" height="340" controls>
                        <source
                          src={`http://localhost:5000/${getSingleCourse?.lessons?.[0]?.lessonVideoURL}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </Box>
                  )}
              </Box>
            </AccordionDetails>
          </Accordion>
          {getSingleCourse?.lessons?.slice(1).map(
            (
              lesson // slice excludes the 0
            ) => (
              <Accordion>
                <AccordionSummary
                  sx={{ backgroundColor: "#E3E3E3" }}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <ExpandMoreIcon className="text-span" />
                  <Typography variant="span" className="fw-semibold">
                    {lesson?.lessonTitle}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    onClick={() => {
                      if (isEnrolled) {
                        setActiveVideo(lesson?._id);
                      }
                    }}
                    className="d-flex align-items-center gap-2"
                  >
                    {isEnrolled ? (
                      <PlayCircleIcon fontSize="small" color="action" />
                    ) : (
                      <LockIcon fontSize="small" color="action" />
                    )}
                    <Typography>{lesson?.lessonVideoURL}</Typography>
                  </Box>
                  {/* conditionally rendering the video */}
                  {activeVideo === lesson._id && (
                    <Box mt={2}>
                      <video width="600" height="340" controls>
                        <source
                          src={`http://localhost:5000/${lesson.lessonVideoURL}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            )
          )}
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
};

export default CourseStructure;
