import styles from "@/styles/UserCard.module.css";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL, NEXT_URL } from "@/config/index";

import cookie from "cookie";

export default function UserCard({ user, userID }) {
   const router = useRouter();
   const deleUser = async () => {
      if (confirm("Are you sure?")) {
         const response = await axios.delete(`${API_URL}/getusers/${userID}`);
         const deleteItem = response.data.data;
         if (response.status !== 200) {
            toast.error(deleteItem);
         } else {
            router.push("/users");
         }
      }
   };

   // const goUsersDetail = async ({ email: identifier, password }) => {
   //    document.cookie = "name = dnwls";
   //    console.log("cookie: ", document.cookie);

   //    const response = await axios.post(`${NEXT_URL}/api/testlogin`, {
   //       body: { identifier, password },
   //    });
   //    console.log(response);
   //    console.log("cookie: ", document.cookie);
   // };

   return (
      <li className={styles.usercard}>
         <h1>{user.icon}</h1>
         <Link href={`/users/${userID}`}>
            {/* <a onClick={goUsersDetail}> */}
            <a>
               <div className={styles.user_text}>
                  <p className={styles.username}>{user.username}</p>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                  <p>{user.website}</p>
               </div>
            </a>
         </Link>
         <div className="user_button">
            <Link href={`/users/edit/${userID}`}>
               <a>Edit</a>
            </Link>
            <a onClick={deleUser}>delete</a>
         </div>
      </li>
   );
}
