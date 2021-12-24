import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import styles from "@/styles/AddUser.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL } from "@/config/index";
import Link from "next/link";

export default function addUser() {
   const router = useRouter();
   const [values, setValues] = useState({
      name: "",
      username: "",
      email: "",
      address: "",
      phone: "",
      website: "",
      company: "",
      icon: "",
   });

   const handleSubmit = async (e) => {
      e.preventDefault();

      // validation empty fields
      const hasEmptyFields = Object.values(values).some(
         (element) => element === ""
      );

      if (hasEmptyFields) {
         toast.error("Please fill in all fields");
      }

      const response = await axios.post(`${API_URL}/getusers`, {
         data: { ...values },
      });

      if (response.status !== 200) {
         if (response.status === 403 || response.status === 401) {
            toast.error("No token included");
            return;
         }
         toast.error("Something Went Wrong");
      } else {
         router.push(`/users`);
      }
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({
         ...values,
         [name]: value,
      });
   };

   return (
      <Layout title="register account">
         <Link href="/users">
            <a>Go Back</a>
         </Link>
         <div>
            <h1 className="title m2em">Register</h1>
            <ToastContainer />
            <form className={styles.userForm} onSubmit={handleSubmit}>
               <div className={styles.inputWrap}>
                  <label htmlFor="icon">icon</label>
                  <input
                     type="text"
                     name="icon"
                     id="icon"
                     value={values.icon}
                     onChange={handleInputChange}
                  />
               </div>
               <div className={styles.inputWrap}>
                  <label htmlFor="name">name</label>
                  <input
                     type="text"
                     name="name"
                     id="name"
                     value={values.name}
                     onChange={handleInputChange}
                  />
               </div>
               <div className={styles.inputWrap}>
                  <label htmlFor="username">username</label>
                  <input
                     type="text"
                     name="username"
                     id="username"
                     value={values.username}
                     onChange={handleInputChange}
                  />
               </div>
               <div className={styles.inputWrap}>
                  <label htmlFor="email">email</label>
                  <input
                     type="email"
                     name="email"
                     id="email"
                     value={values.email}
                     onChange={handleInputChange}
                  />
               </div>
               <div className={styles.inputWrap}>
                  <label htmlFor="address">address</label>
                  <input
                     type="text"
                     name="address"
                     id="address"
                     value={values.address}
                     onChange={handleInputChange}
                  />
               </div>
               <div className={styles.inputWrap}>
                  <label htmlFor="phone">phone</label>
                  <input
                     type="phone"
                     name="phone"
                     id="phone"
                     value={values.phone}
                     onChange={handleInputChange}
                  />
               </div>
               <div className={styles.inputWrap}>
                  <label htmlFor="website">website</label>
                  <input
                     type="url"
                     name="website"
                     id="website"
                     value={values.website}
                     onChange={handleInputChange}
                  />
               </div>
               <div className={styles.inputWrap}>
                  <label htmlFor="company">company</label>
                  <input
                     type="text"
                     name="company"
                     id="company"
                     value={values.company}
                     onChange={handleInputChange}
                  />
               </div>
               <button className={styles.submitButton} type="submit">
                  OK
               </button>
            </form>
         </div>
      </Layout>
   );
}
