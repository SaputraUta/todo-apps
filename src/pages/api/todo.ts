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

async function handleDeleteMethod(req: NextApiRequest, res: NextApiResponse) {
  const data = req.query;
  console.log(data);
  if (!data.todoId) {
    return res.status(400).json({ message: "Bad Request" });
  }
  try {
    await prisma.todo.delete({
      where: {
        id: data.todoId.toString(),
      },
    });
    res
      .status(200)
      .json({ id: data.todoId.toString(), message: "Todo Deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Terjadi kesalahan saat menghapus data",
    });
  }
}

async function handleUpdateMethod(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  console.log(data);
  if (!data.todoId || !data.title || !data.deadline) {
    return res.status(400).json({ message: "Bad Request" });
  }
  try {
    const response = await prisma.todo.update({
      where: {
        id: data.todoId.toString(),
      },
      data: {
        title: data.title,
        deadline: data.deadline,
      },
    });
    res.status(200).json({ message: "Todo updated", todo: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengupdate data",
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
  if (req.method === "DELETE") {
    return handleDeleteMethod(req, res);
  }
  if (req.method === "PUT") {
    return handleUpdateMethod(req, res);
  }
}
