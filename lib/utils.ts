import jwt from "jsonwebtoken";

export const verifyToken = async (token?: string) => {
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.issuer;
    return userId;
  }
  return null;
};
