import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

async function handlePostMethod(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  console.log(data);
  if (!data.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const response = await prisma.todo.create({
      data: {
        title: data.title,
        deadline: data.deadline,
        authorId: data.userId,
      },
    });

    res.status(200).json({
      todos: response,
      message: "Todo created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Terjadi kesalahan saat menyimpan data",
    });
  }
}

async function handleGetMethod(req: NextApiRequest, res: NextApiResponse) {
  const data = req.query;
  console.log(data);
  if (!data.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const todos = await prisma.todo.findMany({
      where: {
        authorId: data.userId.toString(),
      },
    });
    res.status(200).json({ todos });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data",
    });
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return handleGetMethod(req, res);
  }
  if (req.method === "POST") {
    return handlePostMethod(req, res);
  }
}
