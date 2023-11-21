import { FC, useState } from "react";
import SearchBar from "../../common-components/search-bar";
import { Button } from "@mui/material";
import ProductsModal from "../../modal/products-modal";
import S from "./portfolioHeader.styled";

const PortfolioHeader: FC = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <>
      <S.Header>
        <S.Description>
          <S.DescriptionHeader>Products</S.DescriptionHeader>
          <S.DescriptionText>
            Available farm products from farmers.
          </S.DescriptionText>
        </S.Description>
        {/* <ToggleButton
          selectedMode={tab}
          setSelectedMode={setTab}
          options={["Raw", "Processed", "Animal"]}
        /> */}
        <S.Action>
          {/* <SearchBar searchHandler={searchHandler} ref={searchRef} /> */}
          <span>
            <Button onClick={() => setAddModalOpen(true)}>Add</Button>
          </span>
        </S.Action>
      </S.Header>
      {addModalOpen && (
        <ProductsModal
          openModal={true}
          handleClose={() => setAddModalOpen(false)}
        />
      )}
    </>
  );
};

export default PortfolioHeader;
