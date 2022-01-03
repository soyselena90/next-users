import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useState } from "react";
import { API_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [comments, setComments] = useState(null);
   const [todos, setTodos] = useState(null);
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

   const deleteItem = async (method, id) => {
      console.log("삭제되었다. ::", id);

      const response = await axios.delete(`${API_URL}/${method}/${id}`);
      const delItem = response.data.data;
      if (response.status !== 200) {
         setError(delItem);
      }
      if (method === "todos") {
      }
   };

   const getTodos = async (id) => {
      await axios
         .get(`${API_URL}/todos?filters[userId]=${id}`)
         .then((res) => {
            setTodos(res.data.data);
            console.log("elfkfl", id);
            console.log("todos", todos);
         })
         .catch((err) => console.log("err", err));
   };

   return (
      <AuthContext.Provider
         value={{
            error,
            user,
            setUser,
            login,
            logout,
            deleteItem,
            comments,
            setComments,
            todos,
            setTodos,
            getTodos,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
export default AuthContext;
