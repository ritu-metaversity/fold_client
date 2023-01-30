import * as React from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Grid, TextField } from "@mui/material";
import { colorHex } from "../../../utils/constants";
import { userServices } from "../../../utils/api/user/services";
import { Box } from "@mui/system";
import { BootstrapDialog, BootstrapDialogTitle } from "../../common/Dailog2";
import { DialogTitleStyledTypo } from "./styledComponents";
import { MenuItem } from "./AvatarMenu";


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
          <DialogTitleStyledTypo >
            Set Button Value
          </DialogTitleStyledTypo>
        </BootstrapDialogTitle>
        <DialogContent
          sx={{ bgcolor: colorHex.bg1, color: "text.secondary" }}
          dividers
        >
          <Box>
            <Button
              sx={{
                borderRadius: "5px 5px 0px 0px",
                bgcolor: tab ? colorHex.bg3 : colorHex.bg2,
                fontWeight: 500,
                color:"text.secondary",
                my: 0.5,
                p: "8px 16px",
                fontSize: "0.8rem",
              }}
              onClick={() => setTab(false)}
            >
              Game Buttons
            </Button>
            {/* <Button
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
            </Button> */}
            <Grid
              container
              bgcolor={colorHex.bg2}
              p={1}
              fontSize="0.8rem"
              fontWeight={700}
            >
              <Grid item xs={6}>
                Price Label
              </Grid>
              <Grid item xs={6}>
                Price Value
              </Grid>
            </Grid>
          </Box>

          {Object.keys(buttonValue).map((item) => (
            <Grid
              container
              key={item}
              border={`1px solid ${colorHex.borderLine}`}
            >
              <Grid item xs={6} p={0.5}>
                <TextField
                  value={item}
                  disabled
                  fullWidth
                  size="small"
                  variant="outlined"
                  InputProps={{ style: { fontSize: "0.8rem" } }}
                  sx={{ bgcolor: colorHex.bg6 }}
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
                  InputProps={{ style: { fontSize: "0.8rem" } }}
                  type={"number"}
                  sx={{ bgcolor: colorHex.bg6, fontSize: "0.8rem" }}
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
            sx={{ color: "white"}}
          >
            Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
