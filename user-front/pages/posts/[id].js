import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import NoUser from "@/components/Nouser";
import { API_URL } from "@/config/index";
import AuthContext from "context/AuthContext";
import PostCard from "@/components/PostCard";
import { useContext, useEffect } from "react";

export default function PostList({ posts, id }) {
   const { user, setUser } = useContext(AuthContext);

   const router = useRouter();

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
   }, []);

   return (
      <Layout>
         <div className="min-height">
            <h1 className="title m2em">
               Posts of
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
            <div className="user_button right">
               <Link href="/posts">
                  <a className="buttonAll">All posts</a>
               </Link>
               <Link href={`/posts/add/${user?.id}`}>
                  <a>add post</a>
               </Link>
            </div>
            <ul>
               {posts?.map((post) => (
                  <PostCard
                     key={post.id}
                     postID={post.id}
                     post={post.attributes}
                  />
               ))}
            </ul>
            {posts.length === 0 && <NoUser content="Post" />}
         </div>
      </Layout>
   );
}

// export async function getStaticPaths(props) {
//    console.log("props: ", props);
//    const response = await axios.get(`${API_URL}/getusers`);
//    const selects = response.data.data;
//    //   console.log("selects: ", selects);
//    const paths = selects.map((select) => ({
//       params: { id: select.id.toString() },
//    }));

//    console.log("paths: ", paths);

//    return {
//       paths,
//       fallback: false,
//    };
// }

// export async function getStaticProps({ params: { id } }) {
//    console.log("id: ", id);
//    const response = await axios.get(`${API_URL}/posts?filters[userId]=${id}`);
//    const posts = response.data.data;
//    const responseUser = await axios.get(`${API_URL}/getusers/${id}`);
//    const user = responseUser.data.data;

//    return {
//       props: {
//          posts: posts,
//          user: user,
//       },
//       revalidate: 1,
//    };
// }

export async function getServerSideProps(context) {
   const { id } = context.query;
   const resposne = await axios.get(`${API_URL}/posts?filters[userId]=${id}`);
   const posts = resposne.data.data;
   return {
      props: { posts, id },
   };
}
