import Axios from "axios";

const setAuthToken = token => {
  if (token) {
    Axios.defaults.headers.common["secret-token"] = token;
  } else {
    delete Axios.defaults.headers.common["secret-token"];
  }
};

export default setAuthToken;
