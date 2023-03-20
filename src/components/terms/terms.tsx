import React, { useEffect, useState } from "react";
import { utilServices } from "../../utils/api/util/services";

const Terms = () => {
  const [termCondition, setTermCondition] = useState({ termandcondition: "" });
  useEffect(() => {
    const getData = async () => {
      const { response } = await utilServices.termCondition();
      if (response) {
        setTermCondition(response.data);
      }
    };
    getData();
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: termCondition.termandcondition || "" }}
    ></div>
  );
};

export default Terms;
