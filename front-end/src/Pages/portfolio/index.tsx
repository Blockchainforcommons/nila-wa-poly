import PortfolioContent from "../../components/portfolio/portfolio-content";
import PortfolioHeader from "../../components/portfolio/portfolio-header";
import S from "./portfolio.styled";

const Portfolio = () => {
  return (
    <S.Portfolio>
      <PortfolioHeader />
      <PortfolioContent />
    </S.Portfolio>
  );
};

export default Portfolio;
