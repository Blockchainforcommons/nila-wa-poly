import { Bolt } from "@mui/icons-material";
import { Theme, Box, styled, Typography } from "@mui/material";

namespace S {
  export const Header = styled(Box)(({ theme }: { theme: Theme }) => ({
    maxWidth: "100vw",
    height: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.bg.main,
    padding: ".5rem 1.2rem",
    gap: "1rem",
  }));

  export const LogoText = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontSize: "20px",
    fontWeight: "bold",
    color: theme.palette.text.primary,
  }));
}

export default S;
