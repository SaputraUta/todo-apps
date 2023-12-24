import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function getUserlogged(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (typeof req.cookies.token === "undefined") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = jwt.verify(req.cookies.token, "saputra") as {
    id: string;
    username: string;
    email: string;
  };
  console.log(user);
  res.status(200).json({ user: user });
}
