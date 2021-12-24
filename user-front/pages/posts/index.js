import axios from "axios";
import Modal from "@/components/Modal";
import { API_URL } from "@/config/index";
import { useState } from "react";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";

export default function Posts({ posts }) {
   const [showModal, setShowModal] = useState(false);

   return (
      <Layout
         title="All Posts"
         description="Show All Posts"
         keywords="jsonplaceholder Post list"
      >
         <div className="min-height flex-center">
            <div>
               <h1 className="title m2em">List of Posts</h1>
               <button onClick={() => setShowModal(true)}>
                  {" "}
                  moooooooodddaaaaaaalllll{" "}
               </button>
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
      </Layout>
   );
}

export async function getServerSideProps() {
   const response = await axios.get(`${API_URL}/posts`);
   const posts = response.data.data;
   return {
      props: { posts },
   };
}
