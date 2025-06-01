import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import cognitoAuthConfig from "./utils/authConfig";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application wrapped with AuthProvider to provide OIDC authentication context
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);