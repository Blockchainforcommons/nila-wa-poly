import { Stack, styled } from "@mui/material";

namespace S {
  export const Container = styled(Stack, {
    shouldForwardProp: (prop) => prop !== "isPadding",
  })(({ isPadding = true }: { isPadding?: boolean }) => ({ theme }) => ({
    // minWidth: "30rem",
    // minHeight: "30rem",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    overflowY: isPadding ? "auto" : "hidden",
    padding: isPadding ? "2rem 1.875rem 1.875rem 1.875rem" : 0,
    "& .Mui-disabled": {
      backgroundColor: theme.palette.custom.disabled,
    },
  }));
}
export default S;
