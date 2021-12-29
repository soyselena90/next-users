import axios from "axios";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import CommonButton from "./CommonButton";
import AuthContext from "context/AuthContext";
import styles from "@/styles/PostCard.module.css";
import { useEffect, useState, useContext } from "react";
import CommentCard from "./CommentCard";

export default function PostCard({ post, postID }) {
   const { user, setUser, deleteItem } = useContext(AuthContext);
   const [showModal, setShowModal] = useState(false);
   const [deleted, setDeleted] = useState(false);
   const [showComments, setShowComments] = useState(false);
   const [comments, setComments] = useState(false);
   const postIdUser = post.userId == user?.id;
   const router = useRouter();

   const delPost = () => {
      deleteItem("posts", postID);
      setDeleted(true);
   };
   const confirmDeleted = () => {
      setShowModal(false);
      router.push("/posts");
   };

   const handleEdit = () => {
      if (postIdUser) {
         router.push(`/posts/edit/${postID}`);
      } else {
         setShowModal(true);
      }
   };

   useEffect(() => {
      if (user) {
         axios
            .get(`${API_URL}/getusers/${post.userId}`) //
            .then((res) => {
               setUser(res.data.data);
            })
            .catch((err) => console.log("user error : ", err));
      }

      axios
         .get(`${API_URL}/comments?fliters[postId]=${user?.id}`)
         .then((res) => setComments(res.data.data))
         .catch((err) => console.log("comment error :", err));
   }, []);

   return (
      <>
         <li className={styles.post}>
            <div className={styles.postWrap}>
               <p>
                  {user?.attributes.username}
                  <span> ({post.userId}) </span>
               </p>
               <p>{postID}</p>
               <p>{post.title}</p>
               <p>{post.body}</p>
            </div>
            <div className={styles.postButton}>
               <CommonButton
                  type="button"
                  classType="btn_post"
                  executor={() => setShowComments(!showComments)}
               >
                  COMMENTS
               </CommonButton>
               <CommonButton
                  type="button"
                  classType="btn_post"
                  executor={() => handleEdit()}
               >
                  edit
               </CommonButton>
               <CommonButton
                  type="button"
                  classType="btn_post"
                  executor={() => setShowModal(true)}
               >
                  delete
               </CommonButton>
            </div>
            {showComments && (
               <ul>
                  {comments.map((comment) => (
                     <CommentCard
                        comment={comment.attributes}
                        commetID={comment.id}
                     />
                  ))}
               </ul>
            )}
         </li>
         <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title={
               postIdUser ? "Delete The Post😫" : "Can not delete the post😡"
            }
         >
            {!postIdUser ? (
               <>
                  <p>The post is not yours.</p>
                  <CommonButton
                     type="button"
                     classType="modal_delete"
                     executor={() => setShowModal(false)}
                  >
                     ok
                  </CommonButton>
               </>
            ) : !deleted ? (
               <>
                  <p>Are you really sure the post delete?</p>
                  <div className="flex-center">
                     <CommonButton
                        type="button"
                        classType="modal_delete"
                        executor={() => delPost()}
                     >
                        OK
                     </CommonButton>
                     <CommonButton
                        type="button"
                        classType="modal_delete"
                        executor={() => setShowModal(false)}
                     >
                        cancel
                     </CommonButton>
                  </div>
               </>
            ) : (
               <>
                  <p>The post has been deleted.</p>
                  <CommonButton
                     type="button"
                     classType="modal_delete"
                     executor={() => confirmDeleted()}
                  >
                     ok
                  </CommonButton>
               </>
            )}
         </Modal>
      </>
   );
}
