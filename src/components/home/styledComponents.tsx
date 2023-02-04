import styled from "@emotion/styled"
import { Button, Theme } from "@mui/material";
export const HeroImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 4.27753303965;
  overflow: hidden;
  gap: 8px;
  display: flex;
`;

export const HeroImageContainerHalf = styled.div`
  width: 100%;
  aspect-ratio: 4;
  overflow: hidden;
  gap: 8px;
  display: flex;
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const HeroImageHalf = styled.img`
  width: 50% !important;
  border-radius: 8px;
  height: 100%;
`;

export const WhiteForNull = styled.div`
  padding: 1px 8px;
  margin: auto;
  background-color: white;
  color: white;
`;

export const OddButton = styled(Button)`
  padding: 2px;
  ${({ theme }: { theme: Theme }) => theme.breakpoints.up("lg")} {
    padding: 0;
  }
  color: #000;
  font-weight: 700;
`;