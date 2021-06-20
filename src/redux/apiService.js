import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL:
    "https://us-central1-ohyay-prod-d7acf.cloudfunctions.net/ohyayapi/list-workspaces",
  headers: {
    "Content-Type": "application/json",
  },
});

//Console.log all requests and responses

api.interceptors.request.use(
  (request) => {
    console.log("Starting request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    if (response.data.data && response.data.data.accessToken) {
      api.defaults.headers.common["authorization"] =
        "Bearer " + response.data.data.accessToken;
    }
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    let errorMsg = error.message || "";
    if (error.errors & error.errors.message) {
      errorMsg = errorMsg + ": " + error.errors.message;
      toast.error(errorMsg);
      return Promise.reject(error);
    }
  }
);

export default api;
