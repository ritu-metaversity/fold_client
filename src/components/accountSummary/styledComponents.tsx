import styled from "@emotion/styled"
import { colorHex } from "../../utils/constants";
export const PdfIcon = styled.img`
  max-width: 40px;
  height: auto;
`;

export const AccountContainer = styled.div`
  background-color: ${colorHex.bg1};
  min-height: 100vh;
  @media (min-width: 1280px) {
    margin: 4px;
    min-height: 100vh;
    margin-top: 100px;
  }
`;