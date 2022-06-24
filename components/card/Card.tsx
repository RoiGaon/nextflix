import React from "react";
// Next
import Image from "next/image";
// Helpers
import { motion } from "framer-motion";
import { Size } from "types";
// Styles
import S from "./Card.module.css";
import cn from "classnames";

interface Props {
  imgUrl: string;
  size: Size;
  index: number;
}

const classMap: any = {
  large: S.lgItem,
  medium: S.mdItem,
  small: S.smItem,
};

const defaultImage =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80";

const Card: React.FC<Props> = ({
  imgUrl = defaultImage,
  size = "medium",
  index,
}) => {
  const [imgSrc, setImgSrc] = React.useState(imgUrl);
  return (
    <>
      <div className={S.container}>
        <motion.div
          className={cn(classMap[size], S.imgMotionWrapper)}
          whileHover={index === 0 ? { scaleY: 1.1 } : { scale: 1.1 }}
        >
          <Image
            src={imgSrc}
            alt="image"
            layout="fill"
            className={S.cardImg}
            onError={() => setImgSrc(defaultImage)}
          />
        </motion.div>
      </div>
    </>
  );
};

export default Card;
