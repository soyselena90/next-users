import { useContext, useState } from "react";
import Layout from "@/components/Layout";
import { toast, ToastContainer } from "react-toastify";
import AuthContext from "context/AuthContext";

export default function LoginPage() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const { login, error } = useContext(AuthContext);

   const handleSubmit = (e) => {
      console.log("submit");
      login({ email, password });
   };

   return (
      <Layout title="login page">
         <div className="container">
            <form onSubmit={handleSubmit}>
               <div className="inputWrap">
                  <label htmlFor="email">email</label>
                  <input
                     type="teemailxt"
                     value={email}
                     id="email"
                     placeholder="email"
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div className="inputWrap">
                  <label htmlFor="password">password</label>
                  <input
                     type="password"
                     value={password}
                     id="password"
                     placeholder="password"
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
            </form>
         </div>
      </Layout>
   );
}
