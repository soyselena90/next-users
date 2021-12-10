import axios from "axios";
import fetchAPI from "./service";

const httpData = axios.create({
   baseURL: process.env.NEXT_API_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

const fetchData = new fetchAPI(httpData);

export default fetchData;
