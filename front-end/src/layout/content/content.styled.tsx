import { Box, styled } from "@mui/material";

namespace S {
  export const ContentBox = styled(Box)(({ theme }) => ({
    overflowY: "auto",
    padding: "2rem 4rem 2rem 4rem",
    [theme.breakpoints.down("md")]: {
      padding: "2rem 2rem 2rem 2rem",
    },
  }));
}

export default S;
