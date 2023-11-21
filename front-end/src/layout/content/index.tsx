import React, { FC } from "react";
import S from "./content.styled";

interface Props {
  children: React.ReactNode;
}

const Content: FC<Props> = ({ children }) => {
  return <S.ContentBox>{children}</S.ContentBox>;
};

export default Content;
