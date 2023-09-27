import { useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, PropsWithChildren } from "react";
import { StyledMain } from ".";
import { Announcement } from "./Announcement";
import Footer from "./Footer";

interface Props extends PropsWithChildren {
  sideWidth?: number;
  sideWidthXl?: number;
  rightMenu?: any;
}
const HomeLayout: FC<Props> = ({
  children,
  sideWidth = 0,
  sideWidthXl = 0,
  rightMenu = "",
}) => {
  const theme = useTheme();
  const matches = useMediaQuery("(min-width:1280px)");
  return (
    <StyledMain>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          // flexGrow: 1,
          maxWidth: {
            lg: `calc(100% - ${sideWidth}px)`,
            xl: `calc(100% - ${sideWidthXl}px)`,
          },
          pr: 1,
          gap: 0.7,
          flexDirection: "column",
        }}
      >
        {/* {!matches && <Announcement />} */}
        {children}
        <Footer />
      </Box>
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          right: 0,
          position: "fixed",
          height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px  - ${theme.mixins.toolbar.minHeight}px )`,
          width: { xs: 0, lg: sideWidth, xl: sideWidthXl },
          boxSizing: "content-box",
        }}
        px={0.5}
        gap={5}
      >
        {rightMenu}
      </Box>
    </StyledMain>
  );
};

export default HomeLayout;
