import type { NextApiRequest, NextApiResponse } from "next";

import { handleEmailFire } from "@/helpers/email-helper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { recipientEmail, addressLast15 } = req.body;
      await handleEmailFire({
        to: recipientEmail,
        subject: "Hello from Axios",
        text: `Your certificate is ready. Your email is ${recipientEmail} and wallet address int is ${addressLast15}`,
      });
      return res.status(200).json({ message: "Success" });
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
