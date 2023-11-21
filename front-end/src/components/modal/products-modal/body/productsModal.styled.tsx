import { styled } from "@mui/material";

namespace S {
  export const StaticBox = styled("div")({
    display: "grid",
    gridTemplateAreas: `
    "prf prf"
    "ftp ftp"
    "var var"
    "loc loc"
    "std end"
    "ava qty"
    "pac pri"
    
    `,
    gridTemplateColumns: "15rem 15rem",
    // gridTemplateRows: "auto auto auto auto auto 100px",
    gap: "2rem",
    "& .MuiAutocomplete-fullWidth": {
      width: "31rem",
    },
    "& .MuiAutocomplete-popper": {
      backgroundColor: "red",
    },
    "& .Mui-disabled": {
      backgroundColor: "transparent",
    },
  });
}

export default S;
