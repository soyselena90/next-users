import styles from "@/styles/AlbumCard.module.css";

export default function AlbumCard({ album }) {
   return (
      <li className={styles.ablumWrap}>
         <p>{album.title}</p>
      </li>
   );
}
