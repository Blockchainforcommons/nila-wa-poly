import { styled, Dialog } from "@mui/material";
namespace S {
  export const ModalContainer = styled(Dialog, { shouldForwardProp: (prop) => prop !== "openAddResolutionModal" })<{
    openAddResolutionModal?: boolean;
  }>(({ theme, openAddResolutionModal = false }) => ({
    "& .MuiBackdrop-root": {
      backgroundColor: theme.palette.custom.backdrop,
      width: "100%",
      height: "100%",
    },
    "& .MuiPaper-root": {
      borderRadius: ".75rem",
      margin: "2rem",
      width: openAddResolutionModal ? "102.9375rem" : "",
      maxWidth: openAddResolutionModal ? "calc(100vw - 7rem)" : "",
    },
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.primary.light,
    },
    "& .MuiOutlinedInput-root": {
      color: theme.palette.text.secondaryDark,
      "& fieldset": {
        border: ".15rem solid",
        borderColor: theme.palette.border.primary,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.border.primaryDark,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.border.primaryDark,
      },
    },
    "& .MuiFormHelperText-root": {
      color: theme.palette.text.red,
      marginTop: 0,
      marginLeft: 0,
    },
    "& .MuiBox-root": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  }));
}

export default S;
