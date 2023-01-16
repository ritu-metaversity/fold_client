import * as React from "react";
// import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
import { Clear } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiPaper-root": {
    background: "#333333",
    margin:0,
    borderRadius: 10,
    width:"100%"
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-container": {
    alignItems: "flex-start",
    marginTop: 0,
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        py: 1,
        px: 2,
        bgcolor: "black",
        borderRadius: "0px 0px 8px 8px",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            border: "3px solid red",
            padding: 0,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Clear sx={{ margin: 0.5 }} fontSize="small" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface Props extends React.PropsWithChildren {
  title?: string;
  open: boolean;
  handleClose?: () => void;
}
export default function CustomizedDialogs({
  title,
  children,
  open,
  handleClose,
}: Props) {
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const matches = useMediaQuery("(max-width : 980px)");
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        maxWidth={matches ? "sm" : "md"}
        fullWidth
        PaperProps={{
          sx: {
            // position: "absolute",
            top: 0,
            margin: 0,
          },
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose ? handleClose : () => {}}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent>{children}</DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </div>
  );
}
