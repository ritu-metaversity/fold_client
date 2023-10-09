import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Modal,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useContext, useEffect, useState } from "react";
import "./casinoGame.css";
import { useNavigate, useParams } from "react-router-dom";
// import HomeLayout from "../../layout/homeLayout";
import { UserContext } from "../../../App";
import { Close } from "@mui/icons-material";
import { colorHex } from "../../../utils/constants";
import CustomizedDialogs from "../../common/Dailog";
import { casinoService } from "../../../utils/api/casino/service";
import CustomizedDialog2 from "../../common/Dailog2";
import CasinoConfirmationModal from "./CasinoConfirmationModal";

interface Props {
  id?: number;
  handleClose: () => void;
  name?: string;
  desktopUrl?: string;
  mobileUrl?: string;
  type: "supernowa" | "aura" | "qtech" | "sportBook" | "fantasyGames";
}
const CasinoGame: FC<Props> = ({
  handleClose,
  id,
  name,
  desktopUrl,
  mobileUrl,
  type,
}) => {
  const matches = useMediaQuery("(max-width: 580px)");
  const [wait, setWait] = useState(false);
  const [open, setOpen] = useState(true);
  const [openCasino, setOpenCasino] = useState(false);

  // const { id } = useParams();
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  const { isSignedIn } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !isSignedIn || !id) {
      nav("/");
    }
  }, [id, isSignedIn]);

  useEffect(() => {
    setWait(true);
    setOpen(true);
    const timer = setTimeout(() => setWait(false), 5);
    return () => {
      clearTimeout(timer);
    };
  }, [id]);

  const handleAgree = () => {
    setOpen(false);
    setOpenCasino(true);
  };
  const handleNotAgree = () => {
    handleClose();
    setOpen(false);
  };
  return (
    // <HomeLayout>
    <>
      <Modal
        onClose={handleClose}
        open={Boolean(openCasino && id)}
        sx={{ padding: { xs: 2, lg: 6 } }}
      >
        <Box mt={{ lg: 0 }} height="calc(100vh - 110px)">
          <DialogTitle
            display={{ xs: "none", md: "block" }}
            color="primary.main"
            position={"relative"}
            bgcolor={"secondary.light"}
          >
            {name}
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", right: 16 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>

          {matches ? (
            <>
              <Box
                right={16}
                top={16}
                width={100}
                height={50}
                position="absolute"
                // zIndex={999999 + 1}
                bgcolor="#0f2327"
              >
                <IconButton
                  onClick={handleClose}
                  sx={{ ml: "auto", mr: 1, mt: -1, display: "block" }}
                >
                  <Close />
                </IconButton>
              </Box>
              {/* <Box
                left={26}
                top={16}
                width={50}
                // zIndex={999999 + 1}
                height={44}
                position="absolute"
                bgcolor="#0f2327"
              ></Box> */}
              {id && token && !wait && (
                <iframe
                  src={desktopUrl}
                  // height="calc(100vh - 100px)"
                  height={"100vh"}
                  className="mobile_if"
                  width="100%"
                  title="mobile"
                  allowFullScreen={true}
                ></iframe>
              )}
            </>
          ) : (
            <>
              {/* <Box
            right={5}
            top={95}
            width={340}
            height={70}
            position="absolute"
            bgcolor="#0f2327"
          ></Box> */}
              <iframe
                src={mobileUrl}
                // height="calc(90vh - 10rem)"
                // style={{ height: "2000px", marginTop: -80 }}
                className="desktop_if"
                width="100%"
                title="desktop"
              />
            </>
          )}
        </Box>
      </Modal>
      {/* <CustomizedDialog2
        title="Attention"
        handleClose={() => setOpen(false)}
        open={open}
      >
        {singleUserValue.message}
      </CustomizedDialog2> */}
      <Dialog
        PaperProps={{ sx: { overflow: "visible" } }}
        open={true}
        fullWidth
      >
        <DialogContent>
          <CasinoConfirmationModal
            type={type}
            handleAgree={handleAgree}
            handleNotAgree={handleNotAgree}
          />
        </DialogContent>
      </Dialog>
    </>

    // </HomeLayout>
  );
};

export default CasinoGame;
