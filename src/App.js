import { useAuth } from "react-oidc-context";
import { useState, useEffect } from "react";
import { Typography, message, Button, Tooltip, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import TextInputForm from "./components/TextInputForm";
import FileUploader from "./components/FileUploader";
import ResultDisplay from "./components/ResultDisplay";
import Footer from "./components/Footer";
import useApi from "./hooks/useAPI";

const { Title, Text } = Typography;

function App() {
  const auth = useAuth();

  const [query, setQuery] = useState("");
  const { loading, error, result, callApi, clearState } = useApi();

  useEffect(() => {
    document.title = "AI News Search";
  }, []);

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

  const signOutRedirect = () => {
    const clientId = "407du18cnkp5u5u978gdrpi10a";
    const logoutUri = "https://main.d25ickgp2g070n.amplifyapp.com";
    const cognitoDomain =
      "https://ap-southeast-1vffrnajfr.auth.ap-southeast-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  if (auth.isLoading) {
    return <div>Loading authentication...</div>;
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

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

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      {/* Top right user avatar with hover logout button */}
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          cursor: "pointer",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
        className="user-menu-container"
      >
        <Tooltip title={auth.user?.profile.email || "User"}>
          <Avatar icon={<UserOutlined />} />
        </Tooltip>
        <Button
          type="link"
          danger
          style={{ display: "none", padding: 0, height: "auto" }}
          onClick={() => auth.removeUser()}
          className="logout-button"
        >
          Sign out
        </Button>
      </div>

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

      {/* Add CSS for hover effect */}
      <style>{`
        .user-menu-container:hover .logout-button {
          display: inline-block !important;
        }
      `}</style>
    </div>
  );
}

export default App;
