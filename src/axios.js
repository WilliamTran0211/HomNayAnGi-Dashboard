// axios
import axios from "axios";

const baseURL = "http://localhost:8000";

export default axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": [
      "GET",
      "PUT",
      "POST",
      "DELETE",
      "HEAD",
      "OPTIONS"
    ],
    // "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": ["Access-Control-Allow-Origin"]
  }
});
