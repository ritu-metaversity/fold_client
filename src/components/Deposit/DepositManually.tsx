import { AmountForm } from "./AmountForm";
import { PaymentMethods } from "./PaymentMethods";
import React, { FC, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ImageUploadContainer } from "./styledComponents";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { userServices } from "../../utils/api/user/services";
import Loading from "../layout/loading";

interface Props {
  getDepositList: () => Promise<void>;
}
const DepositManually: FC<Props> = ({ getDepositList }) => {
  const [amount, setAmount] = useState(0);
  const [files, setFiles] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("amount", amount.toString());

    data.append("image", files || "");
    setLoading(true);
    const { response } = await userServices.selfDeposit(data);
    if (response) {
      setAmount(0);
      setFiles(null);
      getDepositList();
    }
    setLoading(false);
  };
  return (
    <>
      {loading && (
        <Box
          sx={{ opacity: 0.8, zIndex: 20 }}
          height={"100%"}
          position="absolute"
          width={"100%"}
        >
          <Loading />
        </Box>
      )}
      <AmountForm amount={amount} setAmount={setAmount} />
      {amount > 0 && (
        <Box maxWidth={{ lg: 500 }} m={"auto"}>
          <h2 style={{ color: "white" }}>Pay {amount}/-</h2>
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
              disabled={loading}
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
