import Header, { drawerWidth } from "./header";

import React, { FC, PropsWithChildren } from "react";
import Footer from "./Footer";
import { Box, Grid, Toolbar, useMediaQuery } from "@mui/material";
import { Announcement } from "./Announcement";
import BoxWithTitle from "../common/BoxWithTitle";
import { BlinkImage } from "./styledComponents";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const matches = useMediaQuery("(min-width:1200px)");

  return (
    <div>
      <Header></Header>
      <Toolbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // p: 3,
          zIndex: -10,
          ml: { lg: `${drawerWidth}px` },
          display: "flex",
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          mt: { lg: 1.2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            // flexGrow: 1,
            maxWidth: {
              lg: "calc(100% - 250px)",
              xl: "calc(100% - 300px)",
            },
            gap: 0.5,
            flexDirection: "column",
          }}
        >
          {!matches && <Announcement />}
          {children}
          <Footer />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: 0, lg: 250, xl: 300 },
            boxSizing: "content-box"
          }}
          // xs={0}
          // lg={3}
          p={0.5}
          gap={5}
        >
          <BoxWithTitle title="New Launched">
            <BlinkImage src="/assets/lc/ab3.jpg" alt="" />
          </BoxWithTitle>
          <BoxWithTitle title="Our Casino">
            <BlinkImage src="/assets/lc/ab3.jpg" alt="" />
            <BlinkImage src="/assets/lc/abj.jpg" alt="" />
            <BlinkImage src="/assets/lc/card32.jpg" alt="" />
            <BlinkImage src="/assets/lc/dt6.jpg" alt="" />
            <BlinkImage src="/assets/lc/dt20.jpg" alt="" />
            <BlinkImage src="/assets/lc/dt202.jpg" alt="" />
            <BlinkImage src="/assets/lc/dum10.jpg" alt="" />
            <BlinkImage src="/assets/lc/kbc.jpg" alt="" />
          </BoxWithTitle>
        </Box>
      </Box>
      {/* <Footer/> */}
    </div>
  );
};

export default Layout;
