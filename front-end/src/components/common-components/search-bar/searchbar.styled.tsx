import { Paper, styled } from "@mui/material";

export namespace S {
  export const SearchBarPaper = styled(Paper)(({ theme }) => ({
    borderRadius: "1.2rem",
    width: "100%",
    height: "2.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "1rem",
    boxShadow: `0px 4px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.1)}`,
  }));

  export const SearchBar = styled("input")(({ theme }: any) => ({
    height: "100%",
    width: "100%",
    outline: "none",
    border: "none",
    borderRadius: "1.2rem",
    paddingLeft: "0.5rem",
    fontSize: "0.9rem",
    "::placeholder": {
      color: theme.palette.primary.light,
    },
  }));

  export const IconGreen = styled("i")(({ theme }: any) => ({
    fontSize: "1.2rem",
    color: theme.palette.primary.light,
    cursor: "pointer",
  }));
}

export default S;
