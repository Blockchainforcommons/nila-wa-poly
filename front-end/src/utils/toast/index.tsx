import React from "react";
import { toast, ToastPosition } from "react-toastify";
import { Typography } from "@mui/material";
import S from "./toast.styled";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "warning" | "error" | "info";

const ToastContent = ({ message }: { message: string }) => (
  <S.Toast>
    <Typography variant="body2">{message}</Typography>
  </S.Toast>
);

interface IToast {
  message: string;
  type?: ToastType;
  life?: number;
}

export const ToastContainer = ({ ...options }) => (
  <S.ToastContainerStyled {...options} />
);

const Toast = ({ message, type = "info", life = 3500 }: IToast) =>
  toast[type](<ToastContent message={message} />, {
    position: "bottom-right" as ToastPosition,
    autoClose: life,
    closeOnClick: false,
    // pauseOnHover: true,
    draggable: false,
  });

export default Toast;
