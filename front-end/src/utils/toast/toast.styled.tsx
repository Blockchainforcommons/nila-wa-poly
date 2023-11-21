import { styled } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { LightTheme } from "../theme";

namespace S {
  export const Toast = styled("div")(({ theme }) => ({
    fontWeight: "400",
    letterSpacing: "0.5px",
  }));

  export const ToastContainerStyled = styled(ToastContainer)(() => ({
    ".Toastify__toast": {
      color: LightTheme.palette.text.white,

      ".Toastify__close-button": {
        color: LightTheme.palette.text.white,
      },

      ".Toastify__toast-icon > svg": {
        fill: LightTheme.palette.text.white,
      },

      "&--success": {
        backgroundColor: LightTheme.palette.primary.light,
      },
      "&--error": {
        backgroundColor: LightTheme.palette.error.light,
      },
      "&--warning": {
        backgroundColor: LightTheme.palette.warning.main,
      },
      "&--info": {
        "&, .Toastify__close-button": {
          color: LightTheme.palette.text.primary,
        },

        ".Toastify__toast-icon > svg": {
          fill: LightTheme.palette.text.primary,
        },
      },
    },
  }));
}

export default S;
