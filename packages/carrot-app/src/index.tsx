import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import theme from "@carrot/core/style/theme";
import GlobalStyle from "@carrot/core/style/globalStyle";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth/authProvider";
import { ToastContainer } from "react-toastify";
import { setScreenVH } from './infra/screen';
import { UserProvider } from "./contexts/userProvider";
import { ScrollProvider } from "./contexts/scrollProvider";
import { AccessTokenProvider } from "./contexts/auth/accessTokenProvider";
import { LatLngProvider } from "./contexts/latLngProvider";
import { AdmCodesProvider } from "./contexts/admCodesProvider";
import { ReIssueProvider } from "./contexts/auth/reIssueProvider";

const root = ReactDOM.createRoot(
  document.getElementById("App") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ToastContainer 
      position="top-center"
      hideProgressBar={true}
      autoClose={2000}
    />
    <ThemeProvider theme={theme}>
      <BrowserRouter basename="/">
        <UserProvider>
          <ScrollProvider>
            <AccessTokenProvider>
              <LatLngProvider>
                <AdmCodesProvider>
                  <ReIssueProvider>
                    <AuthProvider>
                      <App />
                    </AuthProvider> 
                  </ReIssueProvider>
                </AdmCodesProvider>
              </LatLngProvider>
            </AccessTokenProvider>
          </ScrollProvider>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

window.onresize = () => {
  setScreenVH()
}
setScreenVH()
