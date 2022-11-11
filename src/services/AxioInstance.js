import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.202:4545/",
  headers: {
    "Content-Type": "application/json",
  },
});

export let fileAxios = axios.create({
  baseURL: "http://192.168.1.202:4545/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

