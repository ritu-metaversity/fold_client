import { Toolbar } from "@mui/material";
import ProviderTabsWithGames from "../providerTabsWithGames/providerTabsWithGames";
import { useMediaQuery } from "@mui/material";

function InstantWin() {
  const isMobile = useMediaQuery("(max-width: 1210px)");

  return (
    <div>
      {!!isMobile ? null : <Toolbar />}
      <ProviderTabsWithGames filter={"instantWin"} />
    </div>
  );
}

export default InstantWin;
