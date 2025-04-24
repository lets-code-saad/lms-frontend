import React from 'react'
import Navbar from './Navbar/Navbar'
import HeroSection from './HeroSection/HeroSection'
import { Box } from '@mui/material'
import TrustComp from './TrustCompanies/TrustComp'

const Header = () => {
  return (
    <>
      <Box sx={{ background: "linear-gradient(to bottom, #E6FFFF, #FFFFFF)"}}>
        <Navbar />
        <Box sx={{ marginTop: "90px" }}>
          <HeroSection />
        </Box>
      </Box>
      {/* Trusted Companies Component */}
      <Box sx={{marginTop:"80px"}}>
      <TrustComp />
      </Box>
    </>
  );
}

export default Header
