import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Grid, MenuItem, TextField } from "@mui/material";
import { colorHex } from "../../../constants";
import { userServices } from "../../../utils/api/user/services";
import { Box } from "@mui/system";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    background: colorHex.bg1,
    borderRadius: 10,

    maxWidth: "xs",
    innerWidth: "100%",
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, bgcolor: colorHex.bg2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,

            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CustomizedDialogStack() {
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [buttonValue, setButtonValue] = React.useState<{ [x: string]: number }>(
    {
      stack1: 0,
      stack2: 0,
      stack3: 0,
      stack4: 0,
      stack5: 0,
      stack6: 0,
      stack7: 0,
      stack8: 0,
      stack9: 0,
      stack10: 0,
    }
  );

  const handleChange = (e: any) => {
    const buttons = { ...buttonValue };
    setButtonValue({ ...buttons, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    const getButtonValue = async () => {
      const { response } = await userServices.getButtonValue();
      if (response?.data) {
        setButtonValue(response.data);
      }
    };
    getButtonValue();
    return () => {};
  }, []);

  const handleClick = async (e: any) => {
    await userServices.updateButtonValue(buttonValue);
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>Set Button Value</MenuItem>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography color="primary.main">Set Button Value</Typography>
        </BootstrapDialogTitle>
        <DialogContent
          sx={{ bgcolor: colorHex.bg1, color: "text.secondary" }}
          dividers
        >
          <Box p={0.5}>
            <Button
              sx={{
                borderRadius: "10px 10px 0px 0px",
                bgcolor: tab ? colorHex.bg6 : colorHex.bg2,
                color: "white",
                fontWeight: 700,
                m: 0.5,
              }}
              onClick={() => setTab(false)}
            >
              Game Buttons
            </Button>
            <Button
              sx={{
                borderRadius: "10px 10px 0px 0px",
                bgcolor: !tab ? colorHex.bg6 : colorHex.bg2,
                color: "white",
                fontWeight: 700,
                m: 0.5,
              }}
              onClick={() => setTab(true)}
            >
              {" "}
              Casino Buttons
            </Button>
            <Grid container bgcolor={colorHex.bg2} p={1}>
              <Grid item xs={6}>
                Price Label
              </Grid>
              <Grid item xs={6}>
                Price Value
              </Grid>
            </Grid>
          </Box>

          {Object.keys(buttonValue).map((item) => (
            <Grid container key={item}>
              <Grid item xs={6} p={0.5}>
                <TextField
                  value={item}
                  disabled
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{ bgcolor: colorHex.bg6, fontSize: "0.8rem", p: 0 }}
                />
              </Grid>
              <Grid item xs={6} p={0.5}>
                <TextField
                  value={buttonValue[item]}
                  fullWidth
                  size="small"
                  name={item}
                  onChange={handleChange}
                  variant="outlined"
                  type={"number"}
                  sx={{ bgcolor: colorHex.bg6, fontSize: "0.8rem", p: 0 }}
                />
              </Grid>
            </Grid>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={handleClick}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
