import { Toolbar, useMediaQuery } from "@mui/material";
import ProviderTabsWithGames from "../providerTabsWithGames/providerTabsWithGames";

function LiveCasino() {
  const isMobile = useMediaQuery("(max-width: 1210px)");

  return (
    <div>
      {!!isMobile ? null : <Toolbar />}
      <ProviderTabsWithGames filter={"LIVECASINO"} />
    </div>
  );
}

export default LiveCasino;
