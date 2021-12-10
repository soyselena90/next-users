import axios from "axios";
import { API_URL } from "config";
import Layout from "@/components/Layout";
import UserCard from "@/components/UserCard";
import Slider from "react-slick";
import SearchPage from "@/components/Search";

export default function Users({ users }) {
   const settings = {
      dots: false,
      arrows: true,
      infinite: false,
      autoplay: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      variableWidth: true,
   };

   return (
      <Layout
         title="All Users"
         description="Show All Users"
         keywrods="jsonplaceholder users userlist"
      >
         <div className="min-height flex-center">
            <div>
               <h1 className="title">LIST OF USERS</h1>
               <SearchPage />
               <ul>
                  <Slider {...settings}>
                     {users.map((user) => (
                        <UserCard key={user.id} user={user.attributes} />
                     ))}
                  </Slider>
               </ul>
            </div>
         </div>
      </Layout>
   );
}

// you could use useEffect as well.
// but you have these additional data fetching properties when you initailly come to the page.
export async function getStaticProps() {
   //getStaticProps -> 결과는 같지만 update 등 변화는 buildtime에만 발생
   //it's not on every request, like getSeverSideProps
   const response = await axios.get(`${API_URL}/getusers`);
   const users = response.data.data;

   return {
      props: { users }, // props로 전달
      //revalidate: 1, // if it doesn't find it,  it'll make the request again to find it in. 1s delay
   };
}

// export async function getServerSideProps() {
//    const response = await axios.get(`${API_URL}/getusers`);
//    const users = response.data.data;

//    return {
//       props: { users },
//    };
// }
