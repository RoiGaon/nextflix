import React from "react";
// Next
import { useRouter } from "next/router";
import { GetStaticProps } from "next";

const VideoPage = () => {
  const router = useRouter();
  const { videoId } = router.query;
  return (
    <>
      <div>VideoPage</div>
    </>
  );
};

export default VideoPage;

// export const getStaticProps: GetStaticProps = (context: any) => {
//   return {
//     props: {},
//   };
// };
