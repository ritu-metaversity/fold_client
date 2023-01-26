import React, { FC } from "react";
import { Typography } from "@mui/material";
import { CardContainer, CardImg } from "./styledComponents";

interface Props {
  selected?: boolean;
  handleClick?: () => void;
}
const Card: FC<Props> = ({ selected, handleClick }) => {
  return (
    <CardContainer onClick={handleClick} className={selected ? "selected" : ""}>
      <CardImg src="assets/images/icon.png" />
      <Typography textAlign={"center"}>UPI</Typography>
    </CardContainer>
  );
};

export default Card;
