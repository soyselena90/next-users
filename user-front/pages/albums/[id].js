import AlbumCard from "@/components/AlbumCard";
import Layout from "@/components/Layout";
import axios from "axios";
import AuthContext from "context/AuthContext";
import { useContext, useEffect, useState } from "react";

export default function AlbumList() {
   const { user } = useContext(AuthContext);
   const [albums, setAlbums] = useState(null);
   useEffect(() => {
      axios
         .get("https://jsonplaceholder.typicode.com/albums?userId=1")
         .then((res) => setAlbums(res.data))
         .catch((err) => console.log("Album error :", err));
   }, []);
   return (
      console.log("ablumData", albums),
      (
         <Layout title={`${user?.attributes.username} Album`}>
            <div className="min-height">
               <h1 className="title m2em">
                  Album of
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

               <ul className="grid">
                  {albums?.map((album) => (
                     <AlbumCard key={album.id} album={album} />
                  ))}
               </ul>
               {albums?.length === 0 && <NoUser content="Post" />}
            </div>
         </Layout>
      )
   );
}

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
