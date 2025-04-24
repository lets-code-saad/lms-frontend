import { Box, Typography } from '@mui/material';
import React from 'react'

const TrustComp = () => {
  return (
    <>
      <Box className="trustedCompanies container d-flex flex-column gap-4">
        <Box className="text-center">
          <Typography className="fs-15 mt-3 text-center" variant="p">
            Trusted by learners from
          </Typography>
        </Box>
        <Box className="companies-logos d-flex flex-wrap align-items-center justify-content-center gap-5">
          <img src="/imgs/microsoft_logo.svg" alt="" />
          <img src="/imgs/walmart_logo.svg" alt="" />
          <img src="/imgs/accenture_logo.svg" alt="" />
          <img src="/imgs/adobe_logo.svg" alt="" />
          <img src="/imgs/paypal_logo.svg" alt="" />
        </Box>
      </Box>
    </>
  );
}

export default TrustComp
