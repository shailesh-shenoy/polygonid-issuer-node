import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount } from "wagmi";
import { fromHex } from "viem";
import { useEffect, useState } from "react";
import axios from "axios";

const Home: NextPage = () => {
  // Get the current wallet address from wagmi and set in state
  const { address, isConnected } = useAccount();
  const [recipientEmail, setRecipientEmail] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Check if client side using useEffect
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Convert the ethereum address to a BigNumber and get last 15 digits
  const addressBigInt = address
    ? BigInt(fromHex(address, "bigint"))
    : BigInt(0);
  const addressLast15 = Number(
    addressBigInt ? addressBigInt % BigInt(1000000000000000) : BigInt(0)
  );

  async function handleSubmit(e: any) {
    e.preventDefault();

    const response = await axios.post("/api/send-email", {
      recipientEmail,
      addressLast15,
    });

    if (response.status === 200) {
      alert("Email sent successfully!");
    } else {
      alert("Email failed to send.");
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Student Issuer</title>
        <meta
          content="Student Issuer allows students to get verified credientials in their PolygonID wallet."
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <h1 className={styles.title}>
          Get a Verified Student Credential in your PolygonID Wallet
        </h1>

        <div className={styles.description}>
          {isConnected && isClient ? (
            <div>
              <p className={styles.code}>Connected to account: {address}</p>
              <p>
                Address will be presented as a 15 digit number in your Student
                Verified Credential : {addressLast15.toString()}
              </p>
            </div>
          ) : (
            <p className={styles.code}>
              Use the connect button to verify your account address. Your
              account address is required to generate your Student Credential.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.description}>
            <label>
              Student Email Address:
              <input
                type="email"
                placeholder="Enter your student email address."
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={
              addressLast15 === 0 || recipientEmail.length === 0 || !isClient
            }
          >
            Generate Student Credential
          </button>
        </form>
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
