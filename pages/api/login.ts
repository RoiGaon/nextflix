import { magicAdmin } from "@lib/magic-server";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substring(7) : "";
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);
      res.status(200).json({ name: "John Doe" });
    } catch (error) {
      console.log("Something went wrong logging in " + error);
      res.status(400).json({ name: "John Doe" });
    }
  } else {
    res.status(404).json({ name: "John Doe" });
  }
}
