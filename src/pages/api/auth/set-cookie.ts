import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "No token provided" });
console.log("Setting cookie with token:", token);
  // Set HttpOnly, Secure cookie
  res.setHeader(
    "Set-Cookie",
    `access_token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax; Secure=false`
  );

  res.status(200).json({ success: true });
}
