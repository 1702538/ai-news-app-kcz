// Import required libraries
import { useAuth } from "react-oidc-context";
import { useState, useEffect } from "react";
import { Typography, message, Button, Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import TextInputForm from "./components/TextInputForm";
import FileUploader from "./components/FileUploader";
import ResultDisplay from "./components/ResultDisplay";
import useApi from './hooks/useApi';
import Footer from "./components/Footer";

// Destructure the Text component from Ant Design's Typography module
const { Title, Text } = Typography;

function App() {
  // Hook to manage OpenID Connect authentication state and actions
  const auth = useAuth();

  // State to hold the current text input or uploaded file text for the search query
  const [query, setQuery] = useState("");

  // Custom hook to handle API call state: loading, error messages, results, and API call function
  const { loading, error, result, callApi, clearState } = useApi();

  // Initial render for UI 
  useEffect(() => {
    document.title = "AI News Search";
  }, []);

  // Handler triggered when user clicks "Submit" button or submits the query
  const handleTextSubmit = () => {
    if (!query.trim()) {
      message.error("Please enter in plain text or upload a file to search.");
      return;
    }
    // If query is not empty, call API to process text
    callApi(query);
  };

  // Handler triggered when user uploads a file that gets parsed into text
  // Updates the query state and triggers the API call with the parsed text
  const handleFileUpload = async (text) => {
    setQuery(text);
    await callApi(text);
  };

  // Handler triggered to clear the fields and reset the UI
  const handleClear = () => {
    setQuery("");
    clearState();
  };

  // While authentication status is being loaded, show a loading indicator
  if (auth.isLoading) {
    return <div>Loading authentication...</div>;
  }

  // If authentication has an error, display the error message
  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  // If not authenticated, show login page to prompt user to login/register
  if (!auth.isAuthenticated) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Title>AI News Search</Title>
        <Title level={3}>Please sign in to continue</Title>
        <Button type="primary" onClick={() => auth.signinRedirect()}>
          Sign In
        </Button>
      </div>
    );
  }

  // When authenticated, show the main application UI
  return (
    <div style={{ minHeight: "98vh", display: "flex", flexDirection: "column" }}>
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
              <span><strong>Logged in as</strong></span>
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          gap: 24,
        }}
      >
        <Title>AI News Search</Title>

        {/* Text input form for entering or editing the search query */}
        <TextInputForm
          query={query}
          setQuery={setQuery}
          onSubmit={handleTextSubmit}
          onClear={handleClear}
          loading={loading}
        />

        {/* File uploader component to upload .txt or .docx and extract text */}
        <FileUploader onUpload={handleFileUpload} loading={loading} />

        {/* If there is an API error or validation error, show error message */}
        {error && (
          <Text type="danger" style={{ maxWidth: 600 }}>
            {error}
          </Text>
        )}

        {/* If API call returns results, display them using the ResultDisplay component */}
        {result && <ResultDisplay result={result} />}
      </div>
      
      {/* Footer component at bottom of page */}
      <Footer />
    </div>
  );
}

export default App;