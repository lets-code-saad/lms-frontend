import { Box, Button, CardMedia, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import SchoolIcon from "@mui/icons-material/School"
import { NavLink, Outlet } from "react-router-dom"
import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import "./LessonsSidebar.css"
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

const LessonsSidebar = ({
  lessons,
  setLessons,
  currentLesson,
  setCurrentLesson,
  handleLessonClick,
  currLessonIndex,
  setCurrLessonIndex,
}) => {

  return (
    <>
      <Box
        sx={{ height: "80vh", width: "100%" }}
        className="manageCourseDiv d-flex gap-3 mt-1"
      >
        <Box
          sx={{ width: "100%", height: "47px" }}
          className="manageCourseNav d-flex flex-column gap-2"
        >
          {lessons?.map((lesson, index) => {
            return (
              <Button
                key={index}
                onClick={() => handleLessonClick(index)}
                className={
                  currLessonIndex === index
                    ? "d-flex align-items-center gap-1 text-capitalize lessonActive px-3 py-2"
                    : "d-flex align-items-center gap-1 text-capitalize lessonUnactive px-3 py-2"
                }
                style={{ cursor: "pointer" }}
              >
                <MenuBookIcon sx={{ fontSize: "20px" }} />
                <Typography className="fs-16">Lesson {index + 1}</Typography>
              </Button>
            );
          })}
          <Button
            onClick={() => {
              const lastLesson = lessons[lessons.length-1]
const newDummyLesson = {
  lessonTitle: "",
  lessonDescription: "",
  lessonVideoURL: null,
              };
              if (lastLesson && (lastLesson?.lessonTitle?.trim() === "" ||
                lastLesson.lessonDescription?.trim() === "" ||
          lastLesson.lessonVideoURL === null)) {
            toast.error("Please complete this lesson first!")
               
              }
              else {
                 setLessons((prev) => [...prev, newDummyLesson]);

                 setCurrentLesson(newDummyLesson);
                 setCurrLessonIndex(lessons.length);
              }
            }}
            className="d-flex align-items-center gap-1 lessonUnactive text-capitalize px-3 py-2"
            style={{ cursor: "pointer" }}
          >
            <AddIcon sx={{ fontSize: "20px" }} />
            <Typography className="fs-16">Add New Lesson</Typography>
          </Button>
        </Box>

        <Divider
          className="courseManagerDivider"
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#ddd" }}
        />
      </Box>
    </>
  );
};

export default LessonsSidebar;
