import Link from "next/link";
import styles from "@/styles/Header.module.css";
import { useContext } from "react";
import AuthContext from "context/AuthContext";

export default function Header() {
   const { user, logout } = useContext(AuthContext);

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
                        <Link href={`/posts/${user.id}`}>
                           {/* <Link href="/posts"> */}
                           <a className={styles.navList}>Posts</a>
                        </Link>
                     </li>
                     <li>
                        <Link href={`/todos/${user.id}`}>
                           {/* <Link href={`/todos`}> */}
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
               <div className={styles.userWrap}>
                  <p>{user.attributes.username}</p>
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
