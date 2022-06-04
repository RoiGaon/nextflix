import * as React from "react";
// Next
import Head from "next/head";
import type { NextPage } from "next";
// Components
import { Banner, NavBar } from "@components";
// Styles
import S from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={S.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="netflix app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Netflix</h1>
      <NavBar />
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
