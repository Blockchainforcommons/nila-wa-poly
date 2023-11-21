import { styled, Box } from "@mui/material";

namespace S {
  export const Container = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.custom.backdrop,
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  }));
}

export default S;
