import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/UserCard.module.css";
import Modal from "./Modal";
import { useState } from "react/cjs/react.development";
import CommonButton from "./CommonButton";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { useRouter } from "next/router";

export default function UserCard({ user, userID }) {
   const [showModal, setShowModal] = useState(false);
   const { delUser } = useContext(AuthContext);
   const router = useRouter();

   const deleteUser = () => {
      delUser(userID);
      setShowModal(false);
      router.push("/users");
   };

   return (
      <>
         <li className={styles.usercard}>
            <h1>{user.icon}</h1>
            <Link href={`/users/${userID}`}>
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
               <a onClick={() => setShowModal(true)}>delete</a>
            </div>
         </li>
         <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title="User Delete"
         >
            <p>Are you sure to delete the user {user.username}?</p>
            <CommonButton
               type="button"
               classType="delete"
               executor={deleteUser}
               content="OK"
            />
            <CommonButton
               type="button"
               classType="delete"
               executor={() => setShowModal(false)}
               content="CANCEL"
            />
         </Modal>
      </>
   );
}
