import qs from "qs";
import axios from "axios";
import Link from "next/link";
import Modal from "@/components/Modal";
import NoUser from "@/components/Nouser";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import AuthContext from "context/AuthContext";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";
import { useContext, useState, useEffect } from "react";

export default function Posts({ posts, page, total }) {
   const [showModal, setShowModal] = useState(false);
   const { user } = useContext(AuthContext);

   return (
      <Layout
         title="All Posts"
         description="Show All Posts"
         keywords="jsonplaceholder Post list"
      >
         {user ? (
            <>
               <div className="min-height flex-center">
                  <div>
                     <h1 className="title m2em">List of Posts</h1>
                     <p className="center">username</p>
                     <h3
                        className="center subTitle"
                        style={{
                           color: "rgb(23 144 101)",
                           marginLeft: "0.3em",
                           textTransform: "uppercase",
                        }}
                     >
                        {user?.attributes.username}
                     </h3>
                     <div className="user_button right">
                        <Link href={`/posts/${user.id}`}>
                           <a>See My Posts</a>
                        </Link>
                     </div>

                     <Modal
                        onClose={() => setShowModal(false)}
                        show={showModal}
                        title="Posts"
                     >
                        Post lists. are you?
                     </Modal>
                     <ul>
                        {posts?.map((post) => (
                           <PostCard
                              key={post.id}
                              postID={post.id}
                              post={post.attributes}
                           />
                        ))}
                     </ul>
                  </div>
               </div>
               <Pagination page={page} total={total} />
            </>
         ) : (
            <NoUser content="User" />
         )}
      </Layout>
   );
}

export async function getServerSideProps({ query: { page = 1 } }) {
   const query = qs.stringify(
      {
         sort: ["id:desc"],
      },
      {
         encodeValuesOnly: true,
      }
   );

   const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
   //Fetch total / count
   const totalResult = await axios.get(`${API_URL}/posts?pagination[total]`);
   const total = totalResult.data;
   //Calculate start page
   const response = await axios.get(
      `${API_URL}/posts?pagination[start]=${start}&pagination[limit]=${PER_PAGE}&${query}`
   );
   const posts = response.data.data;

   return {
      props: { posts: posts, page: +page, total },
   };
}
