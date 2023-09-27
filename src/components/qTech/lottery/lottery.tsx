import { Toolbar, useMediaQuery } from "@mui/material";
import ProviderTabsWithGames from "../providerTabsWithGames/providerTabsWithGames";

const Lottery = () => {
  const isMobile = useMediaQuery("(max-width: 1210px)");

  return (
    <div>
      {!!isMobile ? null : <Toolbar />}
      <ProviderTabsWithGames filter={"lottery"} />
    </div>
  );
};

export default Lottery;
