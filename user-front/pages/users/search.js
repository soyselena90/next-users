import qs from "qs";
import axios from "axios";
import Link from "next/link";
import { API_URL } from "config";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import UserCard from "@/components/UserCard";
import styles from "@/styles/Search.module.css";

export default function Search({ searchResult }) {
   const router = useRouter();
   return (
      <Layout title="Search Results">
         <Link href="/users">
            <a className={styles.goback}>go back</a>
         </Link>
         <h1 className="title m2em">
            Search Results for{" "}
            <span style={{ color: "#e15b5b" }}>{router.query.term}..</span>
         </h1>
         {searchResult.length === 0 && (
            <div className={styles.noResult}>
               {"<>"}　no users..😢 {"</>"}
            </div>
         )}
         <ul className={styles.searchUserList}>
            {searchResult.map((search) => (
               <UserCard key={search.id} user={search.attributes} />
            ))}
         </ul>
      </Layout>
   );
}

export async function getServerSideProps({ query: { term } }) {
   const query = qs.stringify({
      filters: {
         $or: [
            {
               username: {
                  $contains: term,
               },
            },
            {
               name: {
                  $contains: term,
               },
            },
            {
               email: {
                  $contains: term,
               },
            },
            {
               phone: {
                  $contains: term,
               },
            },
            {
               website: {
                  $contains: term,
               },
            },
         ],
      },
   });
   // const response = await axios.get(
   //    `${API_URL}/getusers?filters[username][$contains]=${term}`
   // );
   const response = await axios.get(`${API_URL}/getusers?${query}`);
   const searchResult = response.data.data;
   return {
      props: { searchResult },
   };
}
