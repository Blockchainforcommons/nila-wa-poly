import { DialogTitle, styled } from "@mui/material";

namespace S {
  export const Container = styled(DialogTitle)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    "& .MuiIconButton-root": {
      position: "absolute",
      right: "1.875rem",
      padding: ".7rem",
      color: theme.palette.primary.main,
      borderRadius: "50%",
      backgroundColor: theme.palette.bg.main,
      width: "1rem",
      height: "1rem",
      alignItems: "center",
    },
    padding: "1.125rem 1.875rem",
    backgroundColor: theme.palette.bg.dark,
  }));

  export const Title = styled("div", { shouldForwardProp: (prop) => prop !== "alignment" })<{ alignment?: string }>(({ theme, alignment }) => ({
    display: alignment ? "flex" : "contents",
    justifyContent: alignment ? "center" : "",
    marginRight: alignment ? "1.5rem" : "",
    color: theme.palette.text.primaryDark,
    width: "100%",
    alignItems: "center",
  }));
}

export default S;
