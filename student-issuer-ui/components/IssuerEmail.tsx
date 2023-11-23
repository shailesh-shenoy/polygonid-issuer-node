import { IssueDetails, IssueRequest } from "@/types";
import {
  Section,
  Body,
  Button,
  Html,
  Head,
  Container,
  Hr,
  Img,
  Text,
  Preview,
} from "@react-email/components";

export const IssuerEmail = ({
  studentEmail,
  address,
  addressLast15,
  qrCodeLink,
  expirationDate,
}: IssueDetails) => (
  <Html>
    <Head />
    <Preview>
      Scan this QR code to verify your email and get your Verified Student
      Credential.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={"/logo.png"}
          width="170"
          height="100"
          alt="Student Issuer"
          style={logo}
        />
        <Hr style={hr} />
        <Text style={paragraph}>
          You have been invited to receive a Verified Student Credential in your
          PolygonID wallet.
        </Text>
        <Text>
          {`Scan the below QR code with your polygonID wallet to verify your email and get your Verified Student Credential.`}
        </Text>
        <Hr style={hr} />
        <Section style={btnContainer}></Section>
        <Hr style={hr} />
        <Text>
          Your Verified Student Credential will be tied to your email ID:{" "}
          {studentEmail} and wallet address: {address}, represented as an
          integer: {addressLast15.toString()}
        </Text>
        <Text>This QR will expire on {expirationDate.toLocaleString()}.</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
