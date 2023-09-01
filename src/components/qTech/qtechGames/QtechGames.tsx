import { useEffect, useState } from "react";
import { qTechServices } from "../../../utils/api/qTechGames/services";
import Loading from "../../layout/loading";

function QtechGames() {
  const [GameLobbyUrl, setGameLobbyUrl] = useState<string | null>(null);

  const getGameLobbyHandler = async (token: string) => {
    const sessionToken = window.localStorage.getItem("token");

    const { response } = await qTechServices.gameLobby({
      // for real mode
      playerId: "12341234",
      currency: "INR",
      country: "IN",
      gender: "M",
      birthDate: "1986-01-01",
      lang: "en_IN",
      mode: "real",
      device: "desktop",
      walletSessionId: sessionToken,
      token,
    });

    if (!!response && response?.data && response?.data?.url) {
      const { url } = response?.data;
      setGameLobbyUrl(url);
    }
  };

  const authenticationHandler = async () => {
    const { response } = await qTechServices.authentication();

    if (!!response && response?.data && response?.data?.access_token) {
      const { access_token } = response?.data;

      window.localStorage.setItem("qtech_access_token", access_token);

      await getGameLobbyHandler(access_token);
    }
  };

  useEffect(() => {
    authenticationHandler();
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
