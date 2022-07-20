import type { NextApiRequest, NextApiResponse } from "next";
import { magicAdmin } from "@lib/magic-server";
import jwt from "jsonwebtoken";
import { isNewUser } from "@lib/db/hasura";

type Data = {
  done: boolean;
  isNewUserQuery?: boolean;
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

      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${metadata.issuer}`,
          },
        },
        process.env.JWT_SECRET
      );
      const isNewUserQuery = await isNewUser(token, metadata.issuer!);

      res.status(200).json({ done: true, isNewUserQuery });
    } catch (error) {
      console.log("Something went wrong logging in " + error);
      res.status(400).json({ done: false });
    }
  } else {
    res.status(404).json({ done: false });
  }
}
