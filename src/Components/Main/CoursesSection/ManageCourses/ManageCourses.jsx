import React, { useState } from 'react'
import Navbar from '../../../Header/Navbar/Navbar';
import ManageLeft from './Left/ManageLeft';
import { Box } from '@mui/material';
import ManageRight from './Right/ManageRight';

const ManageCourses = () => {

  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <>
      {/* importing navbar */}
      <Navbar onDashboardClick={() => setShowSidebar(!showSidebar)} />

      <Box className="container">
        <ManageLeft />
        <ManageRight />
      </Box>
    </>
  );
}

export default ManageCourses
