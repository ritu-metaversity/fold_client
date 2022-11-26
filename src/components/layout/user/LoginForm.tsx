import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  useTheme,
  useThemeProps,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { colorHex } from "../../../constants";

interface Props {
  values: {
    userId: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function LoginForm({ handleChange, values, handleSubmit}: Props) {
  const theme = useTheme();
  return (
    <Box bgcolor="black" borderRadius={2} p={2} mt={2}>
      <form
        onSubmit={handleSubmit}
        style={{
          gap: "15px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography fontWeight={700}>
          UserName
          <TextField
            placeholder="Enter Username"
            fullWidth
            margin="dense"
            sx={{
              bgcolor: colorHex.bg4,
              mt: -0.3,
            }}
            required
            name="userId"
            value={values.userId}
            onChange={handleChange}
          />
        </Typography>
        <Typography fontWeight={700}>
          Password
          <TextField
            placeholder="Enter Password"
            fullWidth
            margin="dense"
            sx={{
              bgcolor: colorHex.bg4,
              mt: -0.3,
            }}
            required
            name="password"
            value={values.password}
            onChange={handleChange}
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
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                mb: "auto",
              }}
            />
          }
          label={
            <Typography variant="caption">
              I am at least 18 years of age and I have read, accept and agree to
              the Terms and Conditions , Responsible Gaming, GamCare, Gambling
              Therapy
            </Typography>
          }
        />
        <Button
          sx={{
            p: 2.5,
          }}
          variant="contained"
          color="secondary"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Typography fontSize={"0.5rem"}>
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </Typography>
      </form>
    </Box>
  );
}
