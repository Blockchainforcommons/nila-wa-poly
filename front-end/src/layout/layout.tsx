import { FC, useEffect } from "react";
import { GlobalStyles } from "@mui/material";
import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import Portfolio from "../Pages/portfolio";
import APIloader from "../utils/loader/api-loader";
import { useSelector } from "../store/store";
import S from "./layout.styled";
import { useThunkDispatch } from "../store/store";
import { getProducts } from "../store/slices/product/actions";
import { ToastContainer } from "../utils/toast";

const Layout: FC = () => {
  const loading = useSelector((state) => state.product.productAddLoading);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <S.Layout>
      <GlobalStyles
        styles={(theme) => ({
          "*": {
            "&::-webkit-scrollbar": {
              width: "5px", // for vertical scroll
              height: "5px", // for horizontal scroll
              backgroundColor: "transparent",
              borderRadius: "10px",
            },

            "&::-webkit-scrollbar-thumb": {
              borderRadius: "10px",
              backgroundColor: theme.palette.primary.light,
              height: "20px",
            },

            "&::-webkit-scrollbar-track-piece:start": {
              backgroundColor: "transparent",
              marginTop: "20px",
            },

            "&::-webkit-scrollbar-track-piece:end": {
              backgroundColor: "transparent",
              marginBottom: "20px",
            },
          },
        })}
      />
      <>
        <Header />
        <Content>
          {loading && <APIloader />}
          <Portfolio />
        </Content>
        {/* <Footer /> */}
        
      </>
    </S.Layout>
  );
};

export default Layout;
