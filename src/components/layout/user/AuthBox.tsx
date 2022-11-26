import { LoginForm } from './LoginForm';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CustomizedDialogs from "../../common/Dailog";
import { LoginButton, UserContainer } from "../styledComponents";
import { Info, InfoOutlined } from '@mui/icons-material';
import { FaInfo } from "react-icons/fa"
export function AuthBox({}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  return (
    <UserContainer>
      <Box
        display={{
          xs: "none",
          lg: "block",
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Username*"
          required
          sx={{ borderRadius: 0 }}
        />
        <Link
          to=""
          style={{
            display: "block",
            fontSize: "0.8rem",
            textAlign: "right",
            color: theme.palette.primary.main,
            textDecoration: "none",
          }}
        >
          Forgot Password ?
        </Link>
      </Box>
      <Box
        display={{
          xs: "none",
          lg: "block",
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Password*"
          sx={{ borderRadius: 0 }}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              sx={{
                my: -1,
              }}
              defaultChecked
            />
          }
          label={
            <Typography component={"span"} fontSize={"0.7rem"} my={0}>
              I agree terms & conditions.
              <Tooltip title="I am at least 18 years of age and I have read, accept and agree to the Terms and Conditions , Responsible Gaming , GamCare, Gambling Therapy">
             <FaInfo style={{padding:1}} />
              </Tooltip>
            </Typography>
          }
          sx={{
            display: "block",
            fontSize: "0.6rem",
            ml: "auto",
            my: 0,
          }}
        />
      </Box>
      <LoginButton
        variant="contained"
        sx={{
          height: "2.5rem",
        }}
        onClick={() => setOpen(true)}
      >
        Login
      </LoginButton>
      <CustomizedDialogs title="Login" open={open} setOpen={setOpen}>
        <LoginForm />
      </CustomizedDialogs>
    </UserContainer>
  );
}
