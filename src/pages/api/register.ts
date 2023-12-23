import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import argon2 from "argon2";

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  console.log(data);

  try {
    const isUserExist = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (isUserExist) {
      return res.status(400).json({
        message: "Email already in use. Please use a different email.",
      });
    }

    const hashPassword = await argon2.hash(data.password);
    const response = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashPassword,
      },
    });
    res.status(200).json({
      username: response.username,
      email: response.email,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Terjadi kesalahan saat menyimpan data",
    });
  }
}
