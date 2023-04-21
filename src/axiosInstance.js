import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.interceptors.response.use(
   
   
    function (err) {
      
      if (err.response?.status === 401) {
        localStorage.clear();
        window.location.replace("/")
      } else if (err?.response?.data?.message) {
       
      }
      return err;
    }
  );
