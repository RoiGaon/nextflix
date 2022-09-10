import { NextApiResponse } from "next";
import cookie from "cookie";

const MAX_AGE = 60 * 60 * 24 * 7;

export const setTokenCookie = (token: string, res: NextApiResponse<any>) => {
  const setCookie = cookie.serialize("token", token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  res.setHeader("Set-Cookie", setCookie);
};
