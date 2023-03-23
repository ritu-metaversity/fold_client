import { useEffect, useState } from "react";
import { utilServices } from "../../utils/api/util/services";

const ResponsibleGaming = () => {
  const [ResponsibleGaming, setResponsibleGaming] = useState({
    responsiblegaming: "",
  });
  useEffect(() => {
    const getData = async () => {
      const { response } = await utilServices.responsibleGaming();
      if (response) {
        setResponsibleGaming(response.data);
      }
    };
    getData();

    return () => {};
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: ResponsibleGaming.responsiblegaming || "",
      }}
    ></div>
  );
};

export default ResponsibleGaming;
