import { NextApiRequest, NextApiResponse } from "next";
import { findVideoIdByUser, insertStat, updateStat } from "@lib/db/hasura";
import { VideoStatGraphQLData } from "types";
import { verifyToken } from "@lib/utils";

export default async function stats(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const inputParams = req.method === "GET" ? req.query : req.body;
    const { videoId } = inputParams;
    const token = req.cookies.token;
    // check for a token
    if (!token)
      return res.status(403).json({ done: false, message: "Forbidden client" });
    if (!videoId)
      return res.status(400).json({ done: false, message: "missing videoId" });
    // verify token

    const userId = await verifyToken(token);
    const findVideo = await findVideoIdByUser(token, userId, videoId);
    const doesStatExist = findVideo?.length > 0;
    if (req.method === "POST") {
      const { favourited, watched = true } = req.body;

      if (doesStatExist) {
        // update video
        const updateVideo: VideoStatGraphQLData = {
          favourited,
          watched,
          userId,
          videoId,
        };
        const updateRes = await updateStat(token, updateVideo);
        return res.status(200).json({ done: true, updateRes });
      } else {
        // add video
        const insertVideo: VideoStatGraphQLData = {
          favourited,
          watched,
          userId: userId,
          videoId,
        };
        const insertRes = await insertStat(token, insertVideo);
        return res.status(200).json({ done: true, insertRes });
      }
    } else if (req.method === "GET") {
      if (doesStatExist) {
        return res.status(200).json({ done: true, findVideo });
      } else {
        return res.status(404).json({ done: true, msg: "video was not found" });
      }
    }
  } catch (error) {
    console.log("Error occured /stats ", error);
    return res.status(500).json({ done: false, error });
  }
}
