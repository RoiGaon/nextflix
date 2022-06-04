import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Banner } from "@components";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="netflix app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Netflix</h1>
      {/* <NavBar /> */}
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />
      {/* Card */}
    </div>
  );
};

export default Home;
