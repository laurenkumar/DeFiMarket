import React from "react";
import Head from "next/head";
import BuyCrypto from "../components/BuyCrypto";

export default function Transak() {
  return (
    <>
      <Head>
        <title>DefiMarket - Buy Crypto </title>
        <meta
          name="description"
          content="DefiMarket, buy any crypto via the Transak tool"
        />
      </Head>
      <BuyCrypto />
    </>
  );
}
