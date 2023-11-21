import { styled, Tooltip, Typography } from "@mui/material";

namespace S {
  export const Header = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    position: "relative",
    gap: "2rem",
    justifyContent: "space-between",

    [theme.breakpoints.down("lg")]: {
      gap: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  export const Description = styled("div")({
    whiteSpace: "nowrap",
  });

  export const DescriptionHeader = styled(Typography)(({ theme }) => ({
    fontSize: "1.125rem",
    fontWeight: "500",
    color: theme.palette.text.secondaryDark,
  }));

  export const DescriptionText = styled(Typography)(({ theme }) => ({
    fontSize: ".875rem",

    color: theme.palette.text.secondary,
  }));

  export const Action = styled("div")(({ theme }) => ({
    // display: "grid",
    // gridTemplateColumns: "12rem 5rem",
    // columnGap: "1.5rem",
    display:"flex",
    justifyContent:"right",

    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "22rem 5rem",
    },
  }));

  export const ToolTip = styled(Tooltip)(({ theme }) => ({
    "& .Mui-disabled": {
      backgroundColor: theme.palette.custom.disabled,
    },
  }));
}

export default S;
