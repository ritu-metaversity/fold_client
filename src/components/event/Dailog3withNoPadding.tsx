import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { colorHex } from "../../utils/constants";
import { BootstrapDialogTitle } from "../common/Dailog2";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(0),

  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    background: colorHex.bg1,
    borderRadius: 0,
    margin: 0,
    maxWidth: 500,
    width: "100%",
  },
}));

interface Props extends React.PropsWithChildren {
  title?: string;
    open: boolean;
    handleClose: () => void;
}
export default function CustomizedDialog3WOPadding({children,open,title,handleClose}:Props) {
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}

      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
                  <Typography color="primary.main">{title}</Typography>
        </BootstrapDialogTitle>
        <DialogContent
          sx={{ bgcolor: colorHex.bg1, color: "text.secondary" }}
          dividers
        >
          {children}
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}