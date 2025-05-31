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

  return (
  <div style={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
    {/* Top-right user avatar */}

    {/* Main content area */}
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
  </div>
);
}

export default App;
