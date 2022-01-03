import axios from "axios";
import Modal from "./Modal";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";
import CommonButton from "./CommonButton";
import { useContext, useState } from "react";
import AuthContext from "context/AuthContext";
import styles from "@/styles/TodoCard.module.css";
import { useEffect } from "react/cjs/react.development";

export default function TodosCard({ todo, todoID }) {
   const { deleteItem, getTodos } = useContext(AuthContext);
   const [isDone, setIsDone] = useState(false);
   const [isDelete, setIsDelete] = useState(false);
   const [showModal, setShowModal] = useState(false);

   useEffect(() => {
      getTodos(todo.userId);
   }, []);

   //Edit completed todo
   const handleTodosToTrue = async () => {
      setShowModal(false);
      setIsDone(false);
      await axios
         .put(`${API_URL}/todos/${todoID}`, {
            data: { completed: true },
         })
         .then((response) => {
            getTodos(todo.userId);
            // router.push(`/todos/${todo.userId}`);
            console.log("response true", response);
         })
         .catch((err) => console.log("Edit Todos error : ", err));
   };

   //Delete todos
   const deleteTodos = () => {
      setShowModal(false);
      setIsDone(false);
      deleteItem("todos", todoID);
      getTodos(todo.userId);
   };

   return (
      <>
         <li className={styles.todoCard}>
            <p>{todo.title}</p>
            {todo.completed ? (
               <p>Done!✌️</p>
            ) : (
               <p
                  className={styles.todoAlmost}
                  onClick={() => setIsDone(!isDone)}
               >
                  Almost!🏃
               </p>
            )}
            <CommonButton
               type="button"
               classType="todo_check"
               executor={() => {
                  setShowModal(true);
                  setIsDelete(true);
               }}
            >
               X
            </CommonButton>
         </li>
         {isDone && (
            <li className={styles.isDone}>
               <p>🙆‍♂️Are you done?🙆</p>

               <CommonButton
                  type="button"
                  classType="todo_isdone"
                  executor={() => setShowModal(true)}
               >
                  ok
               </CommonButton>
            </li>
         )}
         <Modal
            onClose={() => setShowModal(false)}
            show={showModal}
            title={isDelete ? "Are you sure to delete?" : "You did great!🙏"}
         >
            {isDelete ? (
               <CommonButton
                  type="button"
                  classType="btn_ok"
                  executor={() => deleteTodos()}
               >
                  OK
               </CommonButton>
            ) : (
               <CommonButton
                  type="button"
                  classType="btn_ok"
                  executor={() => handleTodosToTrue()}
               >
                  OK
               </CommonButton>
            )}
         </Modal>
      </>
   );
}
