import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:9090/social-media/" });
let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

export const getAllUsers = () => API.get("/users", axiosConfig);
