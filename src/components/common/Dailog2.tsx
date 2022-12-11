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
import {  useMediaQuery } from "@mui/material";
import { Box, Breakpoint } from "@mui/system";
import { colorHex } from "../../constants";

export const BootstrapDialog = styled(Dialog)(({ theme, maxWidth }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),

  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    background: colorHex.bg1,
    borderRadius: 0,
    margin: 0,
    maxWidth: maxWidth ? maxWidth: 500,
    width: "100%",
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
    <DialogTitle sx={{ m: 0, p:1, bgcolor: colorHex.bg2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 4,
            p:0.5,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon fontSize="small" sx={{fontWeight:"800", lineHeight:"2" }} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
interface Props extends React.PropsWithChildren {
  title?: string;
  maxWidth?: Breakpoint | false;

  open: boolean;
  handleClose: () => void;
}
export default function CustomizedDialog2({children,maxWidth,open,title,handleClose}:Props) {

  const matches = useMediaQuery("(max-width: 580px)");
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={maxWidth}
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