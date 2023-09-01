import ProviderCard from "../../common/providerCard/ProviderCard";
import classes from "./Games.module.css";
import { useNavigate } from "react-router-dom";
import { gamesProviders } from "./provider";

function Games() {
  const navigation = useNavigate();

  const routeHandler = function (url: string, prefix: string) {
    let urlStr: string = "";
    if (prefix) urlStr = prefix + "/" + url;
    else urlStr = url;
    navigation(urlStr);
  };

  return (
    <div className={"mid_container"}>
      <div className={classes["card_container"]}>
        {gamesProviders.map((el) => (
          <ProviderCard
            onClick={() => routeHandler(el?.url, el?.prefix)}
            key={el?.name}
            bg={el?.bg}
            heading={el?.name}
            para={el?.para}
          />
        ))}
      </div>
    </div>
  );
}

export default Games;
