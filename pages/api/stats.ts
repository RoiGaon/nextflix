import { NextApiRequest, NextApiResponse } from "next";
import { jwt } from "jsonwebtoken";
import { findVideoIdByUser, insertStat, updateStat } from "@lib/db/hasura";
import { VideoStatGraphQLData } from "types";

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
      const doesStatExist = await findVideoIdByUser(
        token,
        decodedToken.issuer,
        videoId
      );
      if (doesStatExist) {
        // update video
        const updateVideo: VideoStatGraphQLData = {
          favourited: 0,
          watched: true,
          userId: decodedToken.issuer,
          videoId,
        };
        const updateRes = await updateStat(token, updateVideo);
        res.status(200).json({ done: true, updateRes });
      } else {
        // add video
        const insertVideo: VideoStatGraphQLData = {
          favourited: 0,
          watched: true,
          userId: decodedToken.issuer,
          videoId,
        };
        const insertRes = await insertStat(token, insertVideo);
        res.status(200).json({ done: true, insertRes });
      }
    } catch (error) {
      console.log("Error occured /stats ", error);
      res.status(500).json({ done: false, error });
    }
  }
}
