import { useState } from "react";
import Layout from "@/components/Layout";
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = (e) => {
      console.log("submit");
   };

   return (
      <Layout title="login page">
         <div className="container">
            <form onSubmit={handleSubmit}>
               <div className="inputWrap">
                  <label htmlFor="username">username</label>
                  <input
                     type="text"
                     value={username}
                     id="username"
                     placeholder="user name"
                     onChange={(e) => setUsername(e.target.value)}
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
