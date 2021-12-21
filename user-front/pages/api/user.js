import axios from "axios";
import { API_URL } from "@/config/index";

export default function handler(req, res) {
   if (req.method === "POST") {
      const { users } = req.body;
      const strapiRes = await fetch(`${API_URL}/getusers`, {
         method: "POST",
         body: JSON.stringify({
            username,
         }),
      });
      const usersData = strapiRes.data.data;
   }
}
