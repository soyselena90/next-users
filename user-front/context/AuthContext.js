import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useState } from "react";
import { API_URL } from "@/config/index";

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
   };

   const logout = () => {
      if (confirm("Do you want to log-out?")) {
         setUser(null);
         router.push("/users");
      }
      return;
   };

   const delUser = async (id) => {
      console.log("삭제되었다. ::", id);
      const response = await axios.delete(`${API_URL}/getusers/${id}`);
      const deleteItem = response.data.data;
      if (response.status !== 200) {
         toast.error(deleteItem);
      }
   };

   return (
      <AuthContext.Provider
         value={{ error, user, setUser, login, logout, delUser }}
      >
         {children}
      </AuthContext.Provider>
   );
};
export default AuthContext;
