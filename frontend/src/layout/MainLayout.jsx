import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <Outlet />

      </Box>
      <Footer />


    </>
  );
};

export default MainLayout;
