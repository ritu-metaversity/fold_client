import styled from "@emotion/styled";

export const StyledComing = styled.div`
  height: calc(100vh - 100px);
  width: 100%;
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledGameThumb = styled.img`
  height: 100%;
  width: 100%;
  aspect-ratio: 1.8778;
  object-fit: cover;
`;
export const CasinoIcon = styled.img`
  height: 30px;
  @media (max-width: 768px) {
    height: 20px;
  }
`;