import * as React from "react";

// import { Box } from "@mui/system";
import { BootstrapDialog, BootstrapDialogTitle } from "../../common/Dailog2";
import { DialogTitleStyledTypo } from "./styledComponents";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../../App";
import ResetPasswordForm from "./ResetPasswordForm.tsx";

function CustomizedDialogPassword() {
  const [open, setOpen] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { modal, setModal } = React.useContext(UserContext);

  React.useEffect(() => {
    if (modal.changePassword) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [modal]);

  const handleClose = () => {
    searchParams.delete("first-login");
    setSearchParams(searchParams);
    setOpen(false);
    if (setModal) setModal((prev) => ({ ...prev, changePassword: false }));
  };

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
          <DialogTitleStyledTypo>Change Password</DialogTitleStyledTypo>
          <ResetPasswordForm handleClose={handleClose} />
        </BootstrapDialogTitle>
      </BootstrapDialog>
    </>
  );
}
export default React.memo(CustomizedDialogPassword);
