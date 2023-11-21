import { styled } from "@mui/material";

namespace S {
  export const Wrapper = styled("i")(({ theme }) => ({
    fontSize: ".7rem",
    padding: ".5rem",
    "&:hover": {
      backgroundColor: theme.palette.bg.dark,
    },
  }));
}
export default S;
