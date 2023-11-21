import { FC } from "react";
import PortfolioRaw from "../portfolio-raw";
import S from "./portfolioContent.styled";
import { CircularProgress } from "@mui/material";
import { useSelector } from "../../../store/store";

const PortfolioContent: FC = () => {
  const loading = useSelector((state) => state.product.productLoading);
  const productsData = useSelector((state) => state.product.products);
  const isError = useSelector((state) => state.product.fetchError);
  console.log("productsData", productsData);
  return (
    <S.PortfolioContentContainer>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="success" />
        </div>
      ) : (
        <>
          {isError ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h3>Oops! Something went wrong. Please try again later.</h3>
            </div>
          ) : productsData.length < 1 ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h3>NO RECORDS FOUND</h3>
            </div>
          ) : (
            <PortfolioRaw />
          )}
        </>
      )}
    </S.PortfolioContentContainer>
  );
};

export default PortfolioContent;
