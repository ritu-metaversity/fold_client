import { Box, useMediaQuery } from "@mui/material";
import CurrentBetTable from "../../currentBets/table";
import { userServices } from "../../../utils/api/user/services";
import { useEffect, useState } from "react";
import { FilterCurrentBets } from "../../currentBets/types";
import { betTypes } from "../../currentBets";
import { Form } from "react-bootstrap";
import Filter from "./Filter";
import { columnCasino, columnSports } from "../../currentBets/columns";

const CurrentBetsForModal = () => {
  const matches = useMediaQuery("(min-width:1280px)");
  const [sportsRow, setSportsRow] = useState([]);
  const [totalBet, setTotalBet] = useState(0);
  const [totalStake, setTotalStake] = useState(0);
  const [searchFilters, setSearchFilters] = useState<FilterCurrentBets>({
    type: "all",
    category: 1,
    status: "matched",
  });
  const getList = async () => {
    const payload = {
      betType: betTypes.indexOf(searchFilters.type),
      sportType: searchFilters.category,
      noOfRecords: 1000,
      index: 0,
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
      //   setSearchFilters({
      //     ...searchFilters,
      //     totalPages: response.data.totalPages,
      //   });
    }
  };
  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilters.type, searchFilters.category]);

  return (
    <>
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
    </>
  );
};

export default CurrentBetsForModal;
