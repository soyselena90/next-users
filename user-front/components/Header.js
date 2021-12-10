import Link from "next/link";
import styles from "@/styles/Header.module.css";

export default function Header() {
   return (
      <header className={styles.header}>
         <h1>
            <Link href="/">
               <a className={styles.logo}>👩🏻‍💻Nest.js</a>
            </Link>
         </h1>
         <nav className={styles.nav}>
            <ul>
               <li>
                  <Link href="/">
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
         <div className={styles.headerButton}>
            <Link href="/users/add">
               <a>register</a>
            </Link>
         </div>
      </header>
   );
}
