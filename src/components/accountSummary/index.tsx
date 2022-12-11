import { Box, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { colorHex } from "../../constants";
import { Announcement } from "../layout/Announcement";
import Footer from "../layout/Footer";
import AccountTable from "./customAccountTable";
import Filter from "./Filter";

const Account = () => {
  const matches = useMediaQuery("(min-width:1280px)");
  const { isSignedIn } = useContext(UserContext);
  const nav = useNavigate();
  useEffect(() => {
    if (isSignedIn === false) nav("/");
    return () => {};
  }, [isSignedIn]);

  return (
    <>
      <Box
        bgcolor={colorHex.bg1}
        m={{ lg: 0.5 }}
        minHeight="100vh"
        mt={{ lg: "100px" }}
      >
        {!matches && <Announcement />}

        <Box minHeight="calc(100vh - 60px)">
          <Filter></Filter>
          <AccountTable />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Account;
