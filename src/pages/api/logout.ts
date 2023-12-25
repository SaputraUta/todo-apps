import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Set-Cookie", "token=; HttpOnly; path=/; Max-Age=-1; SameSite=Lax; Secure");
  
    res.status(200).json({
      message: 'Logout berhasil',
    });
  }