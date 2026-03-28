import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import React from "react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./assets/Context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </MantineProvider>
  </React.StrictMode>
);
