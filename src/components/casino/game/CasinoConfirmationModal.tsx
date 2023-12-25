import React, { FC, useContext, useEffect } from "react";
import { Box, DialogActions, Typography } from "@mui/material";
import { CasinoAction, CasinoActionContainer } from "../styledComponent";
import { UserContext } from "../../../App";

interface Props {
  type: "supernowa" | "aura" | "qtech" | "sportBook" | "fantasyGames";
  handleAgree: () => void;
  handleNotAgree: () => void;
}
const CasinoConfirmationModal: FC<Props> = ({
  handleAgree,
  handleNotAgree,
  type,
}) => {
  const { singleUserValue } = useContext(UserContext);
  useEffect(() => {
    if (singleUserValue?.[type] === 1) {
      handleAgree();
    }
  }, [singleUserValue, type]);

  if (singleUserValue?.[type] === 1) {
    return <></>;
  }

  return (
    <Box textAlign={"center"} overflow={"visible"} paddingTop={20}>
      {/* {singleUserValue.message} */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img className="upper_left_icon" src="/assets/images/casino.png"></img>
      </Box>
      <Typography variant="button" textAlign="center" color="primary.main">
        Please Note
      </Typography>
      <Typography my={2} variant="h4">
        (1 point = ₹{singleUserValue?.[type]})
      </Typography>
      <Typography>
        <Typography
          variant="button"
          component={"span"}
          mr={1}
          color="primary.main"
        >
          For Example:
        </Typography>
        If you place ₹100 your bet will be ₹
        {100 * (singleUserValue?.[type] || 0)} Win or Loss according to the
        above calculation.
      </Typography>
      <Typography>
        यदि आप ₹100 लगाते हैं तो उपरोक्त गणना के अनुसार आपकी शर्त जीत या हार ₹
        {100 * (singleUserValue?.[type] || 0)} होगी।
      </Typography>
      <DialogActions>
        <CasinoActionContainer>
          <CasinoAction variant="contained" onClick={handleAgree}>
            Ok I Agree
          </CasinoAction>
          <CasinoAction
            variant="contained"
            onClick={handleNotAgree}
            color="error"
          >
            No, I Dont Agree
          </CasinoAction>
        </CasinoActionContainer>
      </DialogActions>
    </Box>
  );
};

export default CasinoConfirmationModal;
