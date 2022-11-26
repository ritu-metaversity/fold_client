import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

export function LoginForm({}) {
  return (
    <Box bgcolor="black" borderRadius={4} p={2} mt={2}>
      <form
        style={{
          gap: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography fontWeight={700}>UserName</Typography>
        <TextField
          placeholder="Enter Username"
          fullWidth
          margin="dense"
          sx={{
            bgcolor: "background.default",
          }}
        />
        <Typography fontWeight={700}> Password</Typography>
        <TextField
          placeholder="Enter Password"
          fullWidth
          margin="dense"
          sx={{
            bgcolor: "background.default",
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                mb: "auto",
              }}
            />
          }
          label={
            "I am at least 18 years of age and I have read, accept and agree to the Terms and Conditions , Responsible Gaming , GamCare, Gambling Therapy"
          }
        />
        <Button
          sx={{
            p: 2.5,
          }}
          variant="contained"
          color="success"
          fullWidth
        >
          Submit
        </Button>
        <Typography variant="caption">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </Typography>
      </form>
    </Box>
  );
}
