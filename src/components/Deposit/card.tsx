import React, { FC } from "react";
import { Typography } from "@mui/material";
import { CardContainer, CardImg } from "./styledComponents";

interface Props {
  selected?: boolean;
  details: {
    logo: string;
    methodName: string;
  };
  handleClick?: () => void;
}
const Card: FC<Props> = ({ selected, handleClick, details }) => {
  return (
    <CardContainer onClick={handleClick} className={selected ? "selected" : ""}>
      <CardImg src={details.logo} />
      <Typography textAlign={"center"}>{details.methodName}</Typography>
    </CardContainer>
  );
};

export default Card;
