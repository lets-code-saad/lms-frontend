import React, { useEffect, useState } from "react";
import Navbar from "../../../Header/Navbar/Navbar";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import LeftSingle from "./LeftSingle/LeftSingle";
import RightSingle from "./RightSingle/RightSingle";
import "./CssSinglePage/SingleCourse.css"
import Footer from "../../../Footer/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInterceptor from "../../../../Middlewares/axiosInterceptor";
import singleCourse from "../../../Store/Thunks/singleCourseThunk";
import SkeletonForLoading from "../../../SkeletonLoading/SkeletonForAllCards";
import SkeletonForSingle from "../../../SkeletonLoading/SkeletonForSingle";
import enrollCourse from "../../../Store/Thunks/enrollCourse";

const SingleCourse = () => {

  const dispatch = useDispatch()
  // restructuring product_id from params
  const { product_id } = useParams()


  useEffect(() => {
    dispatch(singleCourse(product_id))
},[dispatch,product_id])

  const { loading} = useSelector((state)=>state.GetSingleCourse)
  
  return (
    <>
      <Box>
        {/* Displaying navbar */}
        <Box
          sx={{ background: "linear-gradient(to bottom, #E6FFFF, #FFFFFF)" }}
        >
          <Navbar />
        </Box>
        {/* signle page */}
        {/* displaying single course page left side */}
{loading ? <SkeletonForSingle/> :        <Box className="singlePage_lg container pt-5">
          <Grid container spacing={4} justifyContent={"space-between"}>
            <Grid item size={{ xs: 12, sm: 12, lg: 8, xl: 6 }}>
              <LeftSingle courseId={product_id} />
            </Grid>
            <Grid item size={{ xs: 12, sm: 12, lg: 4, xl: 6 }}>
              <RightSingle courseId={product_id} />
            </Grid>
          </Grid>
        </Box>}

        {/* Mobile Screen Single Page */}
        <Box className="singlePage_sm container pt-5">
          <Grid
            container
            spacing={4}
            flexDirection={"column-reverse"}
            justifyContent={"space-between"}
          >
            <Grid item size={{ xs: 12, sm: 12, lg: 8, xl: 6 }}>
              <LeftSingle courseId={product_id} />
            </Grid>
            <Grid item size={{ xs: 12, sm: 12, lg: 4, xl: 6 }}>
              <RightSingle courseId={product_id} />
            </Grid>
          </Grid>
        </Box>

        {/* Displaying footer */}
        <Footer />
      </Box>
    </>
  );
};

export default SingleCourse;
