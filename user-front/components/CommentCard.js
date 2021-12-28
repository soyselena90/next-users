import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import styles from "@/styles/PostCard.module.css";
import { useState } from "react";
import Modal from "./Modal";
import { useContext } from "react";
import AuthContext from "context/AuthContext";

export default function PostCard({ commet, commetID }) {
   const { user } = useContext(AuthContext);
   const [showModal, setShowModal] = useState(false);
   const router = useRouter();
   const delPost = async () => {
      if (post.userId == user.id) {
         if (confirm("Do you want to delete the post?")) {
            const response = await axios.delete(
               `${API_URL}/comments/${commetID}`
            );
            const cmet = response.data.data;
            if (response.status !== 200) {
               toast.error(cmet);
            } else {
               console.log("삭제 되었다");
               router.push(`/posts`);
            }
         }
      } else {
         setShowModal(true);
      }
   };

   const handleEdit = () => {
      if (post.userId == user.id) {
         router.push(`/comments/${commetID}`);
      } else {
         setShowModal(true);
      }
   };

   return (
      <>
         <li className={styles.post}></li>
         <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title={`You are not ${showModal}`}
         />
      </>
   );
}
