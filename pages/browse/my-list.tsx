import React from "react";
// Next
import Head from "next/head";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
// Components
import { NavBar, SectionCards } from "@components";
// Helpers
import { redirectUser } from "utils/redirectUser";
// Fetch Request
import { getMyList } from "@lib/videos";
// Styles
import S from "@styles/MyList.module.css";

const MyList: NextPage = ({
  favouritedVideos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>My List</title>
        <meta name="description" content="netflix app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={S.main}>
        <NavBar />
        <div className={S.sectionWrapper}>
          <SectionCards
            title="Disney"
            videos={favouritedVideos}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </div>
    </>
  );
};

export default MyList;

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
  const favouritedVideos = await getMyList(userId, token);

  return {
    props: {
      favouritedVideos,
    },
  };
};
