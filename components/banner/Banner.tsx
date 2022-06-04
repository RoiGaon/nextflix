import { url } from "inspector";
import * as React from "react";

interface Props {
  title: string;
  subTitle: string;
  imgUrl: string;
}

const Banner: React.FC<Props> = ({ title, subTitle, imgUrl }) => {
  const handleOnPlay = () => {};

  return (
    <>
      <h3>{title}</h3>
      <h3>{subTitle}</h3>
      <button onClick={handleOnPlay}>Play</button>
      <div
        style={{
          backgroundImage: `url(${imgUrl})`,
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      />
    </>
  );
};

export default Banner;
