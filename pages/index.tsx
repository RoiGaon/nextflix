import * as React from "react";
// Next
import Head from "next/head";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
// Components
import { Banner, NavBar, SectionCards } from "@components";
// Helpers
import { getPopularVideos, getVideos, getWatchItAgainVideos } from "lib/videos";
import { redirectUser } from "utils/redirectUser";
// Styles
import S from "@styles/Home.module.css";

const Home: NextPage = ({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
  watchedItAgainVideos,
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
          id="4zH5iYM4wJo"
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
        />
        <div className={S.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards
            title="Watch it again"
            videos={watchedItAgainVideos}
            size="small"
          />
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { userId, token } = await redirectUser(context);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("Productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();
  const watchedItAgainVideos = await getWatchItAgainVideos(userId, token);

  return {
    props: {
      watchedItAgainVideos,
      productivityVideos,
      popularVideos,
      disneyVideos,
      travelVideos,
    },
  };
};
