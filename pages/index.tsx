import * as React from "react";
// Next
import Head from "next/head";
import type { NextPage } from "next";
// Components
import { Banner, NavBar, SectionCards } from "@components";
// Styles
import S from "../styles/Home.module.css";
import { getVideos } from "lib/videos";

const Home: NextPage = () => {
  const disneyVideos = getVideos();

  return (
    <div className={S.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="netflix app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar userName="roigaon@gmail.com" />
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />
      <div className={S.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards title="Disney" videos={disneyVideos} size="medium" />
      </div>
    </div>
  );
};

export default Home;
