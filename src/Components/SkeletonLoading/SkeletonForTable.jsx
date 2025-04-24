import React from "react";
import { Box, Grid, Skeleton } from "@mui/material";

const SkeletonForTable = () => {
  const skeletonRows = Array.from({ length: 20 });

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Grid container spacing={2}>
        {skeletonRows.map((index) => (
          <Grid sx={{width:"100%"}} item size={{xs:12}} key={index}>
            <Skeleton variant="text" width="100%" height={30} />
            <Skeleton variant="text" width="100%" height={30} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkeletonForTable;
