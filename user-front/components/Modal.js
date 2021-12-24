import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import styles from "@/styles/Modal.module.css";

export default function Modal({ title, show, onClose, children }) {
   const [isBrowser, setIsBrowser] = useState(false);

   const modalWrapperRef = useRef();
   // check if the user has clickedinside or outside the modal
   const backDropHandler = (e) => {
      if (!modalWrapperRef?.current?.contains(e.target)) {
         onClose();
      }
   };

   useEffect(() => {
      setIsBrowser(true);
   }, []);

   const handleClose = (e) => {
      e.preventDefault();
      onClose();
   };

   const modalContent = show && (
      <div className={styles.overlay} onClick={backDropHandler}>
         <div className={styles.modalWrapper} ref={modalWrapperRef}>
            <div className={styles.modal}>
               <div className={styles.header}>
                  <a href="#" onClick={handleClose}>
                     X
                  </a>
               </div>
               {title && <div>{title}</div>}
               <div className={styles.body}>{children}</div>
            </div>
         </div>
      </div>
   );

   if (isBrowser) {
      return ReactDOM.createPortal(
         modalContent,
         document.getElementById("modal-root")
      );
   }
   return null;
}
