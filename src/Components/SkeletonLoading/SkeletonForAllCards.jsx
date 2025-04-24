import React from "react";
import { Card, CardHeader, CardContent, Skeleton, Avatar, Box, Grid } from "@mui/material";


const SkeletonForLoading = () => {
  const skeletonCards = Array.from({length:8})
  return (
    <Box className="container">
      <Grid container spacing={3}>
        {skeletonCards.map((cards) => (
          <Grid item key={cards} size={{ sm: 12, xs: 12, lg: 3, xl: 3 }}>
            <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
              <CardHeader
                avatar={
                  <Skeleton animation="wave" variant="circular">
                    <Avatar />
                  </Skeleton>
                }
                title={
                  <Skeleton
                    animation="wave"
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                  />
                }
                subheader={
                  <Skeleton animation="wave" height={10} width="40%" />
                }
              />
              <Skeleton
                sx={{ height: 190 }}
                animation="wave"
                variant="rectangular"
              />
              <CardContent>
                <React.Fragment>
                  <Skeleton
                    animation="wave"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
                </React.Fragment>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkeletonForLoading;
