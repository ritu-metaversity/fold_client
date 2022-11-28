import styled from "@emotion/styled";
import { Box, Button, ListItemText, ListSubheader, Theme } from "@mui/material";
import { Link } from "react-router-dom";

export const CenterBox = styled(Box)`
  display: flex;
  justify-content: center;
  padding: 0.5em;
`;
export const BlinkImage = styled.img`
  width:100%;
`;
export const TopNavLinks = styled(Link)`
  font-weight: 900;
  text-decoration: none;
  color: #aaafb5;
  margin: 0 0.8em;
  padding-bottom:0;
  font-size: 0.9rem;
  &:active {
    color: #fdcf13;
    padding-bottom: 0.2em;
    border-bottom: 2px solid #fdcf13;
  }
`;
export const SidebarHeader = styled(ListSubheader)`
  padding: 0;
  color: #fdcf13;
  text-decoration: underline;
`;
export const AnnouncementBox = styled(Box)`
  flex: 1;
  background-color: #70315670;
  padding: 10px;
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
`;
export const Icon = styled.img`
  max-width: 300px;
  width: 100%;
`;
export const IconSmall = styled.img`
  max-width: 120px;
  width: 100%;
  margin-left: -10px;
  margin-bottom: -10px;
  @media (min-width: 1200px) {
    display: none !important;
  }
`;

export const LoginButton = styled(Button)({
  borderRadius: 0,
  paddingInline: 15,
});

export const UserContainer = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  marginLeft: "auto",
  gap: 10,
});
