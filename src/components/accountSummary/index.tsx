import { Box, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { Announcement } from "../layout/Announcement";
import Footer from "../layout/Footer";
import { columns } from "./columns";
import AccountTable from "./customAccountTable";
import Filter from "./Filter";
import { AccountContainer } from "./styledComponents";
import { rows } from "./StyledTableHeaderCell";

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
      <AccountContainer>
        {!matches && <Announcement />}

        <Box minHeight="calc(100vh - 60px)">
          <Filter></Filter>
          <AccountTable columns={columns} rows={rows} />
        </Box>
      </AccountContainer>
      <Footer />
    </>
  );
};

export default Account;
