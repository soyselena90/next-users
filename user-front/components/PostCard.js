import Modal from "./Modal";
import { useRouter } from "next/router";
import CommonButton from "./CommonButton";
import AuthContext from "context/AuthContext";
import styles from "@/styles/PostCard.module.css";
import { useEffect, useState, useContext } from "react";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import axios from "axios";
import { API_URL } from "../config";

export default function PostCard({ post, postID }) {
   const { user, deleteItem, comments, setComments, getComments } =
      useContext(AuthContext);
   const [showModal, setShowModal] = useState(false);
   const [deleted, setDeleted] = useState(false);
   const [showComments, setShowComments] = useState(false);
   const [postComments, setPostComments] = useState(null);
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
      getComments();
   }, []);

   useEffect(() => {
      const filterComment = comments?.filter((comment) => {
         return comment.attributes.postId == postID;
      });
      setPostComments(filterComment);
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
               <>
                  <ul className={styles.commentWrap}>
                     {postComments ? (
                        postComments.map((comment) => (
                           <CommentCard
                              key={comment.id}
                              comment={comment.attributes}
                              commetID={comment.id}
                              postID={postID}
                           />
                        ))
                     ) : (
                        <p className="center">No comments..🙁</p>
                     )}
                     <AddComment postID={postID} />
                  </ul>
               </>
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
