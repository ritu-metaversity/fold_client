import React, { useEffect, useState } from "react";
import { utilServices } from "../../utils/api/util/services";

const Aboutus = () => {
  const [aboutUs, setAboutUs] = useState("");
  useEffect(() => {
    const getData = async () => {
      const { response } = await utilServices.aboutUs();
      if (response) {
        setAboutUs(response.data);
      }
    };
    getData();

    return () => {};
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: aboutUs || "" }}></div>;
};

export default Aboutus;
