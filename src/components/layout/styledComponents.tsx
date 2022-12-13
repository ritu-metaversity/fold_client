import styled from "@emotion/styled";
import { AppBar, Box, Button, ListSubheader } from "@mui/material";
import { Link } from "react-router-dom";

export const CenterBox = styled(Box)`
  display: flex;
  justify-content: center;
  padding: 0.5em;
`;
export const BlinkImage = styled.img`
  width: 100%;
`;
export const TopNavLinks = styled(Link)`
  font-weight: 900;
  text-decoration: none;
  color: #aaafb5;
  margin: 0 0.8em;
  padding-bottom: 0;
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
  @media (max-width: 1280px) {
    padding-block: 2px;
    border-radius : 5px;  
    margin: 5px;
    height : initial;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SpeakerIcon = styled.img`
  width: 35px;
  margin-right: -10px;
  // margin-top: -0.5em;
  text-align: right;
  @media (max-width: 1280px) {
    width: 20px;
    margin-top:  0em;
  }
`;

export const Icon = styled.img`
  padding: 10px;
  cursor: pointer;
  max-width: 250px;
  @media (max-width: 1280px) {
    display: none;
  }
  width: 100%;
`;
export const IconSmall = styled.img`
  width: 95px;
  height: 40px;
  aspect-ratio: 1;
  cursor: pointer;
  margin-left: -10px;
  margin-bottom: -10px;
  @media (min-width: 768px) {
    width: 120px;
    height: 50px;
  }
  @media (min-width: 1280px) {
    display: none !important;
  }
`;

export const StyledAppBar = styled(AppBar)`
  flex-direction: row !important ;
  padding-top: 8px;
`;
export const LoginButton = styled(Button)({
  borderRadius: 0,
  paddingInline: 15,
});

export const UserContainer = styled(Box)`
  display:flex;
  margin-left:auto;
`;
