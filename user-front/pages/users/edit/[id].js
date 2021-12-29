import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/EditPage.module.css";
import { toast, ToastContainer } from "react-toastify";
import CommonButton from "@/components/CommonButton";
import Modal from "@/components/Modal";

export default function EditPage({ editData, editData: { attributes } }) {
   const [showModal, setShowModal] = useState(false);
   const [values, setValues] = useState({
      id: editData.id,
      name: attributes.name,
      username: attributes.username,
      email: attributes.email,
      address: attributes.address,
      phone: attributes.phone,
      website: attributes.website,
      company: attributes.company,
      icon: attributes.icon,
   });
   const router = useRouter();

   const handleSubmit = async (e) => {
      e.preventDefault();

      //Validation
      const hasEmptyFields = Object.values(values).some(
         (element) => element === ""
      );
      if (hasEmptyFields) {
         toast.error("fill the form!!!");
      }

      const response = await axios.put(`${API_URL}/getusers/${editData.id}`, {
         data: { ...values },
      });
      console.log("response", response);
      if (response.status === 403 || response.status === 401) {
         toast.error("No token included");
         return;
      }
   };
   const handleOnChange = (e) => {
      const { name, value } = e.target;
      setValues({
         ...values,
         [name]: value,
      });
   };
   return (
      <>
         <Layout title="Edit page">
            <Link href="/users">
               <a className="goback">Go Back</a>
            </Link>
            <h1 className="title">Edit</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
               <div className={styles.grid}>
                  <div className={styles.inputWrap}>
                     <label htmlFor="id">id</label>
                     <input
                        type="number"
                        id="id"
                        name="id"
                        value={values.id}
                        readOnly
                     />
                  </div>
                  <div className={styles.inputWrap}>
                     <label htmlFor="icon">icon</label>
                     <input
                        type="text"
                        id="icon"
                        name="icon"
                        value={values.icon}
                        onChange={handleOnChange}
                     />
                  </div>

                  <div className={styles.inputWrap}>
                     <label htmlFor="username">username</label>
                     <input
                        type="text"
                        id="username"
                        name="username"
                        value={values.username}
                        readOnly
                     />
                  </div>
                  <div className={styles.inputWrap}>
                     <label htmlFor="name">name</label>
                     <input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        readOnly
                     />
                  </div>
                  <div className={styles.inputWrap}>
                     <label htmlFor="email">email</label>
                     <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleOnChange}
                     />
                  </div>
                  <div className={styles.inputWrap}>
                     <label htmlFor="address">address</label>
                     <input
                        type="text"
                        id="address"
                        name="address"
                        value={values.address}
                        onChange={handleOnChange}
                     />
                  </div>
                  <div className={styles.inputWrap}>
                     <label htmlFor="phone">phone</label>
                     <input
                        type="phone"
                        id="phone"
                        name="phone"
                        value={values.phone}
                        onChange={handleOnChange}
                     />
                  </div>
                  <div className={styles.inputWrap}>
                     <label htmlFor="website">website</label>
                     <input
                        type="url"
                        id="website"
                        name="website"
                        value={values.website}
                        onChange={handleOnChange}
                     />
                  </div>
                  <div className={styles.inputWrap}>
                     <label htmlFor="company">company</label>
                     <input
                        type="text"
                        id="company"
                        name="company"
                        value={values.company}
                        onChange={handleOnChange}
                     />
                  </div>
               </div>
               <div className="flex-center m2em">
                  <CommonButton
                     type="submit"
                     classType="btn_ok"
                     executor={() => setShowModal(true)}
                  >
                     OK
                  </CommonButton>
               </div>
            </form>
         </Layout>
         <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title="User Edit"
         >
            <p>The information was updated successfully!</p>
            <CommonButton
               type="button"
               classType="btn_ok"
               executor={() => router.push("/users")}
            >
               OK
            </CommonButton>
         </Modal>
      </>
   );
}

export async function getServerSideProps({ params: { id }, req }) {
   const response = await axios.get(`${API_URL}/getusers/${id}`);
   const editData = response.data.data;
   console.log("req", req);
   return {
      props: {
         editData,
      },
   };
}
