import React from "react";
// Components
import Card from "../Card";
// Helpers
import { Size, Video } from "types";
// Styles
import S from "./SectionCards.module.css";
import cn from "classnames";

interface Props {
  title: string;
  videos: Video[];
  size: Size;
  shouldWrap?: boolean;
  shouldScale?: boolean;
}

const SectionCards: React.FC<Props> = ({
  title,
  videos = [],
  size,
  shouldWrap = false,
  shouldScale = true,
}) => {
  return (
    <>
      <section className={S.container}>
        <h2 className={S.title}>{title}</h2>
        <div className={cn(shouldWrap && S.wrap, S.cardsWrapper)}>
          {videos.map((video, i) => (
            <Card
              video={video}
              key={i}
              size={size}
              index={i}
              shouldScale={shouldScale}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default SectionCards;
