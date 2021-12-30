import Layout from "@/components/Layout";
import Link from "next/link";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import styles from "@/styles/AddPosts.module.css";

export default function AddPost() {
   const [values, setValues] = useState({
      userId: "",
      title: "",
      body: "",
   });

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log("submit");
   };

   const handleOnChange = (e) => {
      const { name, value } = e.target;
      setValues({
         ...values,
         [name]: [value],
      });
   };
   return (
      <Layout>
         <Link href="/posts">
            <a>Go Back</a>
         </Link>
         <div>
            <h1>Post</h1>
            <ToastContainer />
            <form className={styles.form} onSubmit={handleSubmit}>
               <div className={styles.inputWrap}>
                  <label htmlFor="userId">user</label>
                  <input
                     type="text"
                     id="userId"
                     name="userId"
                     value={values.userId}
                     onChange={handleOnChange}
                  />
               </div>
               <div className={styles.inputWrap}>
                  <label htmlFor="title">title</label>
                  <input
                     type="text"
                     id="title"
                     name="title"
                     value={values.title}
                     onChange={handleOnChange}
                  />
               </div>

               <div className={styles.inputWrap}>
                  <label htmlFor="body">Description</label>
                  <textarea
                     typeof="text"
                     name="body"
                     id="body"
                     value={values.body}
                     onChange={handleOnChange}
                  />
               </div>
            </form>
         </div>
      </Layout>
   );
}
