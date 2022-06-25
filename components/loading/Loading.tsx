import React from "react";
// Styles
import S from "./Loading.module.css";

const Loading: React.FC = () => {
  return (
    <>
      <p className={S.loader}>Loading...</p>
    </>
  );
};

export default Loading;
