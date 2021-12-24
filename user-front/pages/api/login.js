import cookie from "cookie";
import { API_URL } from "@/config/index";
import axios from "axios";

export default async (req, res) => {
   if (req.method === "POST") {
      const { identifier, password } = JSON.parse(req.body);
      // const strapiRes = await fetch(`${API_URL}/auth/local`, {
      //    method: "POST",
      //    headers: {
      //       "Content-Type": "application/json",
      //    },
      //    body: JSON.stringify({ identifier, password }),
      // });

      const strapiRes = await axios.post(`${API_URL}/auth/local`, {
         body: { identifier, password },
      });

      const strapiData = strapiRes.data;

      if (strapiRes.ok) {
         //Set Cookie
         res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", strapiData.jwt, {
               httpOnly: true,
               secure: process.env.NODE_ENV !== "development",
               maxAge: 60 * 60 * 24 * 7, //week
               sameSite: "strict",
               path: "/",
            })
         );
         res.status(200).json({ user: strapiData.user });
      } else {
         res.status(strapiData.error.status).json({
            message: strapiData.error.message,
         });
      }
   } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
   }
};
