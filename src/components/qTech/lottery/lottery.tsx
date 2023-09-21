import { Toolbar } from "@mui/material";
import ProviderTabsWithGames from "../providerTabsWithGames/providerTabsWithGames";

const Lottery = () => {
  return (
    <div>
      <Toolbar />
      <ProviderTabsWithGames filter={"lottery"} />
    </div>
  );
};

export default Lottery;
