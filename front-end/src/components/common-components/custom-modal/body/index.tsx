import { FC } from "react";
import S from "./body.styled";

interface CustomProps {
  id?: string;
  onSubmit?: () => void;
  children: React.ReactNode;
  isPadding?: boolean;
}

const ModalBody: FC<CustomProps> = ({ children, id, onSubmit, isPadding }) => {
  return (
    <S.Container isPadding={isPadding}>
      <form id={id} onSubmit={onSubmit}>
        {children}
      </form>
    </S.Container>
  );
};

export default ModalBody;
