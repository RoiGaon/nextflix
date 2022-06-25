import * as React from "react";
// Next
import Head from "next/head";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
// Components
import { Banner, NavBar, SectionCards } from "@components";
// Helpers
import { getPopularVideos, getVideos } from "lib/videos";
// Styles
import S from "../styles/Home.module.css";

const Home: NextPage = ({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={S.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="netflix app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={S.main}>
        <NavBar />
        <Banner
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
        />
        <div className={S.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("Productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      productivityVideos,
      travelVideos,
      popularVideos,
    },
  };
};
