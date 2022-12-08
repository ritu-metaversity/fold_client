import Header, { drawerWidth, drawerWidthXl } from "./header";

import React, { FC, PropsWithChildren } from "react";
import { Box, BoxProps, Theme, Toolbar, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledMain = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  // p: 3,
  zIndex: -10,
  display: "flex",
  [theme.breakpoints.up("lg")]: {
    marginTop: 1.2,
    marginLeft: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
  },

  [theme.breakpoints.up("xl")]: {
    marginLeft: `${drawerWidthXl}px`,
    width: `calc(100% - ${drawerWidthXl}px)`,
  },
}));

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const matches = useMediaQuery("(min-width:1280px)");

  return (
    <div>
      <Header></Header>
      <Toolbar />

      {children}
      {/* <Footer/> */}
    </div>
  );
};

export default Layout;
