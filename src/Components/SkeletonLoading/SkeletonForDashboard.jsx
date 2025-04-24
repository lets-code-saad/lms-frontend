import React from "react";
import { Box, Grid, Skeleton } from "@mui/material";

const SkeletonForDashboard = () => {
  const skeletonRows = Array.from({ length: 20 });

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Grid container spacing={2}>
        <Grid sx={{ width: "100%" }} item size={{ xs: 12, lg: 3,xl:3,sm:12 }}>
          <Skeleton variant="text" height={130} />
        </Grid>
        <Grid sx={{ width: "100%" }} item size={{ xs: 12, lg: 3,xl:3,sm:12 }}>
          <Skeleton variant="text" height={130} />
        </Grid>
        <Grid sx={{ width: "100%" }} item size={{ xs: 12, lg: 3,xl:3,sm:12 }}>
          <Skeleton variant="text" height={130} />
        </Grid>
        {skeletonRows.map((_, index) => (
          <Grid sx={{ width: "100%" }} item size={{ xs: 12 }} key={index}>
            <Skeleton variant="text" width="100%" height={30} />
            <Skeleton variant="text" width="100%" height={30} />
            <Skeleton variant="text" width="100%" height={30} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkeletonForDashboard;
