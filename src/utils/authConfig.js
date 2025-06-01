// Get the Cognito domain URL from environment variables
const cognitoDomain = process.env.REACT_APP_COGNITO_DOMAIN;

// Configuration object for Cognito authentication
const cognitoAuthConfig = {
  authority: cognitoDomain,
  client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_COGNITO_REDIRECT_URI,
  response_type: "code",
  scope: "openid email profile",
  metadata: {
    issuer: cognitoDomain,
    authorization_endpoint: `${cognitoDomain}/oauth2/authorize`,
    token_endpoint: `${cognitoDomain}/oauth2/token`,
    userinfo_endpoint: `${cognitoDomain}/oauth2/userInfo`,
    end_session_endpoint: `${cognitoDomain}/logout`,
    jwks_uri: `${cognitoDomain}/.well-known/jwks.json`,
  },
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

export default cognitoAuthConfig;