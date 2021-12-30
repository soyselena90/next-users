import axios from "axios";
import Modal from "./Modal";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import { useState, useContext, useEffect } from "react";
import AuthContext from "context/AuthContext";
import styles from "@/styles/CommentCard.module.css";
import CommonButton from "./CommonButton";

export default function CommentCard({
   comment,
   comments,
   commetID,
   setComments,
   postID,
}) {
   const { user, deleteItem } = useContext(AuthContext);
   const [showModal, setShowModal] = useState(false);
   const [deleted, setDeleted] = useState(false);
   const [isReadOnly, setIsReadOnly] = useState(true);
   const [values, setValues] = useState({
      body: comment.body,
   });
   const router = useRouter();

   const delComment = () => {
      deleteItem("comments", commetID);
      setDeleted(true);
   };

   useEffect(async () => {
      if (deleted) {
         await axios
            .get(`${API_URL}/comments?filters[postId]=${postID}`) //
            .then((res) => {
               setComments(res.data.data);
            })
            .catch((err) => console.log("Comment delete error :", err));
      }
   }, []);

   const handleEditSubmit = async () => {
      setIsReadOnly(true);
      const hasEmptyFields = Object.values(values).some(
         (element) => element === ""
      );

      if (hasEmptyFields) {
         toast.error("Please fill in  all fields");
      } else {
         await axios
            .put(`${API_URL}/comments/${commetID}`, {
               data: { ...values },
            }) //
            .then((res) => {
               console.log("res-comment-edit :", res.data.data);
            })
            .catch((err) => console.log("Comment delete error :", err));
      }
   };

   const handleEditComment = (e) => {
      const { name, value } = e.target;
      setValues({
         ...values,
         [name]: value,
      });
   };

   return (
      console.log("deleted", deleted),
      (
         <>
            <li className={styles.comment}>
               <ToastContainer />
               <div className={styles.user}>
                  <p>ID : {comment.name} </p>
                  <p>EMAIL : {comment.email}</p>
               </div>
               <div className={styles.body}>
                  {/* <p>{comment.body}</p> */}
                  <input
                     type="text"
                     name="body"
                     value={values.body}
                     readOnly={isReadOnly}
                     onChange={handleEditComment}
                  />
                  {user?.attributes.username === comment.name && (
                     <div className="flex-end">
                        {isReadOnly ? (
                           <CommonButton
                              type="button"
                              classType="btn_comment_control"
                              executor={() => {
                                 setIsReadOnly(false);
                              }}
                           >
                              Edit
                           </CommonButton>
                        ) : (
                           <CommonButton
                              type="submit"
                              classType="btn_comment_control"
                              executor={() => {
                                 handleEditSubmit();
                              }}
                           >
                              OK
                           </CommonButton>
                        )}

                        <CommonButton
                           type="button"
                           classType="btn_comment_control"
                           executor={() => setShowModal(true)}
                        >
                           Delete
                        </CommonButton>
                     </div>
                  )}
               </div>
            </li>
            <Modal
               onClose={() => setShowModal(false)}
               show={showModal}
               title="Delete Comment"
            >
               {!deleted ? (
                  <>
                     <p>Are you really sure the Comment delete?</p>
                     <div className="flex-center">
                        <CommonButton
                           type="button"
                           classType="modal_delete"
                           executor={() => delComment()}
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
                     <p>The Comment has been deleted.</p>
                     <CommonButton
                        type="button"
                        classType="modal_delete"
                        executor={() => {
                           setShowModal(false);
                        }}
                     >
                        ok
                     </CommonButton>
                  </>
               )}
            </Modal>
         </>
      )
   );
}
