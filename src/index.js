import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  // Use your configured Cognito domain here exactly
  authority: "https://ap-southeast-1vffrnajfr.auth.ap-southeast-1.amazoncognito.com",

  client_id: "407du18cnkp5u5u978gdrpi10a",

  // Your Amplify app URL (replace with your actual Amplify URL)
  redirect_uri: "https://main.d25ickgp2g070n.amplifyapp.com",

  response_type: "code",

  scope: "openid email profile",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);