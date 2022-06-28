import React from "react";
// Next
import { useRouter } from "next/router";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
// Components
import Modal from "react-modal";
// Styles
import S from "../../styles/VideoPage.module.css";
import cn from "classnames";

Modal.setAppElement("#__next");

const VideoPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const router = useRouter();
  const { videoId } = router.query;

  const video = {
    title: "Hi cute dog",
    publishTime: "1990-01-01",
    description: "Abig red dog that is super cute,can he get any bigger?",
    channelTitle: "Paramount Pictures",
    viewCount: 10000,
  };

  const { title, publishTime, description, channelTitle, viewCount } = video;

  return (
    <>
      <div className={S.container}>
        <Modal
          isOpen={isModalOpen}
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

// export const getStaticProps: GetStaticProps = (context: any) => {
//   return {
//     props: {},
//   };
// };
