import { Box, styled } from "@mui/material";

namespace S {
  export const Portfolio = styled(Box)({
    display: "grid",
    gridTemplateRows: "auto 1fr",
    height: "100%",
    gap: "1.2rem",
  });
}
export default S;
