import { React, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import "./Alert.css";

function AlertBtn(props) {
  const [showHide, setShowHide] = useState(true);
  // const [showTime, setShowTime]=useState(true)

  const handleClick = () => {
    // setShowTime(false)
    props.popupClose(false);
    if (showHide === true) {
      setShowHide(false);
    } else {
      setShowHide(true);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      props.popupClose(false);
      setShowHide(false);
    }, 5000);
    
  }, [props.val]);
  
  return (
    <>
      {showHide ? (
        <Alert variant={props.color} className="alert-messege">
          <p className="error-mes" style={{ float: "left" }}>
            {props.val}
          </p>
          <p>
            <i
              className="fa fa-close"
              style={{ float: "right" }}
              onClick={handleClick}></i>
          </p>
        </Alert>
      ) : (
        ""
      )}
    </>
  );
}

export default AlertBtn;
