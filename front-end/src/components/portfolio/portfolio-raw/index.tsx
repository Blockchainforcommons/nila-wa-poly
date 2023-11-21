import { FC } from "react";
import ItemCard from "../item-card";
import { useSelector } from "../../../store/store";
import S from "./portfolioRaw.styled";

const PortfolioRaw: FC = () => {
  const productsData = useSelector((state) => state.product.products);

  return (
    <>
      <S.PortfolioRaw>
        {productsData.map((rawProduct, i) => (
          <ItemCard key={i} data={rawProduct}></ItemCard>
        ))}
      </S.PortfolioRaw>
    </>
  );
};

export default PortfolioRaw;
