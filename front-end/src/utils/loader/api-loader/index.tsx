import { FC } from "react";
import S from "./apiLoader.styled";
import { CircularProgress } from "@mui/material";

const APIloader: FC = () => {
  return (
    <S.Container >
      <CircularProgress color="success" />
    </S.Container>
  );
};

export default APIloader;
