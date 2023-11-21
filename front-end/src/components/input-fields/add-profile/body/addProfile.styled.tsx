import { Avatar, styled, Box } from "@mui/material";

namespace S {
  export const ProfilePicture = styled(Avatar)(({ theme }) => ({
    width: "5rem",
    height: "5rem",
    ".MuiSvgIcon-root": {
      width: "2rem",
      height: "2rem",
    },
  }));

  export const UploadButton = styled("i")(({ theme }) => ({
    width: "1.7rem",
    height: "1.7rem",
    lineHeight: "1.8rem",
    borderRadius: "50%",
    color: theme.palette.bg.main,
    border: theme.palette.border.primary,
    backgroundColor: theme.palette.primary.light,
  }));

  export const ProfileContainer = styled(Box, { shouldForwardProp: (prop) => prop !== "gridArea" })<{ gridArea?: string }>(({ gridArea }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    ".MuiFormHelperText-root": {
      marginTop: "4px",
    },
    ...(gridArea ? { gridArea } : null),
  }));
}

export default S;
