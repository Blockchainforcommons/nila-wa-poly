import { Box, styled, Typography } from "@mui/material";
namespace S {
  export const Footer = styled(Box)(({ theme }) => ({
    padding: ".5rem 1rem",
    backgroundColor: theme.palette.bg.main,
    color: theme.palette.text.secondaryLight,
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  }));

  export const InfoText = styled(Typography)(({ theme }) => ({
    fontSize: ".8rem",
    textTransform: "uppercase",
    cursor: "pointer",
    whiteSpace: "nowrap",
    "&:hover": {
      color: theme.palette.addAlpha(theme.palette.text.secondaryLight, 0.8),
    },
  }));

  export const ArticleBar = styled(Box)({
    display: "flex",
    gap: "1.5rem",
  });

  export const ArticleText = styled(InfoText)({
    textTransform: "unset",
  });
}

export default S;
