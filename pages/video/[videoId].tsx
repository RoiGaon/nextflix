import React from "react";
// Next
import { useRouter } from "next/router";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
} from "next";
// Components
import { NavBar } from "@components";
import Modal from "react-modal";
// Helpers
import { getYouTubeVideoById } from "lib/videos";
// Styles
import S from "@styles/VideoPage.module.css";
import cn from "classnames";
import { DisLikeIcon, LikeIcon } from "@components/icons";

Modal.setAppElement("#__next");

const VideoPage = ({
  video,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { videoId } = router.query;

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  return (
    <>
      <div className={S.container}>
        <NavBar />
        <Modal
          isOpen={true}
          contentLabel="Watch the video"
          onRequestClose={() => router.back()}
          className={S.modal}
          overlayClassName={S.overlay}
        >
          <iframe
            id="ytplayer"
            width="100%"
            height="360"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0&&rel=1&origin=http://example.com`}
            frameBorder="0"
            className={S.videoPlayer}
          />
          <div className={S.likeDislikeBtnWrapper}>
            <div className={S.likeBtnWrapper}>
              <button>
                <div className={S.btnWrapper}>
                  <LikeIcon />
                </div>
              </button>
            </div>
            <button>
              <div className={S.btnWrapper}>
                <DisLikeIcon />
              </div>
            </button>
          </div>
          <div className={S.modalBody}>
            <div className={S.modalBodyContent}>
              <div className={S.col1}>
                <p className={S.publishTime}>{publishTime}</p>
                <p className={S.title}>{title}</p>
                <p className={S.description}>{description}</p>
              </div>
              <div className={S.col2}>
                <p className={cn(S.subText, S.subTextWrapper)}>
                  <span className={S.textColor}>Cast: </span>
                  <span className={S.channelTitle}>{channelTitle}</span>
                </p>
                <p className={cn(S.subText, S.subTextWrapper)}>
                  <span className={S.textColor}>View Count: </span>
                  <span className={S.channelTitle}>{viewCount}</span>
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default VideoPage;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const videoId = context.params?.videoId;
  const videoArray = await getYouTubeVideoById(String(videoId));

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10, // 10 seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHSAViiQ"];
  const paths = listOfVideos.map((videoId) => ({ params: { videoId } }));

  return {
    paths,
    fallback: "blocking",
  };
};
