import { Box, Pagination, PaginationItem, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { AccountContainer } from "../accountSummary/styledComponents";
import { Announcement } from "../layout/Announcement";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Footer from "../layout/Footer";
import Filter from "./Filter";
import { SearchFiltersCurrentBets } from "./types";
import "./formRadio.css";
import CurrentBetTable from "./table";
import { columnCasino, columnSports } from "./columns";
import { Form, Row } from "react-bootstrap";

const sportsRow = [
  {
    sportName: "Cricket",
    eventName: "Bangladesh v India",
    market: "MATCH_ODDS",
    nation: "India",
    rate: "1.45",
    amount: "100",
    date: "15/12/2022 10:26:21",
    action: <Form.Check type="checkbox" />,
    type: "back",
  },
  {
    sportName: "Cricket",
    eventName: "Bangladesh v India",
    market: "MATCH_ODDS",
    nation: "India",
    rate: "1.45",
    amount: "100",
    date: "15/12/2022 10:26:21",
    action: <Form.Check type="checkbox" />,
    type: "lay",
  },
];

const CurrentBets = () => {
  const matches = useMediaQuery("(min-width:1280px)");
  const [page, setPage] = useState(1);
  const [searchFilters, setSearchFilters] = useState<SearchFiltersCurrentBets>({
    type: "all",
    category: "sports",
    status: "matched",
    pageSize: 25,
  });
  console.log(sportsRow,Math.ceil(sportsRow.length / searchFilters.pageSize),sportsRow.length
  )
  return (
    <>
      <AccountContainer>
        {!matches && <Announcement />}

        <Box minHeight="calc(100vh - 60px)">
          <Filter
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
          ></Filter>
          {/* <Box sx={{ display: { xs: "none", lg: "block" } }}> */}
          <CurrentBetTable
            rows={searchFilters.category === "sports" ? sportsRow : []}
            columns={
              searchFilters.category === "casino" ? columnCasino : columnSports
            }
          />
         
        </Box>
        {sportsRow.length>0 && <Pagination
          count={Math.ceil(sportsRow.length / searchFilters.pageSize)}
          siblingCount={0}
          color="secondary"
          page={page}
          onChange={(e, page) => setPage(page)}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                first: KeyboardDoubleArrowLeftIcon,
                last: KeyboardDoubleArrowRightIcon,
              }}
              {...item}
            />
          )}
          sx={{
            display: "inline-block",
            maxWidth: "100%",
            m: "auto",
            mt:0,
            justifyContent: "center",
          }}
          showFirstButton
          showLastButton
        />}
      </AccountContainer>
      <Footer />
    </>
  );
};

export default CurrentBets;
