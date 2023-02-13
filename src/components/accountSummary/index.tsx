/* eslint-disable react-hooks/exhaustive-deps */
import { Box, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import {
  AccountStatementPayload,
  userServices,
} from "../../utils/api/user/services";
import { Announcement } from "../layout/Announcement";
import Footer from "../layout/Footer";
import { columns } from "./columns";
import AccountTable from "./customAccountTable";
import Filter from "./Filter";
import { AccountContainer } from "./styledComponents";

export function subtractMonths(numOfMonths: number, date = new Date()) {
  date.setMonth(date.getMonth() - numOfMonths);
  return date;
}


export function subtractWeeks(numOfWeek: number, date = new Date()) {
  date.setDate(date.getDate() - numOfWeek * 7);
  return date;
}

export interface AccountStatementFilter extends AccountStatementPayload {
  totalPages: number;
}
const Account = () => {
  const matches = useMediaQuery("(min-width: 1280px)");
  const { isSignedIn } = useContext(UserContext);
  const [rows, setRows] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    if (isSignedIn === false) nav("/");
    return () => {};
  }, [isSignedIn]);

  const [searchFilters, setSearchFilters] = useState<AccountStatementFilter>({
    type: 1,
    noOfRecords: 25,
    totalPages: 1,
    index: 0,
    fromDate: subtractMonths(1).toISOString().split("T")[0],
    toDate: new Date().toISOString().split("T")[0],
  });

  const getStatement = async () => {
    const { response } = await userServices.accountStatement(searchFilters);
    if (response?.data) {
      setRows(response.data.dataList);
      setSearchFilters({
        ...searchFilters,
        totalPages: response.data.totalPages,
      });
    }
  };
  useEffect(() => {
    getStatement();
  }, [
    searchFilters.toDate,
    searchFilters.fromDate,
    searchFilters.noOfRecords,
    searchFilters.index,
    searchFilters.type,
  ]);
  return (
    <>
      <AccountContainer>
        {!matches && <Announcement />}

        <Box minHeight="calc(100vh - 60px)">
          <Filter
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
          ></Filter>
          <AccountTable
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
            columns={columns}
            rows={rows}
          />
        </Box>
      </AccountContainer>
      <Footer />
    </>
  );
};

export default Account;
