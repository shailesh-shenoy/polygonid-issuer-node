import { IssuerEmail } from "@/components/IssuerEmail";
import { IssueDetails, IssueRequest } from "@/types";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import QRCode from "qrcode";

const smtpSettings = {
  service: "gmail",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};
const expirationTimeInMinutes =
  Number(process.env.ISSUER_CLAIM_EXPIRY_MIN) || 60;

export const handleEmailFire = async (issueRequest: IssueRequest) => {
  const transporter = nodemailer.createTransport({
    ...smtpSettings,
  });

  const qrCodeData = await generateQRCode(
    "iden3comm://?request_uri=http://35.245.157.181:3002/v1/qr-store?id=e1983bb5-d8dc-42b6-898e-599aeb560aa2"
  );

  const issueDetails: IssueDetails = {
    studentEmail: issueRequest.studentEmail,
    address: issueRequest.address,
    addressLast15: issueRequest.addressLast15,
    qrCodeData: qrCodeData,
    expirationDate: new Date(
      new Date().getTime() + expirationTimeInMinutes * 60000
    ),
  };

  return await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: issueRequest.studentEmail,
    subject: "Claim your Student Verified Credential",
    html: render(IssuerEmail(issueDetails)),
  });
};

async function generateQRCode(qrCodeLink: string): Promise<string> {
  return await QRCode.toDataURL(qrCodeLink, { type: "image/png" });
}
