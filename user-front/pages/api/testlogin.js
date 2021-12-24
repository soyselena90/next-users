import axios from "axios";
import { API_URL } from "@/config/index";
import cookie from "cookie";

export default function handler(req, res) {
   console.log("req: ", req.body);
   //    console.log("res: ", res);

   //    if (req.method === "POST") {
   //       const { users } = req.body;
   //       const strapiRes = await fetch(`${API_URL}/getusers`, {
   //          method: "POST",
   //          body: JSON.stringify({
   //             username,
   //          }),
   //       });
   //       const usersData = strapiRes.data.data;
   //    }
   res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", {
         httpOnly: true,
         //  secure: process.env.NODE_ENV !== "development",
         maxAge: 60 * 60 * 24 * 7, //week
         sameSite: "strict",
         path: "/",
      })
   );
}
