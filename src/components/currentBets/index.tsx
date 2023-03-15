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
  const [totalBet, setTotalBet] = useState(0);
  const [totalStake, setTotalStake] = useState(0);
  const [searchFilters, setSearchFilters] = useState<SearchFiltersCurrentBets>({
    type: "all",
    category: 1,
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
      sportType: searchFilters.category,
    };
    const { response } = await userServices.currentBets(payload);
    if (response?.data) {
      setSportsRow(
        response.data.dataList?.map((row: any) => {
          row.action = <Form.Check type="checkbox" />;
          return row;
        }) || []
      );
      setTotalBet(response.data.totalBets);
      setTotalStake(response.data.totalStake);
      setSearchFilters({
        ...searchFilters,
        totalPages: response.data.totalPages,
      });
    }
  };
  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchFilters.type,
    searchFilters.pageSize,
    searchFilters.index,
    searchFilters.category,
  ]);

  return (
    <>
      <AccountContainer>
        {!matches && <Announcement />}

        <Box minHeight="calc(100vh - 60px)">
          <Filter
            searchFilters={searchFilters}
            totalBet={totalBet}
            totalStake={totalStake}
            setSearchFilters={setSearchFilters}
          ></Filter>
          {/* <Box sx={{ display: { xs: "none", lg: "block" } }}> */}
          <CurrentBetTable
            rows={sportsRow}
            columns={searchFilters.category === 2 ? columnCasino : columnSports}
          />
        </Box>
        {sportsRow.length > 0 && (
          <Pagination
            count={searchFilters.totalPages}
            siblingCount={0}
            color="secondary"
            page={searchFilters.index + 1}
            onChange={(e, page) =>
              setSearchFilters({ ...searchFilters, index: page - 1 })
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
