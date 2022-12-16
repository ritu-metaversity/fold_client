import React from "react";
import { homeRightMenu } from "../home";
import HomeLayout from "../layout/homeLayout";
import { StyledComing } from "./styledComponent";

const Casino = () => {
  return (
    <HomeLayout sideWidth={250} sideWidthXl={300} rightMenu={homeRightMenu}>
      <StyledComing>Coming Soon ..... </StyledComing>
    </HomeLayout>
  );
};
export default Casino;
