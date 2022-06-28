import React from "react";
// Next
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
// Components
import Modal from "react-modal";
// Styles
import S from "../../styles/VideoPage.module.css";

Modal.setAppElement("#__next");

const VideoPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const router = useRouter();
  const { videoId } = router.query;
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
          <div>
            <iframe
              id="ytplayer"
              width="100%"
              height="360"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0&&rel=1&origin=http://example.com`}
              frameBorder="0"
              className={S.videoPlayer}
            />
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
