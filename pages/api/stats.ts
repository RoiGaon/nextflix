import { NextApiRequest, NextApiResponse } from "next";

export default async function stats(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    res.status(200).json({ done: true });
  }
}
