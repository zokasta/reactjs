import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "react-notifications-component/dist/theme.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import { AppProvider } from "./Database/Context";

// your custom theme
import theme from "./theme/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ReactNotifications />
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <App />
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Performance reporting (optional)
reportWebVitals();
  