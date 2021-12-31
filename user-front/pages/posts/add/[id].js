import axios from "axios";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import NoUser from "@/components/Nouser";
import { useContext, useState } from "react";
import AuthContext from "context/AuthContext";
import styles from "@/styles/AddPosts.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import CommonButton from "@/components/CommonButton";
import Modal from "@/components/Modal";

export default function AddPost() {
   const { user } = useContext(AuthContext);
   const [showModal, setShowModal] = useState(false);
   const router = useRouter();
   const [values, setValues] = useState({
      userId: user.id.toString(),
      title: "",
      body: "",
   });

   const handleSubmit = async (e) => {
      e.preventDefault();
      // validation empty fieldes
      const hasEmptyFields = Object.values(values).some(
         (element) => element === ""
      );

      if (hasEmptyFields) {
         toast.error("Please fill in all fields");
      } else {
         await axios
            .post(`${API_URL}/posts`, {
               data: { ...values },
            })
            .then((response) => {
               if (response.status !== 200) {
                  console.log("실패", response);
               } else {
                  console.log("성공", response);
                  setShowModal(true);
               }
            })
            .catch((error) => {
               console.log("error: ", error.response);
            });
      }
   };

   const handleOnChange = (e) => {
      const { name, value } = e.target;
      setValues({
         ...values,
         [name]: value,
      });
   };

   const handleAddPost = () => {
      setShowModal(false);
      router.push(`/posts/${user.id}`);
   };
   return (
      <Layout>
         {user ? (
            <>
               <Link href="/posts">
                  <a className="goback">Go Back</a>
               </Link>
               <ToastContainer />
               <div>
                  <h1 className="title m2em">Add Post</h1>
                  <form className={styles.form} onSubmit={handleSubmit}>
                     <div className="flex-end">
                        <div className={styles.inputWrap}>
                           <label htmlFor="userId">ID : </label>
                           <input
                              type="text"
                              id="userId"
                              name="userId"
                              value={values.userId}
                              className={styles.nonChange}
                              style={{ width: "2em" }}
                              readOnly
                           />
                        </div>
                        <div className={styles.inputWrap}>
                           <label htmlFor="username">user : </label>
                           <input
                              type="text"
                              id="username"
                              value={user?.attributes.username}
                              className={styles.nonChange}
                              readOnly
                           />
                        </div>
                     </div>

                     <div className={(styles.inputWrap, styles.postBox)}>
                        <label htmlFor="title">title</label>
                        <input
                           type="text"
                           id="title"
                           name="title"
                           value={values.title}
                           onChange={handleOnChange}
                        />
                     </div>

                     <div className={(styles.inputWrap, styles.postBox)}>
                        <label htmlFor="body">Description</label>
                        <textarea
                           type="text"
                           name="body"
                           id="body"
                           rows="8"
                           cols="50"
                           value={values.body}
                           onChange={handleOnChange}
                        ></textarea>
                     </div>
                     <div className="user_button flex-center">
                        <CommonButton type="submit" classType="btn_ok">
                           OK
                        </CommonButton>
                     </div>
                  </form>
               </div>
               <Modal
                  onClose={() => setShowModal(false)}
                  show={showModal}
                  title="Post adding"
               >
                  <p>Add a post completed!</p>
                  <CommonButton
                     button="button"
                     classType="btn_ok"
                     executor={() => handleAddPost()}
                  >
                     OK
                  </CommonButton>
               </Modal>
            </>
         ) : (
            <NoUser content="User" />
         )}
      </Layout>
   );
}
