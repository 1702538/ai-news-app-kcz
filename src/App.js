import React from "react";
import { useAuth } from "react-oidc-context";
import { useState, useEffect } from "react";
import { Typography, message, Button } from "antd";
import TextInputForm from "./components/TextInputForm";
import FileUploader from "./components/FileUploader";
import ResultDisplay from "./components/ResultDisplay";
import Footer from "./components/Footer";
import useApi from "./hooks/useAPI";

const { Title, Text } = Typography;

function App() {
  const auth = useAuth();

  // Your existing states and hooks
  const [query, setQuery] = useState("");
  const { loading, error, result, callApi, clearState } = useApi();

  useEffect(() => {
    document.title = "AI News Search";
  }, []);

  // API calls
  const handleTextSubmit = () => {
    if (!query.trim()) {
      message.error("Please enter in plain text or upload a file to search.");
      return;
    }
    callApi(query);
  };

  const handleFileUpload = async (text) => {
    setQuery(text);
    await callApi(text);
  };

  const handleClear = () => {
    setQuery("");
    clearState();
  };

  // Sign out global (from Cognito)
  const signOutRedirect = () => {
    const clientId = "407du18cnkp5u5u978gdrpi10a";
    const logoutUri = "https://main.d25ickgp2g070n.amplifyapp.com/";
    const cognitoDomain =
      "https://ap-southeast-1vffrnajfr.auth.ap-southeast-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  // If loading auth state
  if (auth.isLoading) {
    return <div>Loading authentication...</div>;
  }

  // If auth error
  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  // If not authenticated, show sign-in button
  if (!auth.isAuthenticated) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <Title level={3}>Please sign in to continue</Title>
        <Button type="primary" onClick={() => auth.signinRedirect()}>
          Sign In
        </Button>
      </div>
    );
  }

  // Authenticated: show your app UI
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          gap: 24,
        }}
      >
        <Title>AI News Search</Title>
        <Text>Welcome, {auth.user?.profile.email}</Text>
        <Button onClick={() => auth.removeUser()}>Sign out (local)</Button>
        <Button onClick={signOutRedirect} style={{ marginLeft: 10 }}>
          Sign out (global)
        </Button>

        <TextInputForm
          query={query}
          setQuery={setQuery}
          onSubmit={handleTextSubmit}
          onClear={handleClear}
          loading={loading}
        />

        <FileUploader onUpload={handleFileUpload} loading={loading} />

        {error && (
          <Text type="danger" style={{ maxWidth: 600 }}>
            {error}
          </Text>
        )}

        {result && <ResultDisplay result={result} />}
      </div>

      <Footer />
    </div>
  );
}

export default App;
