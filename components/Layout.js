import Head from "next/head";
import Image from "next/image";
import { Header } from "./Header";

import styles from "../styles/Home.module.css";
import { Box } from "./Box";
import { Spacer } from "@nextui-org/react";

export const Layout = ({
  children,
  title = "xkcd - comics for developers",
  description = "",
}) => (
  <Box
    css={{
      maxW: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <Box
      css={{
        px: "$12",
        mt: "$8",
        "@xsMax": { px: "$10" },
      }}
    >
      {children}
    </Box>

    <Spacer />

    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  </Box>
);
