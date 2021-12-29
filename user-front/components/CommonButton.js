import styles from "@/styles/CommonButton.module.css";

export default function CommonButton({ type, classType, executor, children }) {
   return (
      <button type={type} className={styles[classType]} onClick={executor}>
         {children}
      </button>
   );
}
