import axios from "axios";
import { API_BASE_URL } from "@/app/utils/constants";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers:{
    "Content-Type": "application/json",
  }
});
client.interceptors.request.use((request) => {
    return request;
  });
  client.interceptors.response.use((response) => {
    return response;
  });

  export default client;

  


