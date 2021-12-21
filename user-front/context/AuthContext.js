import { NEXT_URL } from "@/config/index";
import { useRouter } from "next/router";
import { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [error, setError] = useState(null);
   const router = useRouter();

   useEffect(() => {
      checkUserLoggedIn();
   }, []);

   //Register user
   const register = async (info) => {
      const userData = {
         user: {
            ...info,
         },
      };
      const response = await fetch(`${NEXT_URL}/api/register`, {
         method: "POST",
         headers: {
            "Context-Type": "application/json",
         },
         body: JSON.stringify({ ...userData.user }),
      });
      const data = await response.json();

      if (response.ok) {
         console.log("data : ", data);
         setUser(data.user);
         //  router.push("/account/dashboard");
         router.push("/");
      } else {
         setError(data.message);
         setError(null);
      }
      console.log("userdattt", userData);
   };

   //Login user
   const login = async ({ email: identifier, password }) => {
      const response = await fetch(`${NEXT_URL}/api/login`, {
         method: "POST",
         headers: {
            "Context-Type": "application/json",
         },
         body: JSON.stringify({ identifier, password }),
      });
      const data = await response.json();

      if (response.ok) {
         console.log("data", data);
         console.log("data user", data.user);

         setUser(data.user);
         router.push("/");
         //  router.push("/account/dashboard");
      } else {
         setError(data.message);
         setError(null);
      }
   };

   //Logout user
   const logout = async () => {
      const res = await fetch(`${NEXT_URL}/api/logout`, {
         method: "POST",
      });

      if (res.ok) {
         setUser(null);
         router.push("/");
      }
   };

   //Check if user is loogged in
   const checkUserLoggedIn = async (info) => {
      const res = await fetch(`${NEXT_URL}/api/user`);
      const userData1 = await res.json();
      console.log("userData1 : ", userData1);
      // const userData = userData1.user;

      // if (res.ok) {
      //    setUser(userData);
      // } else {
      //    setUser(null);
      // }
   };

   return (
      <AuthContext.Provider value={{ user, error, register, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthContext;
