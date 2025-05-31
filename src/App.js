// src/App.js
import { useAuth } from "react-oidc-context";
import { useState, useEffect } from "react";
import { Typography, message, Button, Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import TextInputForm from "./components/TextInputForm";
import FileUploader from "./components/FileUploader";
import ResultDisplay from "./components/ResultDisplay";
import useApi from './hooks/useApi';
import Footer from "./components/Footer";

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
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      {/* Top-right user avatar */}
      <div
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
        }}
      >
        <Popover
          placement="bottomRight"
          content={
            <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 180 }}>
              <span><strong>Hello! You are</strong></span>
              <div>{auth.user?.profile.email || "User"}</div>
              <Button
                type="primary"
                danger
                size="small"
                onClick={() => auth.removeUser()}
              >
                Sign out
              </Button>
            </div>
          }
          trigger="click"
        >
          <Avatar icon={<UserOutlined />} />
        </Popover>
      </div>

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
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

      {/* Footer stays pinned below */}
      <Footer />
    </div>
  );
}

export default App;
