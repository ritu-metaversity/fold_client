import { Toolbar } from "@mui/material";
import ProviderTabsWithGames from "../providerTabsWithGames/providerTabsWithGames";

function Slot() {
  return (
    <div>
      <Toolbar />
      <ProviderTabsWithGames filter={"slot"} />
    </div>
  );
}

export default Slot;
