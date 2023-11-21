import { styled, Typography } from "@mui/material";

namespace S {
  export const PortfolioRaw = styled("div")(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 27rem)",
    gap: "2rem",
    width: "100%",
    padding: "3rem 1rem",
    justifyContent: "center",
    overflowY: "scroll",
    alignContent: "start",
  }));

  export const LoaderWrapper = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  export const BottomMarginPlaceholder = styled("span")({
    color: "red",
  });

  export const NoDataMessage = styled(Typography)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "1.2rem",
    color: theme.palette.text.secondaryLight,
    fontWeight: "500",
  }));
}

export default S;
