import { styled, TextField, Autocomplete, FormControl, FormLabel, FormControlLabel, Box, Chip } from "@mui/material";

namespace S {
  export const CommonInputStyled = styled(TextField, {
    shouldForwardProp: (prop) =>
      prop !== "gridArea" && prop !== "fullHeight" && prop !== "hide" && prop !== "selectOptions" && prop !== "specialOptions" && prop !== "textarea",
  })<{
    gridArea?: string;
    fullHeight?: boolean;
  }>(({ gridArea, fullHeight }) => ({
    ...(gridArea ? { gridArea } : null),
    fontSize: ".9rem",

    ".MuiOutlinedInput-root": {
      height: fullHeight ? "100%" : "2.7rem",
    },

    ".MuiFormLabel-root": {
      fontSize: ".9rem",
    },
  }));

  CommonInputStyled.defaultProps = {
    InputLabelProps: { shrink: true },
    inputProps: { noValidate: true },
  };

  export const TextInput = styled(CommonInputStyled)<{ hide?: boolean; textarea?: boolean }>(({ hide, textarea }) => ({
    ...(hide
      ? {
          padding: "0 !important",
          border: "0 !important",
          width: "0 !important",
          height: "0 !important",
          ".MuiInputBase-input, .MuiOutlinedInput-notchedOutline": {
            padding: "0 !important",
            border: "0 !important",
            width: "0 !important",
            height: "0 !important",
          },
        }
      : null),
    ...(textarea
      ? {
          ".css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input": {
            top: 10,
            position: "absolute",
            width: "95% !important",
          },
        }
      : null),
    "& .Mui-disabled": {
      backgroundColor: "transparent",
    },
  }));

  export const NumberInput = styled(CommonInputStyled)(() => ({
    "& .Mui-disabled": {
      backgroundColor: "transparent",
    },
  }));

  export const DateInput = styled(CommonInputStyled)(() => ({}));

  export const SelectInput = styled(CommonInputStyled)<{ iscolor: number }>(({ theme, iscolor }) => ({
    "& .MuiOutlinedInput-root": {
      color: iscolor ? "" : theme.palette.text.secondaryLight,
      opacity: iscolor ? 1 : 0.7,
    },
  }));

  export const MultiSelectInput = styled(CommonInputStyled)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      fontSize: ".9rem",
      height: "5rem ",
    },
    "& .MuiInputLabel-root": {
      fontSize: ".9rem",
      backgroundColor: theme.palette.bg.main,
      paddingRight: ".5rem",
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.light,
      height: "1.5rem ",
      width: "1.5rem ",
    },
    "& .MuiBox-root": {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
    },
    width: "100% !important",
  }));

  MultiSelectInput.defaultProps = {
    as: FormControl,
  };

  export const MultiSelectChipContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    maxHeight: "3rem",
    overflowY: "auto",
  }));

  MultiSelectChipContainer.defaultProps = {
    gap: 2,
  };

  export const MultiSelectChip = styled(Chip)(({ theme }) => ({
    zIndex: "999999 !important",
    borderRadius: ".2rem",
    height: "1.5rem",
    backgroundColor: theme.palette.bg.light,
    color: theme.palette.text.secondary,
    "& 	.MuiChip-deleteIconSmall": {
      color: theme.palette.primary.dark,
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.dark,
      height: ".9rem !important",
      width: ".9rem !important",
    },
  }));

  export const RadioInput = styled(CommonInputStyled)(() => ({}));
  RadioInput.defaultProps = {
    as: FormControl,
  };

  export const RadioInputLabel = styled(FormLabel)(() => ({
    fontSize: "0.9rem",
  }));

  export const RadipInputControlLabel = styled(FormControlLabel)(({ theme }) => ({
    fontSize: "0.9rem",
    color: theme.palette.text.secondary,

    "& .MuiRadio-root": {
      color: theme.palette.primary.light,
    },
  }));

  export const FileInput = styled(CommonInputStyled)<{ hide?: boolean }>(({ hide }) => ({
    ...(hide
      ? {
          padding: "0 !important",
          border: "0 !important",
          width: "0 !important",
          height: "0 !important",
          ".MuiInputBase-input, .MuiOutlinedInput-notchedOutline": {
            padding: "0 !important",
            border: "0 !important",
            width: "0 !important",
            height: "0 !important",
          },
        }
      : null),
    ".MuiOutlinedInput-root": {
      fontSize: "small",
      heigth: "2.5rem",
    },
    color: "transparent",
  }));

  export const StyledAutocomplete = styled(Autocomplete, { shouldForwardProp: (prop) => prop !== "gridArea" })({
    "& .MuiOutlinedInput-root": {
      height: "2.5rem",
      fontSize: "0.9rem",
      paddingRight: "15px !important",
      "& .MuiAutocomplete-input": {
        padding: "0.5px 4px 0.5px 6px",
      },
    },
    "& .MuiInputLabel-root": {
      fontSize: ".9em",
    },
    "& .MuiSvgIcon-root": {
      display: "none",
    },
  });
}

export default S;
