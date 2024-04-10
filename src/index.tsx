import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import Route

import "./input.css";
import App from "./apps/platform/App";
import LandingPage from "./apps/web/pages/LandingPage";
import PrivateRoute from "./apps/platform/components/PrivateRoute";
import SignIn from "./apps/platform/pages/SignUser/SignIn/SignIn";
import SignUp from "./apps/platform/pages/SignUser/SignUp/SignUp";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route path="/app/*" element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
