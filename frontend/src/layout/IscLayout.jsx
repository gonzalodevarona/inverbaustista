import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import { Box } from "@mui/material";

const IscLayout = () => {
  return (
    <>
      <SideMenu>
        <Outlet />
      </SideMenu>
    </>
  );
};

export default IscLayout;