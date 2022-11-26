import Header, { drawerWidth } from "./header";

import React, { FC, PropsWithChildren } from "react";
import Footer from "./Footer";
import {  Grid, Toolbar, useMediaQuery } from "@mui/material";
import { Announcement } from "./Announcement";
import BoxWithTitle from "../common/BoxWithTitle";
import { BlinkImage } from "./styledComponents";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const matches = useMediaQuery("(min-width:1200px)");

  return (
    <div>
      <Header></Header>
      <Grid
        container
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
        <Grid
          item
          xs={12}
          lg={9.5}
          sx={{ display: "flex", gap: 0.5, flexDirection: "column" }}
        >
          <Toolbar />
          {!matches && <Announcement />}
          {children}
          <Footer />
        </Grid>
        <Grid item xs={0} lg={2.4} p={0.5} gap={0.5}>
          <Toolbar />
          <BoxWithTitle title="New Launched">
            <BlinkImage src="/assets/lc/ab3.jpg" alt="" />
          </BoxWithTitle>
          <BoxWithTitle title="Our Casino" >
            <BlinkImage src="/assets/lc/ab3.jpg" alt="" />
            <BlinkImage src="/assets/lc/abj.jpg" alt="" />
            <BlinkImage src="/assets/lc/card32.jpg" alt="" />
            <BlinkImage src="/assets/lc/dt6.jpg" alt="" />
            <BlinkImage src="/assets/lc/dt20.jpg" alt="" />
            <BlinkImage src="/assets/lc/dt202.jpg" alt="" />
            <BlinkImage src="/assets/lc/dum10.jpg" alt="" />
            <BlinkImage src="/assets/lc/kbc.jpg" alt="" />
          </BoxWithTitle>
        </Grid>
      </Grid>
      {/* <Footer/> */}
    </div>
  );
};

export default Layout;
