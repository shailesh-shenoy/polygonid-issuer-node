import type { NextApiRequest, NextApiResponse } from "next";

import { handleEmailFire } from "@/helpers/email-helper";
import { IssueRequest } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const issueRequest: IssueRequest = req.body;

      if (
        !issueRequest.studentEmail ||
        !issueRequest.address ||
        !issueRequest.addressLast15
      ) {
        return res.status(400).json({ message: "Missing fields" });
      }

      await handleEmailFire(issueRequest);
      return res
        .status(200)
        .json({ message: "Email sent to the provided email address" });
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
