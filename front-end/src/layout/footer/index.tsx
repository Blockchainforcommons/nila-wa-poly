import { FC } from "react";
import S from "./footer.styled";

const Footer: FC = () => {
  return (
    <S.Footer>
      <S.ArticleBar>
        <S.ArticleText>About</S.ArticleText>
        <S.ArticleText>Blog</S.ArticleText>
        <S.ArticleText>Help</S.ArticleText>
        <S.ArticleText>Terms & Conditions</S.ArticleText>
      </S.ArticleBar>
    </S.Footer>
  );
};

export default Footer;
