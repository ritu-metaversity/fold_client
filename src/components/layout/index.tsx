import Header, { drawerWidth } from "./header";

import React, { FC, PropsWithChildren } from "react";
import Footer from "./Footer";
import {  Grid, Toolbar, useMediaQuery } from "@mui/material";
import { Announcement } from "./Announcement";

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
          mt: { lg: 3 },
        }}
      >
        <Grid
          item
          xs={12}
          lg={9.5}
          sx={{ display: "flex", gap: 1, flexDirection: "column" }}
        >
          <Toolbar />
          {!matches && <Announcement />}
          {children}
          <Footer />
        </Grid>
        <Grid item xs={0} lg={2.4}>
          <Toolbar />
          asdfdfjalsdfj a sdf askdflakj df a dflkadf{" "}
          <a href="dfkafakhsdaldkf ">akjf;klda jdkf dahkf alfa sdfhads dlf</a>
        </Grid>
      </Grid>
      {/* <Footer/> */}
    </div>
  );
};

export default Layout;
