import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Search.module.css";

export default function SearchPage() {
   const [term, setTerm] = useState("");
   const router = useRouter();
   const handleSubmit = (e) => {
      e.preventDefault();
      router.push(`/users/search?term=${term}`);
      setTerm("");
   };
   return (
      <div className={styles.search}>
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               value={term}
               onChange={(e) => setTerm(e.target.value)}
               placeholder="Search users.."
            />
         </form>
      </div>
   );
}
