import React from "react";
import { Card, CardHeader, CardContent, Skeleton, Avatar, Box, Grid } from "@mui/material";


const SkeletonForSingle = () => {
  return (
    <Box className="container">
      <Grid container spacing={3}>
          <Grid item size={{ sm: 12, xs: 12, lg: 8, xl: 8 }}>
            <Card sx={{ marginBottom: 2 }}>
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
              <Skeleton
                sx={{ height: 250, marginTop:"10px" }}
                animation="wave"
                variant="rectangular"
              />
              <Skeleton
                sx={{ height: 250, marginTop:"10px" }}
                animation="wave"
                variant="rectangular"
              />
            </Card>
          </Grid>
          <Grid item size={{ sm: 12, xs: 12, lg: 4, xl: 4 }}>
            <Card sx={{ marginBottom: 2 }}>
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
                sx={{ height: 250 }}
                animation="wave"
                variant="rectangular"
              />
              <Skeleton
                sx={{ height: 250 }}
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
      </Grid>
    </Box>
  );
};

export default SkeletonForSingle;
