import classes from "./providers.module.css";
import { data } from "./providers.data";

interface Props {
  getName: (value: string) => void;
  value: string;
}

function ProvidersTabs({ getName, value }: Props) {
  return (
    <div className={classes["contianer"]}>
      {data.map((el) => (
        <div
          onClick={() => getName(el?.filterType)}
          key={el?.name}
          className={classes["tab_container"]}
        >
          <div
            className={`${classes["tab"]} ${
              classes[value === el?.filterType ? "active" : ""]
            }`}
          >
            <img src={el?.logo} alt="provider logo" />
            <p>{el?.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProvidersTabs;
