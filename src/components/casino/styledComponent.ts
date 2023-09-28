import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const StyledComing = styled.div`
  height: calc(100vh - 100px);
  width: 100%;
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledGameThumb = styled.img`
  /* height: 100%; */
  width: 100%;
  /* aspect-ratio: 1.8778; */
  object-fit: cover;
`;
export const CasinoIcon = styled.img`
  height: 30px;
  @media (max-width: 768px) {
    height: 20px;
  }
`;
export const CasinoActionContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  flex-direction: row;
  @media (max-width: 450px) {
    row-gap: 10px;

    flex-direction: column;
  }
`;
export const CasinoAction = styled(Button)`
  flex: 1;
  /* @media (max-width: 450px) {
    width: 100%;
  } */
`;