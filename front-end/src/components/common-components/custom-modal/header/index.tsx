import { FC } from "react";
import TitleCloseButton from "../../buttons/title-close-button";
import S from "./header.styled";

interface CustomProps {
  children: string;
  handleClose: () => void;
  alignment?: string;
}

const ModalHeader: FC<CustomProps> = ({ children, handleClose, alignment }) => {
  return (
    <S.Container>
      <S.Title alignment={alignment}>{children}</S.Title>
      {alignment ? <></> : <TitleCloseButton handleClose={handleClose} />}
    </S.Container>
  );
};

export default ModalHeader;
