import Layout from "@/components/Layout";
import axios from "axios";
import { API_URL } from "config";
import styles from "@/styles/UserDetail.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import AuthContext from "context/AuthContext";
import { useState } from "react/cjs/react.development";
import Modal from "@/components/Modal";
import CommonButton from "@/components/CommonButton";

export default function SelectUser({ select, select: { attributes } }) {
   // csr
   // html -> seo -> js
   // js 마지막에 seo를 타지 않음
   // let username;
   // useEffect(() => {
   //    fetchData.getData("getusers/1").then((res) => {
   //       console.log("ressss", res.attributes.name);
   //       username = res.attributes.name;
   //       console.log("username: ", username);
   //    });
   // }, []);

   const { login, delUser } = useContext(AuthContext);
   const [showModal, setShowModal] = useState(false);
   const [deleted, setDeleted] = useState(false);

   useEffect(() => {
      login(select);
   }, [select]);

   const category = [
      "id",
      "name",
      "username",
      "email",
      "address",
      "phone",
      "website",
      "company",
   ];
   const router = useRouter();
   // const delUser = async () => {
   //    if (confirm("Are you sure?")) {
   //       const response = await axios.delete(
   //          `${API_URL}/getusers/${select.id}`
   //       );
   //       const deleteItem = response.data.data;
   //       if (response.status !== 200) {
   //          toast.error(deleteItem);
   //       } else {
   //          router.push("/users");
   //       }
   //    }
   // };

   const deleteUser = () => {
      delUser(select.id);
      setDeleted(true);
   };
   const confirmDeleted = () => {
      setShowModal(false);
      router.push("/users");
   };

   return (
      <>
         <Layout title={attributes.username}>
            <div className="min-height">
               <h1 className="title m2em">{attributes.username}</h1>
               <div className={styles.details}>
                  <div>
                     <p className={styles.icon}>{attributes.icon}</p>
                  </div>
                  <div className="flex-center">
                     <div className="category">
                        {category.map((item, index) => (
                           <p key={index}>{item}</p>
                        ))}
                     </div>
                     <div>
                        <p>{select.id}</p>
                        <p>{attributes.name}</p>
                        <p>{attributes.username}</p>
                        <p>{attributes.email}</p>
                        <p>{attributes.address}</p>
                        <p>{attributes.phone}</p>
                        <p>{attributes.website}</p>
                        <p>{attributes.company}</p>
                     </div>
                  </div>
               </div>
               <div className="user_button flex-center">
                  <Link href={`/users/edit/${select.id}`}>
                     <a className="user_button_detail">edit</a>
                  </Link>
                  <CommonButton
                     type="button"
                     classType="btn_delete"
                     executor={() => setShowModal(true)}
                  >
                     delete
                  </CommonButton>
               </div>
            </div>
         </Layout>
         <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title="User Delete"
         >
            {!deleted ? (
               <>
                  <p>Are you sure to delete the user {attributes.username}?</p>
                  <div className="flex-center">
                     <CommonButton
                        type="button"
                        classType="modal_delete"
                        executor={deleteUser}
                     >
                        OK
                     </CommonButton>
                     <CommonButton
                        type="button"
                        classType="modal_delete"
                        executor={() => setShowModal(false)}
                     >
                        CANCEL
                     </CommonButton>
                  </div>
               </>
            ) : (
               <>
                  <p>{attributes.username} has been deleted..😢</p>
                  <CommonButton
                     type="button"
                     classType="modal_delete"
                     executor={() => confirmDeleted()}
                  >
                     OK
                  </CommonButton>
               </>
            )}
         </Modal>
      </>
   );
}

//getStaticPaths
export async function getStaticPaths() {
   // it's going to create all the paths with the id and then will get paths in here
   const response = await axios.get(`${API_URL}/getusers`);
   const selects = response.data.data;
   const paths = selects.map((select) => ({
      params: { id: select.id.toString() },
   }));

   return {
      paths,
      fallback: false, //it'll show a 404 if the resource or slug isn't found or path isn't found
      //if you want it look for the path,
      //even if it doesn't generate that build time and to make a new request, then you would set this to true.
   };
}

// getStaticProps
export async function getStaticProps({ params: { id } }) {
   const response = await axios.get(`${API_URL}/getusers/${id}`);
   const select = response.data.data;

   return {
      props: {
         select: select,
      },
      revalidate: 1,
   };
}

// export async function getServerSideProps({ query: { num } }) {
//    const response = await axios.get(`${API_URL}/getusers/${num}`);
//    const select = response.data.data;
//    return {
//       props: {
//          select,
//       },
//    };
// }
