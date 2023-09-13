import classes from "./providers.module.css";

interface Props {
  getName: (value: string) => void;
  value: string;
  providerList: { name: string; logo: string; filterType: string }[];
  cls?: string;
}

function ProvidersTabs({ getName, value, providerList, cls }: Props) {
  return (
    <div className={!cls ? classes["contianer"] : classes[cls!]}>
      {providerList.map((el) => (
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
