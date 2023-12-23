import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import argon from "argon2";
import jwt from "jsonwebtoken";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  console.log(data);
  const userData = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!userData) return res.status(400).json({ message: "User not found" });

  const jwtToken = jwt.sign(
    {
      id: userData.id,
      email: userData.email,
      username: userData.username,
    },
    "saputra"
  );

  const isPasswordValid = await argon.verify(userData.password, data.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Wrong password" });
  }

  res.setHeader(
    "Set-Cookie",
    `token=${jwtToken}; HttpOnly; path=/; SameSite=Lax; Secure`
  );
  res.status(200).json({
    message: "Logged in",
  });
}
