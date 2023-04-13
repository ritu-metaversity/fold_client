import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.interceptors.response.use(
   
   
    function (err) {
      console.log(err, "sdfghjk");
      if (err.response?.status === 401) {
        localStorage.clear();
        window.location.replace("/")
        // message.error(err.message);
      } else if (err?.response?.data?.message) {
        // notifyToast().error(err?.response?.data?.message);
      }
      // message.error(err?.response?.data?.message);
    //   if (err.code === "ERR_NETWORK") {
    //     if (offlineRef) {
    //       offlineRef(true);
    //     }
    //   } else {
    //     offlineRef(false);
    //   }
      return err;
    }
  );
