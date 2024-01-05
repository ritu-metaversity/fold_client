import { useEffect, useState } from "react";
import classes from "./GamePortal.module.css";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { qTechServices } from "../../../utils/api/qTechGames/services";
import { isMobile, isBrowser } from "react-device-detect";
import { Dialog, DialogContent } from "@mui/material";
import CasinoConfirmationModal from "../../casino/game/CasinoConfirmationModal";
interface Props {
  gameName: string;
  close: () => void;
}

function GamePortal({ gameName, close }: Props) {
  const [GameUrl, setGameUrl] = useState<string | null>(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const getSingleGame = async () => {
    const access_token = window.localStorage.getItem("qtech_access_token");
    const sessionToken = window.localStorage.getItem("token");

    if (access_token) {
      if (gameName) {
        const { response } = await qTechServices.singleGame({
          playerId: "121212",
          currency: "INR",
          country: "IN",
          gender: "M",
          birthDate: "1986-01-01",
          lang: "en_IN",
          mode: "real",
          device: `${(isMobile && "mobile") || (isBrowser && "desktop")}`,
          returnUrl: window.location.origin,
          walletSessionId: sessionToken,
          token: access_token,
          gameName,
        });
        if (!!response && response.data && response?.data?.url) {
          const { url } = response.data;
          setGameUrl(url);
        }
      } else {
        const { response } = await qTechServices.gameLobby({
          playerId: "121212",
          currency: "INR",
          country: "IN",
          gender: "M",
          birthDate: "1986-01-01",
          lang: "en_IN",
          mode: "real",
          device: `${(isMobile && "mobile") || (isBrowser && "desktop")}`,
          returnUrl: window.location.origin,
          walletSessionId: sessionToken,
          token: access_token,
          //  gameName,
        });
        if (!!response && response.data && response?.data?.url) {
          const { url } = response.data;
          setGameUrl(url);
        }
      }

      // if (!!response && response.data && response?.data?.url) {
      //   const { url } = response.data;
      //   setGameUrl(url);
      // }
    }
  };

  useEffect(() => {
    getSingleGame();
  }, []);

  const handleAgree = () => {
    setOpenConfirmationModal(true);
    // setOpenCasino(true);
  };
  const handleNotAgree = () => {
    close();
    setOpenConfirmationModal(false);
  };

  if (!openConfirmationModal) {
    return (
      <Dialog
        PaperProps={{ sx: { overflow: "visible" } }}
        open={true}
        fullWidth
      >
        <DialogContent>
          <CasinoConfirmationModal
            type={"qtech"}
            handleAgree={handleAgree}
            handleNotAgree={handleNotAgree}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return createPortal(
    <div className={classes["container"]}>
      <div className={classes["main_div"]}>
        <div className={classes["close_icon"]} onClick={close}>
          <CloseIcon />
        </div>
        {!!GameUrl ? (
          <iframe
            className={classes["responsive-iframe"]}
            width="100%"
            height="100%"
            title="q-tech-game-pr"
            src={GameUrl}
          />
        ) : null}
      </div>
    </div>,
    document.body as HTMLElement
  );
}

export default GamePortal;
