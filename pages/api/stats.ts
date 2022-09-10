import { NextApiRequest, NextApiResponse } from "next";
import { jwt } from "jsonwebtoken";

export default async function stats(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    try {
      const token = req.cookies.token;
      // check for a token
      if (!token) return res.status(403).json({ message: "Forbidden client" });
      // verify token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ done: true, decodedToken });
    } catch (error) {
      console.log("Error occured /stats ", error);
      res.status(500).json({ done: false, error });
    }
  }
}
