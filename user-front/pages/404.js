import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/Err404.module.css";

export default function NotFoundPage() {
   return (
      <Layout title="Page Not Found">
         <div className="min-height">
            <div className={styles.error}>
               <h1 className="title m2em">Error 404</h1>
               <p>
                  %$#
                  <em> You are in wrong page </em>
                  *^&$
               </p>
               <Link href="/">
                  <a className={styles.wrongButton}>Go back Home</a>
               </Link>
            </div>
         </div>
      </Layout>
   );
}
