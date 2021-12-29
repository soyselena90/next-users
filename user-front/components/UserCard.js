import Link from "next/link";
import Modal from "./Modal";
import { useRouter } from "next/router";
import CommonButton from "./CommonButton";
import { useState, useContext } from "react";
import AuthContext from "context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/UserCard.module.css";

export default function UserCard({ user, userID }) {
   const [showModal, setShowModal] = useState(false);
   const [deleted, setDeleted] = useState(false);
   const { deleteItem } = useContext(AuthContext);
   const router = useRouter();

   const deleteUser = () => {
      deleteItem("getusers", userID);
      setDeleted(true);
   };

   const confirmDeleted = () => {
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
            <div className="user_button flex-center">
               <Link href={`/users/edit/${userID}`}>
                  <a>Edit</a>
               </Link>
               <CommonButton
                  type="button"
                  classType="btn_delete"
                  executor={() => setShowModal(true)}
               >
                  Delete
               </CommonButton>
            </div>
         </li>
         <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title="User Delete"
         >
            {!deleted ? (
               <>
                  <p>Are you sure to delete the user {user.username}?</p>
                  <div className="flex-center">
                     <CommonButton
                        type="button"
                        classType="modal_delete"
                        executor={deleteUser}
                     >
                        OK
                     </CommonButton>
                     <CommonButton
                        type="button"
                        classType="modal_delete"
                        executor={() => setShowModal(false)}
                     >
                        CANCEL
                     </CommonButton>
                  </div>
               </>
            ) : (
               <>
                  <p>{user.username} has been deleted..😢</p>
                  <CommonButton
                     type="button"
                     classType="modal_delete"
                     executor={() => confirmDeleted()}
                  >
                     OK
                  </CommonButton>
               </>
            )}
         </Modal>
      </>
   );
}
