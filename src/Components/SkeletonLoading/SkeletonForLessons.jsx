import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Skeleton,
} from "@mui/material";

const SkeletonForLessons = (props) => {
    
  return (
    <>

        <Skeleton variant="text" width="100%" height={30} />


          <Box>
            <Box className="inputsFields d-flex flex-column gap-3">
              {/* TITLE */}
              <Box className="d-flex flex-column">{/* INPUT */}<Skeleton variant="rectangular" width="100%" height={50} /></Box>

              {/* DESCRIPTION */}
              <Box className="d-flex flex-column">{/* INPUT */}<Skeleton variant="rectangular" width="100%" height={50} /></Box>
              {/* VIDEO UPLOAD */}
              <Box className="thumbnailOrPriceDiv d-flex align-items-center justify-content-between">
                <Box className="courseThumbDiv d-flex align-items-center gap-3">
                 {/* TEXT */}
                                  <Skeleton variant="text" width="100%" height={30} />
                </Box>
              </Box>
              <Box className="d-flex justify-content-end">
                {" "}
                <Box className="d-flex align-items-center">
                  <Box>
                    {/* Button */}
                    <Skeleton variant="rounded" width="30%" height={50} />
                  </Box>
                  <DialogActions>
                    <Skeleton variant="rounded" width="30%" height={50} />
                    {/* Button */}
                  </DialogActions>
                </Box>
              </Box>
            </Box>
          </Box>


    </>
  );
};

export default SkeletonForLessons;
