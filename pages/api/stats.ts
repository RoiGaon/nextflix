import { NextApiRequest, NextApiResponse } from "next";
import { jwt } from "jsonwebtoken";
import { findVideoIdByUser } from "@lib/db/hasura";

export default async function stats(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      const token = req.cookies.token;
      // check for a token
      if (!token) return res.status(403).json({ message: "Forbidden client" });
      const videoId = String(req.query.videoId);
      // verify token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const findVideoId = await findVideoIdByUser(
        token,
        decodedToken.issuer,
        videoId
      );

      res.status(200).json({ done: true, decodedToken, findVideoId });
    } catch (error) {
      console.log("Error occured /stats ", error);
      res.status(500).json({ done: false, error });
    }
  }
}
