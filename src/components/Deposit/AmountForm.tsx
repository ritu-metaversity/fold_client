import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { StyledAmountInput, StyledButtonSmall } from "./styledComponents";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Typography } from "@mui/material";
import { colorHex } from "../../utils/constants";
import { userServices } from "../../utils/api/user/services";

interface Props {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
}
export function AmountForm({ amount, setAmount }: Props) {
  const [stack, setStack] = useState([]);

  const handleMinusClick = () => {
    setAmount((prev) => (prev - 10 > 100 ? prev - 10 : 100));
  };
  const handlePlusClick = () => {
    setAmount((prev) => (prev + 10 > 100 ? prev + 10 : 100));
  };

  const getStack = async () => {
    const { response } = await userServices.getWithdrawStack();
    if (response?.data) {
      setStack(response.data);
    }
  };
  useEffect(() => {
    getStack();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Math.abs(Math.floor(Number(e.target.value)))) {
      setAmount(Math.abs(Math.floor(Number(e.target.value))));
    } else if (e.target.value === "") {
      setAmount(0);
    }
  };
  return (
    <>
      {amount < 100 && amount !== 0 && (
        <Typography textAlign={"left"} color="error.main">
          Amount Should be more than or equal to 100.
        </Typography>
      )}
      <Box
        display={"flex"}
        marginY={2}
        flexDirection={{
          xs: "column",
          md: "row",
        }}
        alignItems={{
          xs: "center",
          md: "flex-end",
        }}
        gap={1}
        rowGap={5}
      >
        <Box
          width={{
            xs: "100%",
            md: "125px",
          }}
          textAlign="left"
        >
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
              placeholder="Amount"
              value={amount || ""}
              onChange={handleChange}
            />
            <AddIcon onClick={handlePlusClick} />
          </Box>
        </Box>
        <Box display="flex" flexWrap={"wrap"}>
          {stack.map(({ key, value }) => (
            <StyledButtonSmall
              key={`${value}-button`}
              onClick={() => setAmount((o) => Number(o) + Number(value))}
            >
              {key}
            </StyledButtonSmall>
          ))}
        </Box>
      </Box>
    </>
  );
}
