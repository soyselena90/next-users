import Layout from "@/components/Layout";
import AuthContext from "context/AuthContext";
import { useContext } from "react";

export default function TodosPage() {
   const { user } = useContext(AuthContext);
   return (
      <Layout title="">
         <h1>{user.attributes.username}</h1>
      </Layout>
   );
}

export async function getServerSideProps() {
   return {
      props: {},
   };
}
