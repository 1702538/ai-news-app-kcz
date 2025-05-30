import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoDomain = "https://ap-southeast-1vffrnajfr.auth.ap-southeast-1.amazoncognito.com";

const cognitoAuthConfig = {
  authority: cognitoDomain,
  client_id: "407du18cnkp5u5u978gdrpi10a",
  redirect_uri: "https://main.d25ickgp2g070n.amplifyapp.com",
  response_type: "code",
  scope: "openid email profile",

  // ✅ Static metadata to avoid CORS on discovery endpoint
  metadata: {
    issuer: cognitoDomain,
    authorization_endpoint: `${cognitoDomain}/oauth2/authorize`,
    token_endpoint: `${cognitoDomain}/oauth2/token`,
    userinfo_endpoint: `${cognitoDomain}/oauth2/userInfo`,
    end_session_endpoint: `${cognitoDomain}/logout`,
    jwks_uri: `${cognitoDomain}/.well-known/jwks.json`,
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);