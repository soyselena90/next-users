import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import NoUser from "@/components/Nouser";
import AuthContext from "context/AuthContext";
import { useContext, useState } from "react";
import styles from "@/styles/AddPosts.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function PostEditPage({ post, post: { attributes } }) {
   const { user } = useContext(AuthContext);
   const router = useRouter();
   const [values, setValues] = useState({
      userId: attributes.userId,
      title: attributes.title,
      body: attributes.body,
   });

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("submitt");

      //Validation
      const hasEmptyFields = Object.values(values).some(
         (element) => element === ""
      );
      if (hasEmptyFields) {
         toast.error("fill the form!!!");
      }

      await axios
         .put(`${API_URL}/posts/${post.id}`, {
            data: { ...values },
         })
         .then((response) => {
            if (response.status !== 200) {
               console.log("실패", response);
            } else {
               console.log("성공", response);
               router.push(`/posts/${user.id}`);
            }
         })
         .catch((err) => console.log("error :", err));
   };
   const handleOnChange = (e) => {
      const { name, value } = e.target;
      setValues({
         ...values,
         [name]: value,
      });
   };

   return (
      <Layout title="Post Edit page">
         {user ? (
            <>
               <Link href="/posts">
                  <a className="goback">Go Back</a>
               </Link>
               <ToastContainer />
               <div>
                  <h1 className="title m2em">Edit Post</h1>
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
                     <div className="user_button center">
                        <button type="submit">Edit POST</button>
                     </div>
                  </form>
               </div>
            </>
         ) : (
            <NoUser content="User" />
         )}
      </Layout>
   );
}

export async function getServerSideProps(context) {
   const { id } = context.query;
   const response = await axios.get(`${API_URL}/posts/${id}`);
   const post = response.data.data;

   return {
      props: { post },
   };
}
