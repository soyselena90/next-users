import axios from "axios";
import { useContext, useState } from "react";
import { API_URL } from "@/config/index";
import AuthContext from "context/AuthContext";
import styles from "@/styles/PostCard.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import CommonButton from "./CommonButton";

export default function AddComment({ postID }) {
   const { user, comments, setComments } = useContext(AuthContext);
   const [values, setValues] = useState({
      postId: postID.toString(),
      body: "",
      name: user?.attributes.username,
      email: user?.attributes.email,
   });

   const handleComments = async (e) => {
      e.preventDefault();
      const hasEmptyFields = Object.values(values).some(
         (element) => element === ""
      );

      if (hasEmptyFields) {
         toast.error("Please fill in  all fields");
      } else {
         await axios
            .post(`${API_URL}/comments`, {
               data: { ...values },
            })
            .then((response) => {
               console.log("성공", response);
               setComments([...comments, response.data.data]);
            })
            .catch((err) => console.log("comments post error :", err.response));
      }
      document.querySelector("form").reset();
   };

   const onChangeComments = (e) => {
      const { name, value } = e.target;
      setValues({
         ...values,
         [name]: value,
      });
   };
   return (
      <li>
         <ToastContainer />
         <div className={styles.commentBox}>
            <form className={styles.commentForm} onSubmit={handleComments}>
               <div className={styles.commentUser}>
                  <div className={styles.commentInputWrap}>
                     <label htmlFor="name">User : </label>
                     <input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        // value={user?.attributes.username}
                        readOnly
                     />
                  </div>
                  <div className={styles.commentInputWrap}>
                     <label htmlFor="email">E-mail : </label>
                     <input
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                        // value={user?.attributes.email}
                        readOnly
                     />
                  </div>
               </div>
               <div className={styles.commentBody}>
                  <div className={styles.commentInputWrap}>
                     <label htmlFor="body">Comments :</label>
                     <textarea
                        type="text"
                        name="body"
                        id="body"
                        cols="15"
                        rows="5"
                        valus={values.body}
                        onChange={onChangeComments}
                     />
                     <CommonButton type="submit" classType="btn_comment">
                        Add comments
                     </CommonButton>
                  </div>
               </div>
            </form>
         </div>
      </li>
   );
}
