import { FC } from "react";
import { IconButton } from "@mui/material";
import S from "./titleCloseButton.styled";

interface Props {
  handleClose: () => void;
}

const TitleCloseButton: FC<Props> = ({ handleClose }) => {
  return (
    <IconButton onClick={handleClose}>
      <S.Wrapper>close</S.Wrapper>
    </IconButton>
  );
};

export default TitleCloseButton;
