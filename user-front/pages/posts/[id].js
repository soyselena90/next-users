import Layout from "@/components/Layout";
import NoUser from "@/components/Nouser";
import PostCard from "@/components/PostCard";
import { API_URL } from "@/config/index";
import axios from "axios";
import Link from "next/link";

export default function PostList({ posts, user }) {
   return (
      //   console.log("post ::", posts),
      //   console.log("userData ::", user),
      <Layout>
         <div className="min-height">
            <h1 className="title m2em">
               Posts of
               <span>{user.attributes.username}</span>
            </h1>
            <div className="user_button right">
               {/* <Link href="/posts/add"> */}
               <Link href={`/posts/add/${user.id}`}>
                  <a>add post</a>
               </Link>
            </div>
            {posts?.map((post) => (
               <PostCard
                  key={post.id}
                  postID={post.id}
                  post={post.attributes}
               />
            ))}
            {posts.length == 0 && <NoUser content="Post" />}
         </div>
      </Layout>
   );
}

export async function getStaticPaths(props) {
   console.log("props: ", props);
   const response = await axios.get(`${API_URL}/getusers`);
   const selects = response.data.data;
   //   console.log("selects: ", selects);
   const paths = selects.map((select) => ({
      params: { id: select.id.toString() },
   }));

   console.log("paths: ", paths);

   return {
      paths,
      fallback: false,
   };
}

export async function getStaticProps({ params: { id } }) {
   console.log("id: ", id);
   const response = await axios.get(`${API_URL}/posts?filters[userId]=${id}`);
   const posts = response.data.data;
   const responseUser = await axios.get(`${API_URL}/getusers/${id}`);
   const user = responseUser.data.data;

   return {
      props: {
         posts: posts,
         user: user,
      },
      revalidate: 1,
   };
}
