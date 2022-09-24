import { GetServerSidePropsContext } from "next";
import { verifyToken } from "@lib/utils";

export const redirectUser = async (context: GetServerSidePropsContext) => {
  const token = context.req.cookies.token;
  const userId = await verifyToken(token);

  return { userId, token };
};
