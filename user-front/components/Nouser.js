import Link from "next/link";

export default function NoUser({ content }) {
   return (
      <div className="nouser">
         <h1>No {content} infomation</h1>
         <Link href="/users">
            <a>Go Home</a>
         </Link>
      </div>
   );
}
