import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import AuthContext from "context/AuthContext";
import { useContext, useEffect } from "react";

export default function Home() {
   const { setUser } = useContext(AuthContext);
   useEffect(() => {
      setUser(null);
   }, []);

   return (
      <Layout title="Hello">
         <div className={styles.homeWrap}>
            <h1 className="title m2em">Welcome, you</h1>
            <ul className={styles.home}>
               <li>
                  <div className={styles.front}>👦🏻👩🏻</div>
                  <Link href="/users">
                     <a className={styles.back}>users</a>
                  </Link>
               </li>
               <li>
                  <div className={styles.front}>✏️</div>
                  <Link href="/posts">
                     <a className={styles.back}>posts</a>
                  </Link>
               </li>
               <li>
                  <div className={styles.front}>📆</div>
                  <Link href="/users">
                     <a className={styles.back}>todos</a>
                  </Link>
               </li>
               <li>
                  <div className={styles.front}>📸</div>
                  <Link href="/users">
                     <a className={styles.back}>albums</a>
                  </Link>
               </li>
            </ul>
         </div>
      </Layout>
   );
}
