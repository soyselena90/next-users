import styles from "@/styles/PostCard.module.css";
import AuthContext from "context/AuthContext";
import Link from "next/link";
import { useContext } from "react";

export default function PostCard({ post, postID }) {
   const { user } = useContext(AuthContext);
   return (
      <li className={styles.post}>
         <h1>{post.userId}</h1>
         <h1>{user.name}</h1>

         <Link href={`/posts/${post.userId}`}>
            <a>
               <div className={styles.postWrap}>
                  <p>{post.userId}</p>
                  <p>{postID}</p>
                  <p>{post.title}</p>
                  <p>{post.body}</p>
               </div>
               <div className={styles.postButton}>
                  <a>edit</a>
                  <a>delete</a>
               </div>
            </a>
         </Link>
      </li>
   );
}
