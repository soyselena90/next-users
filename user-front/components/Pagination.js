import Link from "next/link";
import { PER_PAGE } from "@/config/index";
import styles from "@/styles/Pagination.module.css";

export default function Pagination({ page, total }) {
   const totalCount = total.data.length;
   const lastPage = Math.ceil(totalCount / PER_PAGE);
   //    console.log("page", page);
   //    console.log("total", total);
   //    console.log("lastPage", lastPage);
   //    console.log("total", totalCount);

   return (
      <div className={styles.pagination}>
         {page > 1 && (
            <Link href={`/posts?page=${page - 1}`}>
               <a className={styles.pagination_button}>Prev</a>
            </Link>
         )}

         {page < lastPage && (
            <Link href={`/posts?page=${page + 1}`}>
               <a className={styles.pagination_button}>Next</a>
            </Link>
         )}
      </div>
   );
}
