import Link from "next/link";
import styles from "@/styles/Header.module.css";
import { useContext } from "react";
import AuthContext from "context/AuthContext";

export default function Header() {
   const { user } = useContext(AuthContext);

   return (
      <header className={styles.header}>
         <h1>
            <Link href="/">
               <a className={styles.logo}>👩🏻‍💻Nest.js</a>
            </Link>
         </h1>
         {user ? (
            <>
               <nav className={styles.nav}>
                  <ul>
                     <li>
                        {/* <Link href={`/posts/${selected}`}> */}
                        <Link href="/posts">
                           <a className={styles.navList}>Posts</a>
                        </Link>
                     </li>
                     <li>
                        <Link href="/">
                           <a className={styles.navList}>Todos</a>
                        </Link>
                     </li>
                     <li>
                        <Link href="/">
                           <a className={styles.navList}>Albums</a>
                        </Link>
                     </li>
                  </ul>
               </nav>
               <div>
                  <p>Hello, {user.username}</p>
                  <button onClick={() => logout()}>logout</button>
               </div>
            </>
         ) : (
            <div className={styles.headerButton}>
               <Link href="/users/add">
                  <a>register</a>
               </Link>
            </div>
         )}
      </header>
   );
}
