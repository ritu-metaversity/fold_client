import { useEffect, useState } from "react";
import classes from "./GamePortal.module.css";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { qTechServices } from "../../utils/api/qTechGames/services";

interface Props {
  gameName: string;
  close: () => void;
}

function GamePortal({ gameName, close }: Props) {
  const [GameUrl, setGameUrl] = useState<string | null>(null);

  const getSingleGame = async () => {
    const access_token = window.localStorage.getItem("qtech_access_token");
    const sessionToken = window.localStorage.getItem("token");

    console.log(access_token);
    if (access_token) {
      const { response } = await qTechServices.singleGame({
        playerId: "121212",
        currency: "INR",
        country: "IN",
        gender: "M",
        birthDate: "1986-01-01",
        lang: "en_IN",
        mode: "real",
        device: "desktop",
        returnUrl: "http://playindia.app",
        walletSessionId: sessionToken,
        token: access_token,
        gameName,
      });

      if (!!response && response.data && response?.data?.url) {
        const { url } = response.data;
        setGameUrl(url);
      }
    }
  };

  useEffect(() => {
    getSingleGame();
  }, []);

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
