import axios from "axios";
import fetchAPI from "./service";

// const httpData = axios.create({
//    baseURL: process.env.NEXT_PUBLIC_API_URL,
//    headers: {
//       "Content-Type": "application/json",
//    },
// });

// const fetchData = new fetchAPI(httpData);

// export default fetchData;

// instance 생성
const httpUser = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   // params: {key : process.env.REACT_APP_~~}
});

const fetchData = new fetchAPI(httpUser); // 객체생성

export default fetchData;
