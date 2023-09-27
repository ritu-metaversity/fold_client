import { Toolbar } from "@mui/material";
import ProviderTabsWithGames from "../providerTabsWithGames/providerTabsWithGames";

function LiveCasino() {
  return (
    <div>
      <Toolbar />
      <ProviderTabsWithGames filter={"casino"} />
    </div>
  );
}

export default LiveCasino;
