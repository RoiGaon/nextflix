import React from "react";
// Components
import Card from "../Card";
// Helpers
import { Size } from "types";
// Styles
import S from "./SectionCards.module.css";

interface Props {
  title: string;
  videos: any[];
  size: Size;
}

const SectionCards: React.FC<Props> = ({ title, videos = [], size }) => {
  return (
    <>
      <section className={S.container}>
        <h2 className={S.title}>{title}</h2>
        <div className={S.cardsWrapper}>
          {videos.map((video, i) => (
            <Card imgUrl={video.imgUrl} size={size} index={i} key={i} />
          ))}
        </div>
      </section>
    </>
  );
};

export default SectionCards;
