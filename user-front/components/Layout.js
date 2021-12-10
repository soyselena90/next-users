import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import styles from "@/styles/Layout.module.css";

export default function Layout({ title, description, keywrods, children }) {
   return (
      <div>
         <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywrods" content={keywrods} />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
               rel="preconnect"
               href="https://fonts.gstatic.com"
               crossorigin
            />
            <link
               href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,500;0,600;0,900;1,100;1,200;1,900&display=swap"
               rel="stylesheet"
            />
         </Head>
         <Header />
         <div className={styles.container}>{children}</div>
         <Footer />
      </div>
   );
}
