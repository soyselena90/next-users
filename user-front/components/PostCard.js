import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import styles from "@/styles/PostCard.module.css";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useContext } from "react";
import AuthContext from "context/AuthContext";

export default function PostCard({ post, postID, comments }) {
   const { user } = useContext(AuthContext);
   const [postUser, setPostUser] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [showComments, setShowComments] = useState(false);
   const router = useRouter();
   const delPost = async () => {
      if (post.userId == user.id) {
         if (confirm("Do you want to delete the post?")) {
            const response = await axios.delete(`${API_URL}/posts/${postID}`);
            const post = response.data.data;
            if (response.status !== 200) {
               toast.error(post);
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
         router.push(`/posts/edit/${postID}`);
      } else {
         setShowModal(true);
      }
   };

   useEffect(() => {
      axios
         .get(`${API_URL}/getusers/${post.userId}`) //
         .then((res) => {
            setPostUser(res.data.data);
         })
         .catch((err) => console.log("error : ", err));
   }, []);

   return (
      // console.log("comment", comments),
      <>
         <li className={styles.post}>
            <div className={styles.postWrap}>
               <p>
                  {postUser?.attributes.username}
                  <span> ({post.userId}) </span>
               </p>
               <p>{postID}</p>
               <p>{post.title}</p>
               <p>{post.body}</p>
            </div>
            <div className={styles.postButton}>
               <button onClick={() => setShowComments(!showComments)}>
                  comments
               </button>
               <button onClick={handleEdit}>edit</button>
               <button onClick={delPost}>delete</button>
            </div>
            {showComments && (
               <ul>
                  <li>comment</li>
               </ul>
            )}
         </li>
         <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title={`You are not ${postUser?.attributes.username}`}
         />
      </>
   );
}

export async function getServerSideProps(context) {
   const { id } = context.query;
   const response = await axios.get(
      `${API_URL}/comments?filters[postId]=${id}`
   );
   const comments = response.data.data;
   return {
      props: {
         comments,
      },
   };
}
