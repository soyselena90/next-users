import { API_URL, NEXT_URL } from "@/config/index";
import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [error, setError] = useState(null);
   const router = useRouter();

   // const login = async ({ email: identifier, password }) => {
   //    const response = await axios.post(`${NEXT_URL}/api/login`, {
   //       body: { identifier, password },
   //    });
   //    const loginData = response.data;
   //    console.log("loginData :", loginData);
   // };

   const login = (info) => {
      setUser(info);
      console.log("user :::", user);
   };

   const logout = () => {
      if (confirm("Do you want to log-out?")) {
         setUser(null);
         router.push("/users");
      }
      return;
   };

   return (
      <AuthContext.Provider value={{ error, user, setUser, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};
export default AuthContext;
