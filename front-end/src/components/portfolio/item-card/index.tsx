import { useEffect, useMemo, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import S from "./itemCard.styled";
import paddy from "../../../assets/images/paddy.png";
import millet from "../../../assets/images/millet.png";
import groundnut from "../../../assets/images/groundnut.png";
import maize from "../../../assets/images/maize.png";
import ragi from "../../../assets/images/ragi.png";
import blackgram from "../../../assets/images/blackgram.png";
import sugarcane from "../../../assets/images/sugarcane.png";
import cotton from "../../../assets/images/cotton.png";
import { IProductSlice } from "../../../store/slices/product";
import { handleDateDifference } from "../../../utils/helpers";
import { useThunkDispatch } from "../../../store/store";
import { buyProduct } from "../../../store/slices/product/actions";

const ItemCard: React.FC<{ data: IProductSlice }> = ({ data }) => {
  const [picture, setPicure] = useState<any>("");
  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (data.picture.data) {
      const imageData = data.picture.data;
      const base64String = "data:image/jpeg;base64," + Uint8ToBase64(imageData);
      setPicure(base64String);
    }
  }, [data]);

  function Uint8ToBase64(u8Arr: any) {
    const binaryString = String.fromCharCode.apply(null, u8Arr);
    return btoa(binaryString);
  }

  const image = useMemo(() => {
    switch (data.cropType) {
      case "Paddy Seeds":
        return paddy;
      case "Millet Seeds":
        return millet;
      case "Groundnut":
        return groundnut;
      case "Maize":
        return maize;
      case "Ragi Seeds":
        return ragi;
      case "Black Gram":
        return blackgram;
      case "Sugarcane":
        return sugarcane;
      case "Cotton Seeds":
        return cotton;
      default:
        return paddy;
    }
  }, [data.cropType]);

  return (
    <S.ItemCard>
      <S.SeedImage src={picture} />
      {/* <img src={} alt="" /> */}
      <S.Title>{data.cropType}</S.Title>
      <S.Badge>
        {/* <span>{data.qualityGrade.toUpperCase()}</span>
        <span>+</span> */}
        {data.isVerified && (
          <S.LightTooltip
            title={
              <p style={{ lineHeight: "18px" }}>
                Storage location
                <br /> verified by NILA
              </p>
            }
            placement="right-start"
          >
            <S.BadgeIcon />
          </S.LightTooltip>
        )}
      </S.Badge>
      {/* <S.Span>
        <AccessTimeIcon />
        {handleDateDifference(data.startDate, data.endDate)}
      </S.Span> */}
      <S.Description>
        <S.DescriptionText>
          Grade: <span>{data.grade}</span>
        </S.DescriptionText>
        <S.DescriptionText>
          Location: <span>{data.location}</span>
        </S.DescriptionText>
        <S.DescriptionText>
          Packaging Status: <span>{data.packagingStatus}</span>
        </S.DescriptionText>
        <S.DescriptionText>
          Price Per Quintal: <span>{data.pricePerQuintal} ₹</span>
        </S.DescriptionText>
        <S.DescriptionText>
          harvest Date: <span>{data.harvestDate}</span>
        </S.DescriptionText>
        <S.DescriptionText>
          Entry Date: <span>{data.entryDate}</span>
        </S.DescriptionText>
      </S.Description>
      <S.VarLabel>Variety:</S.VarLabel>
      <S.VarValue>
        <span>{data.cropVariety}</span>
        {/* <ExpandMoreIcon /> */}
      </S.VarValue>
      <S.StockLabel>Available:</S.StockLabel>
      <S.StockValue>{data.quantity} kg</S.StockValue>
      {/* <S.DeleteIcon />
      <S.EditIcon /> */}
      {data.isVerified && (
        <S.BuyButton onClick={() => dispatch(buyProduct(data._id))}>
          Buy
        </S.BuyButton>
      )}
    </S.ItemCard>
  );
};

export default ItemCard;
