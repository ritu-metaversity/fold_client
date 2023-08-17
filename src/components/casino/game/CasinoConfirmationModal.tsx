import React, { FC, useEffect, useState } from "react";
import { casinoService } from "../../../utils/api/casino/service";
import { Box, Button, DialogActions, Typography } from "@mui/material";

interface SingleUserValue {
  message: string;
  value: number;
}

interface Props {
  handleAgree: () => void;
  handleNotAgree: () => void;
}
const CasinoConfirmationModal: FC<Props> = ({
  handleAgree,
  handleNotAgree,
}) => {
  const [singleUserValue, setSingleUserValue] = useState<SingleUserValue>({
    message: "",
    value: 0,
  });
  useEffect(() => {
    (async () => {
      const { response } = await casinoService.singleUserValue();
      if (response?.data) {
        setSingleUserValue(response.data);
        console.log(response, "dakfj;lakdf;");
      }
    })();
  }, []);
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
        (1 point = ₹{singleUserValue.value})
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
        If you place ₹100 your bet will be ₹{100 * singleUserValue.value} Win or
        Loss according to the above calculation.
      </Typography>
      <Typography>
        यदि आप ₹100 लगाते हैं तो उपरोक्त गणना के अनुसार आपकी शर्त जीत या हार ₹
        {100 * singleUserValue.value} होगी।
      </Typography>
      <DialogActions>
        <Button variant="contained" onClick={handleAgree} sx={{ width: "50%" }}>
          Ok I Agree
        </Button>
        <Button
          variant="contained"
          onClick={handleNotAgree}
          color="error"
          sx={{ width: "50%" }}
        >
          No, I Dont Agree
        </Button>
      </DialogActions>
    </Box>
  );
};

export default CasinoConfirmationModal;
