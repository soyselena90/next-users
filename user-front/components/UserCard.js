import styles from "@/styles/UserCard.module.css";
import Link from "next/link";

export default function UserCard({ user, userID }) {
   return (
      <li className={styles.usercard}>
         <h1>{user.icon}</h1>
         <Link href={`/users/${userID}`}>
            <a>
               <div className={styles.user_text}>
                  <p className={styles.username}>{user.username}</p>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                  <p>{user.website}</p>
               </div>
            </a>
         </Link>
         <div className="user_button">
            <Link href={`/users/edit/${userID}`}>
               <a>Edit</a>
            </Link>
            <Link href={`/users/edit/${userID}`}>
               <a>delete</a>
            </Link>
         </div>
      </li>
   );
}
