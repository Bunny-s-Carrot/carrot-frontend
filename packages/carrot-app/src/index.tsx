import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import theme from "@carrot/core/style/theme";
import GlobalStyle from "@carrot/core/style/globalStyle";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth/authProvider";
import { CustomProvider } from "./contexts/etc/customProvider";
const root = ReactDOM.createRoot(
  document.getElementById("App") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <BrowserRouter basename="/">
        <AuthProvider>
          <CustomProvider>
            <App />
          </CustomProvider>
        </AuthProvider> 
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
