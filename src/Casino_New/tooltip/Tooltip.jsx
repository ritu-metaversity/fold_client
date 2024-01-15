import clsx from "clsx";
import {  useState } from "react";
import "./style.css";

const ToolTip = ({ title, placement }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className={"tooltip_container " + placement}>
        <i onClick={() => setOpen((o) => !o)} className="fas fa-info-circle " />
        <div className={clsx(open && "open", "tooltipBox")}>{title}</div>
      </div>
    </div>
  );
};

export default ToolTip;
