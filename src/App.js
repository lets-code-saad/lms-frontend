import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import SkeletonForLoading from "./Components/SkeletonLoading/SkeletonForAllCards";
import { Box } from "@mui/material";
import { CirclesWithBar, InfinitySpin, Oval } from "react-loader-spinner";
import fetchCourses from "./Components/Store/Thunks/coursesThunk";

function App() {
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },1500)
  },[])
  
  return (
    <>
      {loading ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f8f8f8",
          }}
        >
          {/* <CirclesWithBar height={80} width={80} color="#2563EB" /> */}
          Loading....
        </div>
      ) : (
        <Box>
          <Header />
          <Main />
          <Footer />
        </Box>
      )}
    </>
  );
}

export default App;
