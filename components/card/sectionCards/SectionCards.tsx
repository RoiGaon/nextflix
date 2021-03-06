import React from "react";
// Components
import Card from "../Card";
// Helpers
import { Size, Video } from "types";
// Styles
import S from "./SectionCards.module.css";

interface Props {
  title: string;
  videos: Video[];
  size: Size;
}

const SectionCards: React.FC<Props> = ({ title, videos = [], size }) => {
  return (
    <>
      <section className={S.container}>
        <h2 className={S.title}>{title}</h2>
        <div className={S.cardsWrapper}>
          {videos.map((video, i) => (
            <Card video={video} key={i} size={size} index={i} />
          ))}
        </div>
      </section>
    </>
  );
};

export default SectionCards;
