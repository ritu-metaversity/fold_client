import { Box, Pagination, PaginationItem, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { Form } from "react-bootstrap";
import { userServices } from "../../utils/api/user/services";


const betTypes = ["none", "all", "back", "lay"];

const CurrentBets = () => {
  const matches = useMediaQuery("(min-width:1280px)");
  const [sportsRow, setSportsRow] = useState([]);
  const [searchFilters, setSearchFilters] = useState<SearchFiltersCurrentBets>({
    type: "all",
    category: "sports",
    status: "matched",
    pageSize: 25,
    totalPages: 1,
    index: 0,
  });
  const getList = async () => {
    const payload = {
      betType: betTypes.indexOf(searchFilters.type),
      noOfRecords: searchFilters.pageSize,
      index: searchFilters.index,
      sportType: 1,
    };
    const { response } = await userServices.currentBets(payload);
    if (response?.data?.dataList) {
      setSportsRow(
        response.data.dataList.map((row: any) => {
          row.action = <Form.Check type="checkbox" />;
          return row;
        })
      );
      setSearchFilters({
        ...searchFilters,
        totalPages: response.data.totalPages,
      });
    }
  };
  useEffect(() => {
    getList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilters.type, searchFilters.pageSize, searchFilters.index]);

  console.log(
    sportsRow,
    Math.ceil(sportsRow.length / searchFilters.pageSize),
    sportsRow.length
  );
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
        {sportsRow.length > 0 && (
          <Pagination
            count={searchFilters.totalPages}
            siblingCount={0}
            color="secondary"
            page={searchFilters.index+1}
            onChange={(e, page) =>
              setSearchFilters({ ...searchFilters, index: page-1 })
            }
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
              mt: 0,
              justifyContent: "center",
            }}
            showFirstButton
            showLastButton
          />
        )}
      </AccountContainer>
      <Footer />
    </>
  );
};

export default CurrentBets;
