import { styled } from "@mui/material";
import { Box } from "@mui/system";

namespace S {
  export const ToggleButtonContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    borderRadius: "1.25rem",
    alignItems: "center",
    gap: "0.5rem",
    width: "fit-content",
    height: "2.5rem",
    backgroundColor: theme.palette.bg.main,
  }));

  export const CustomToggleButton = styled("span", {
    shouldForwardProp: (prop) => prop !== "colorToggle",
  })<{ colorToggle: boolean }>(({ theme, colorToggle }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "1.25rem",
    cursor: "pointer",
    gap: "0.5rem",
    width: "9.375rem",
    height: "2.5rem",
    fontWeight: "500",
    backgroundColor: colorToggle ? theme.palette.primary.light : theme.palette.bg.main,
    color: colorToggle ? theme.palette.text.white : theme.palette.text.primary,
  }));
}

export default S;
