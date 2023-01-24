import React, { ChangeEvent, useState } from "react";
import { StyledAmountInput, StyledButtonSmall } from "./styledComponents";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Typography } from "@mui/material";
import HomeLayout from "../layout/homeLayout";
import { colorHex } from "../../utils/constants";

const buttonAmountArr = [100, 500, 1000, 5000];
const Deposit = () => {
  const [amount, setAmount] = useState(0);

  const handleMinusClick = () => {
    setAmount((prev) => (prev - 10 > 100 ? prev - 10 : 100));
  };
  const handlePlusClick = () => {
    setAmount((prev) => (prev + 10 > 100 ? prev + 10 : 100));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Math.abs(Math.floor(Number(e.target.value)))) {
      setAmount(Math.abs(Math.floor(Number(e.target.value))));
    } else if (e.target.value === "") {
      setAmount(0);
    }
  };
  return (
    <HomeLayout>
      <Box
        display={"flex"}
        width={{ xs: "95%", md: "100%" }}
        marginY={2}
        marginX="auto"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "flex-end" }}
        gap={1}
        rowGap={5}
      >
        <Box width={{ xs: "100%", md: "125px" }} textAlign="left">
          <Typography variant="caption" textAlign={"left"}>
            Enter Amount:
          </Typography>
          <Box
            bgcolor={colorHex.bg3}
            p="0 5px"
            alignItems="center"
            borderRadius={"8px"}
            height={46}
            display="flex"
          >
            <RemoveIcon onClick={handleMinusClick} />
            <StyledAmountInput
              type="text"
              // onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57"
              placeholder="Amount"
              value={amount || ""}
              onChange={handleChange}
            />{" "}
            <AddIcon onClick={handlePlusClick} />
          </Box>
        </Box>
        <Box display="flex">
          {buttonAmountArr.map((amount) => (
            <StyledButtonSmall
              key={`${amount}-button`}
              onClick={() => setAmount((o) => o + amount)}
            >
              +{amount}
            </StyledButtonSmall>
          ))}
        </Box>
        <Button color="secondary" variant="contained" sx={{ color:"white" }} >SUBMIT</Button>
      </Box>
    </HomeLayout>
  );
};

export default Deposit;
