import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function login(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    try {
      res.status(200).json({ name: "John Doe" });
    } catch (error) {
      console.log("Something went wrong logging in " + error);
      res.status(400).json({ name: "John Doe" });
    }
  } else {
    res.status(404).json({ name: "John Doe" });
  }
}
