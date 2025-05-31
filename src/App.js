// Import necessary hooks and components
import { useState, useEffect } from 'react';
import { Typography, message } from 'antd';
import TextInputForm from './components/TextInputForm';
import FileUploader from './components/FileUploader';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';
import useApi from './hooks/useAPI';

// Typography components
const { Title, Text } = Typography;

// Function for Main Page
function App() {
  // Set the state variable 'query' to store user input value
  // Value of 'query' to be updated using setQuery
  const [query, setQuery] = useState('');

  // Custom useApi hook:
  // - loading: API call status
  // - error: any error from API call
  // - result: API response data
  // - callApi: function to trigger the API call
  // - clearState: function to reset API-related state
  const { loading, error, result, callApi, clearState } = useApi();

  // Set the title of the browser tab
  useEffect(() => {
    document.title = 'AI News Search'
  }, []);

  // Function to handle user's input
  // If the input is empty or only whitespace (using ! to detect null, undefined, or an empty string ("")), show error message
  // Else, submit user's input by calling the callApi function (imported from useApi hook)
  const handleTextSubmit = () => {
    if (!query.trim()) {
      message.error('Please enter in plain text or upload a file to search.');
      return;
    }
    callApi(query);
  };

  // Function to handle text extracted from uploaded file
  // Uses async/await to update query state and call the API asynchronously
  const handleFileUpload = async (text) => {
    setQuery(text);
    await callApi(text);
  };
  // Function to clear the user input by calling the clearState function (imported from useApi hook)
  const handleClear = () => {
    setQuery('');
    clearState();
  };

  // HTML/CSS code
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20, gap: 24 }}>
        <Title>AI News Search</Title>

        {/*
          TextInputForm component -> Textarea with 'Enter search term', Blue Button with 'Submit' and White button with 'Clear'
          Description of props:
          - query: State variable holding current value (what user types = source of truth)
          - setQuery: Function to update the 'query' state variable
          - onSubmit: Function to process user input on submit
          - onClear: Function to clear user input and reset the page
          - loading: State variable indicating if loading is in progress
        */}
        <TextInputForm
          query={query}
          setQuery={setQuery}
          onSubmit={handleTextSubmit}
          onClear={handleClear}
          loading={loading}
        />

        {/*
          FileUploader component - Button to upload a file
          Description of props:
          - onUpload: Async function to handle the uploaded file content
          - loading: State variable indicating whether the upload/API call is in progress
        */}
        <FileUploader onUpload={handleFileUpload} loading={loading} />

        {/*
          Error component - Conditionally render error message when applicable
          - Displays the error text styled as danger with a max width for readability
        */}
        {error && <Text type="danger" style={{ maxWidth: 600 }}>{error}</Text>}

        {/*
          Result component - Conditionally render results when applicable
          - Displays the results generated from the API
        */}
        {result && <ResultDisplay result={result} />}
      </div>

        {/*
          Footer component
        */}
      <Footer />
    </div>
  );
}
// Export the App component as the default export from this module
export default App;
