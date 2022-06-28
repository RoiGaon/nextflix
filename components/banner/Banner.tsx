import * as React from "react";
// Next
import Image from "next/image";
import { useRouter } from "next/router";
// Styles
import S from "./Banner.module.css";

interface Props {
  id: string;
  title: string;
  subTitle: string;
  imgUrl: string;
}

const Banner: React.FC<Props> = ({ id, title, subTitle, imgUrl }) => {
  const router = useRouter();

  return (
    <>
      <div className={S.container}>
        <div className={S.leftWrapper}>
          <div className={S.left}>
            <div className={S.nseriesWrapper}>
              <p className={S.firstLetter}>N</p>
              <p className={S.series}>S E R I E S</p>
            </div>
            <h3 className={S.title}>{title}</h3>
            <h3 className={S.subTitle}>{subTitle}</h3>

            <div className={S.playBtnWrapper}>
              <button
                className={S.btnWithIcon}
                onClick={() => router.push(`/video/${id}`)}
              >
                <Image
                  src="/static/play_arrow.svg"
                  alt="Play icon"
                  width={32}
                  height={32}
                />
                <span className={S.playText}>Play</span>
              </button>
            </div>
          </div>
        </div>
        <div
          className={S.bannerImg}
          style={{
            backgroundImage: `url(${imgUrl}`,
          }}
        ></div>
      </div>
    </>
  );
};

export default Banner;
