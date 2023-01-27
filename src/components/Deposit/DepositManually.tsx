import { PaymentMethods } from "./PaymentMethods";
import React, { ChangeEvent, useState } from "react";
import Card from "./card";
import { StyledAmountInput, StyledButtonSmall } from "./styledComponents";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Typography } from "@mui/material";
import { colorHex } from "../../utils/constants";
import { ImageUploadContainer } from "./styledComponents";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { userServices } from "../../utils/api/user/services";

const buttonAmountArr = [100, 500, 1000, 5000];

const DepositManually = () => {
  const [amount, setAmount] = useState(0);
  const [files, setFiles] = useState<Blob | null>(null);

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

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("amount", amount.toString());

    data.append("image", files || "");
    const { response } = await userServices.selfDeposit(data);
    if (response) {
      setAmount(0);
      setFiles(null);
    }
  };
  return (
    <>
      <Box
        display={"flex"}
        marginY={2}
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
        <Button color="secondary" variant="contained" sx={{ color: "white" }}>
          Submit
        </Button>
      </Box>
      {amount > 0 && (
        <Box>
          <h2 style={{ color: "white" }}>Pay 10000/-</h2>
          <PaymentMethods />
          <label style={{ width: "100%" }}>
            {files ? (
              <img
                style={{ maxWidth: "90%", margin: "auto" }}
                src={URL.createObjectURL(files)}
                alt="uploaded_img"
              />
            ) : (
              <ImageUploadContainer>
                <AddCircleIcon htmlColor="white" />
                <Typography>Click here to upload payment screenshot</Typography>
              </ImageUploadContainer>
            )}
            <input
              onChange={(e) => e.target.files && setFiles(e.target.files[0])}
              type="file"
              style={{ display: "none" }}
            />
          </label>
          {files && (
            <Button
              fullWidth
              sx={{ my: 3 }}
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          )}
        </Box>
      )}
    </>
  );
};

export default DepositManually;
