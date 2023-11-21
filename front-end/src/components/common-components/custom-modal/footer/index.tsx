import { FC } from "react";
import S from "./footer.styled";

interface CustomProps {
  children: React.ReactNode;
}

const ModalFooter: FC<CustomProps> = ({ children }) => {
  return <S.Container>{children}</S.Container>;
};

export default ModalFooter;
