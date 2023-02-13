import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  // useThemeProps,
} from "@mui/material";
import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { colorHex } from "../../../utils/constants";
import Loading from "../loading";

interface Props {
  loading: boolean;
  values: {
    userId: string;
    password: string;
    checked: boolean;
  };
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  reset: () => void;
}

function LoginForm({
  handleChange,
  values,
  handleSubmit,
  loading,
  reset,
}: Props) {
  const theme = useTheme();
  useEffect(() => {
    return () => reset();
  }, []);
  return (
    <Box position="relative">
      {loading && (
        <Box
          sx={{ opacity: 0.8, zIndex: 200000 }}
          height={"100%"}
          position="absolute"
          width={"100%"}
          top="0"
          right="0"
        >
          <Loading />
        </Box>
      )}
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
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <a
              href="https://wa.me/17168156061"
              target={"_blank"}
              rel="noreferrer"
              style={{
                display: "block",
                fontSize: "0.8rem",
                textAlign: "right",
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              Forgot Password ?
            </a>
          </Typography>
          <Form.Check
            name="checked"
            onChange={handleChange}
            checked={values.checked}
            type="checkbox"
            label={
              <Typography ml={0.5} color="white" variant="caption">
                I am at least 18 years of age and I have read, accept and agree
                to the Terms and Conditions , Responsible Gaming, GamCare,
                Gambling Therapy
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
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </Typography>
        </form>
      </Box>
    </Box>
  );
}

 export default React.memo(LoginForm);