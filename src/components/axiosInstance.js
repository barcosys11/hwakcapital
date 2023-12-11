import axios from "axios";

const instance = axios.create({
  // baseURL: "https://162-214-97-233.nip.io:3003",
  baseURL: "https://api.hwakcapital.com/",
});

export default instance;