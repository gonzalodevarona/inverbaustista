import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Box sx={{
        
      }}>
        <Outlet />
      </Box>
    </>
  );
};

export default MainLayout;