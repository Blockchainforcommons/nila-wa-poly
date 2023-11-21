import { FC } from "react";
import { ThemeProvider } from "@mui/material";
import { LightTheme } from "../utils/theme";
import { ReduxProvider } from "../store/store";

const Provider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReduxProvider>
      <ThemeProvider theme={LightTheme}>{children}</ThemeProvider>
    </ReduxProvider>
  );
};

export default Provider;
