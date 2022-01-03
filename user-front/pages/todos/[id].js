import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import axios from "axios";
import AuthContext from "context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import styles from "@/styles/Todos.module.css";
import TodosCard from "@/components/TodosCard";
import CommonButton from "@/components/CommonButton";
import { useState } from "react/cjs/react.development";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export default function TodosList({ id }) {
   const { user, setUser, todos, setTodos, getTodos } = useContext(AuthContext);
   const [isDoneTodo, setIsDoneTodo] = useState(false);
   const [values, setValues] = useState({
      userId: id,
      title: "",
      completed: false,
   });
   const router = useRouter();

   //get User
   useEffect(() => {
      axios
         .get(`${API_URL}/getusers/${id}`)
         .then((response) => {
            setUser(response.data.data);
         })
         .catch((err) => {
            console.log("error :", err);
            router.push("/404");
         });

      getTodos(id);
   }, [id]);

   // Add todo
   const addTodo = async (e) => {
      e.preventDefault();
      const hasEmptyFields = Object.values(values).some(
         (element) => element === ""
      );
      if (hasEmptyFields) {
         toast.error("please fill in all fields");
      } else {
         await axios
            .post(`${API_URL}/todos`, {
               data: { ...values },
            })
            .then((res) => getTodos(id))
            .catch((err) => console.log("posting add error :", err));
      }
   };

   // todo input onChange
   const handleChange = (e) => {
      const { name, value } = e.target;
      setValues({
         ...values,
         [name]: value,
      });
   };

   // filter true todos
   const handleTodosTrue = () => {
      axios
         .get(`${API_URL}/todos?filters[userId]=${id}&filters[completed]=true`)
         .then((res) => {
            console.log("response todo true : ", res);
            setTodos(res.data.data);
            setIsDoneTodo(true);
         })
         .catch((err) => console.log("err", err));
   };

   return (
      <Layout title={`${user?.attributes.username}Todos list`}>
         <h1 className="title m2em">
            Todos of
            <span
               style={{
                  color: "#ed2828",
                  marginLeft: "0.3em",
                  textTransform: "uppercase",
               }}
            >
               {user?.attributes.username}
            </span>
         </h1>
         <ToastContainer />
         <form className={styles.addTodos} onSubmit={addTodo}>
            <div className={styles.inputWrap}>
               <input
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
               />
            </div>
            <CommonButton type="submit" classType="btn_todos">
               add
            </CommonButton>
         </form>
         <div className={styles.todoWrap}>
            <div className={styles.todoCheck}>
               <CommonButton
                  type="button"
                  classType="btn_todos"
                  executor={() => {
                     getTodos(id);
                     setIsDoneTodo(false);
                  }}
               >
                  SEE ALL
               </CommonButton>
               <CommonButton
                  type="button"
                  classType="btn_todos"
                  executor={() => handleTodosTrue()}
               >
                  only done
               </CommonButton>
            </div>
            <ul className={styles.todolistWrap}>
               {todos?.map((todo) => (
                  <TodosCard
                     key={todo.id}
                     todoID={todo.id}
                     todo={todo.attributes}
                  />
               ))}
               {todos?.length == 0 && (
                  <li className={styles.noTodoList}>
                     {!isDoneTodo ? (
                        <>
                           <p>No Todo Lists..</p>
                           <p>Add list now👽</p>
                        </>
                     ) : (
                        <>
                           <p>No Todo Done Lists..</p>
                           <p>Let's finish your todos👽</p>
                        </>
                     )}
                  </li>
               )}
            </ul>
         </div>
      </Layout>
   );
}

export async function getServerSideProps(context) {
   const { id } = context.query;
   //    const response = await axios.get(`${API_URL}/todos?filters[userId]=${id}`);
   //    const todos = response.data.data;
   return {
      props: { id },
   };
}
