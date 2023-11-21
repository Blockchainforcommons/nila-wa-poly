import { Box, styled } from "@mui/material";

namespace S {
  export const ImageCropperContainer = styled(Box)(({ theme }) => ({
    position: "fixed",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.custom.backdrop,
    zIndex: "50",
  }));

  export const ImagePopUp = styled(Box)(({ theme }) => ({
    margin: "2%",
    padding: "1% 2%",
    boxShadow: `1px 1px 10px ${theme.palette.addAlpha(theme.palette.custom.shadow, 0.2)}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    height: "70vh",
    backgroundColor: theme.palette.bg.main,
    position: "relative",
    borderRadius: "0.75rem",
    [theme.breakpoints.down("lg")]: {
      width: "95%",
      height: "600px",
    },
    [theme.breakpoints.down("md")]: {
      width: "90%",
      height: "400px",
    },
  }));

  export const CloseIconContainer = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "1%",
    right: "1%",
    width: "1.3rem",
    height: "1.3em",
    cursor: "pointer",
    backgroundColor: theme.palette.bg.dark,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  export const CloseIcon = styled("i")(({ theme }) => ({
    color: theme.palette.text.white,
    fontSize: "0.7rem",
  }));

  export const MainImageContainer = styled(Box)({
    width: "80%",
    height: "100%",
    // border: "1px solid #C1E1D6 !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ".react-cropper": {
      width: "fit-content",
      height: "inherit",
      div: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        img: {
          width: "100%",
          height: "100%",
          // objectFit:"scale-down"
        },
      },
    },
  });

  export const ImageDetailsSection = styled(Box)({
    width: "20%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "1rem",
  });

  export const PreviewTitleContainer = styled(Box)({
    width: "60%",
    fontSize: "1.3rem",
    textAlign: "center",
  });

  export const PreviewImageContainer = styled(Box)(({ theme }) => ({
    width: "70%",
    aspectRatio: "1/1",
    border: `1px solid ${theme.palette.addAlpha(theme.palette.border.secondary, 0.2)}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "5% 0",
    img: {
      width: "100%",
      height: "100%",
    },
  }));

  export const UploadBtn = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "2%",
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.text.white,
      border: "none",
      cursor: "pointer",
      borderRadius: "0.4rem",
    },
  }));
}

export default S;
