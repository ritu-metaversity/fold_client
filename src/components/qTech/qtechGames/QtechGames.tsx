import { useEffect, useState } from "react";
import { qTechServices } from "../../../utils/api/qTechGames/services";
import Loading from "../../layout/loading";
import { isMobile, isBrowser } from "react-device-detect";

function QtechGames() {
  const [GameLobbyUrl, setGameLobbyUrl] = useState<string | null>(null);

  const getGameLobbyHandler = async (token: string) => {
    const sessionToken = window.localStorage.getItem("token");

    const { response } = await qTechServices.gameLobby({
      // for real mode
      // playerId: "12341234",
      // currency: "INR",
      // country: "IN",
      // gender: "M",
      // birthDate: "1986-01-01",
      // lang: "en_IN",
      mode: "real",
      device: `${(isMobile && "mobile") || (isBrowser && "desktop")}`,
      walletSessionId: sessionToken,
      token,
    });

    if (!!response && response?.data && response?.data?.url) {
      const { url } = response?.data;
      setGameLobbyUrl(url);
    }
  };



  useEffect(() => {
    const accessToken = window.localStorage.getItem("qtech_access_token");
    if (accessToken) {
      getGameLobbyHandler(accessToken);
    }
  }, []);

  return (
    <div className={"mid_container"}>
      {!GameLobbyUrl ? <Loading /> : null}
      {!!GameLobbyUrl ? (
        <iframe
          title="Q-tech-games"
          width="100%"
          height="100%"
          src={GameLobbyUrl}
        />
      ) : null}
    </div>
  );
}

export default QtechGames;
