import { useState } from 'react';
import { UploadOutlined, SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { Button, Upload, Input, Typography, message } from 'antd';
import mammoth from 'mammoth'; // npm install mammoth

const { Title, Text } = Typography;

const allowedTypes = [
  'text/plain', // .txt
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
];

function App() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const callApi = async (text) => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const backendUrl = 'https://backend.ai-news-app.ip-ddns.com/analyze';
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error(`API error: ${response.statusText}`);
      const data = await response.json();
      setResult(data);
      message.success('Analysis successful!');
    } catch (e) {
      if (e.message === 'Failed to fetch') {
        setError('Unable to connect to the server. Please check your internet connection or try again later.');
      } else {
        setError(e.message || 'Failed to call API');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!query.trim()) {
      setError('Please enter in plain text or upload a file to search.');
      return;
    }
    setError('');
    callApi(query);
  };

  const uploadProps = {
    maxCount: 1,
    accept: '.txt,.doc,.docx',
    beforeUpload: (file) => {
      const isAllowed = allowedTypes.includes(file.type);
      if (!isAllowed) {
        setError(`${file.name} is not a .txt, .doc, or .docx file`);
        message.error('Invalid file type');
      } else {
        setError('');
      }
      return isAllowed || Upload.LIST_IGNORE;
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      const fileType = file.type;

      if (fileType === 'text/plain') {
        // Read .txt files as text
        const reader = new FileReader();
        reader.onload = async (e) => {
          const text = e.target.result;
          try {
            setQuery(text);
            await callApi(text);
            onSuccess(null, file);
          } catch (err) {
            onError(err);
          }
        };
        reader.onerror = () => {
          setError('Failed to read file');
          onError();
        };
        reader.readAsText(file);
      } else if (
        fileType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        // Parse .docx files with mammoth
        const reader = new FileReader();
        reader.onload = async (e) => {
          const arrayBuffer = e.target.result;
          try {
            const { value: text } = await mammoth.extractRawText({ arrayBuffer });
            setQuery(text);
            await callApi(text);
            onSuccess(null, file);
          } catch (err) {
            setError('Failed to read .docx file');
            onError(err);
          }
        };
        reader.onerror = () => {
          setError('Failed to read .docx file');
          onError();
        };
        reader.readAsArrayBuffer(file);
      } else if (fileType === 'application/msword') {
        // .doc files not supported in browser
        setError('Cannot read .doc files in browser. Please convert to .docx or .txt.');
        message.error('Cannot read .doc files in browser');
        onError();
      } else {
        setError('Unsupported file type');
        message.error('Unsupported file type');
        onError();
      }
    },
  };

  const handleClear = () => {
    setQuery('');
    setError('');
    setResult(null);
  };

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          gap: 24,
          overflow: 'hidden',
        }}
      >
        <Title>AI News Search</Title>

        <Input.TextArea
          autoSize={{ minRows: 3, maxRows: 6 }}
          placeholder="Enter search term"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: 600, fontSize: '16px' }}
          disabled={loading}
        />

        <div style={{ display: 'flex', gap: 12, maxWidth: 600, width: '100%' }}>
          <Button
            type="primary"
            size="large"
            icon={<SearchOutlined />}
            onClick={handleSearch}
            loading={loading}
            style={{ flex: 4 }}
          >
            Submit
          </Button>

          <Button
            size="large"
            icon={<ClearOutlined />}
            onClick={handleClear}
            disabled={loading}
            style={{ flex: 1 }}
          >
            Clear
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>Alternatively, you may also</span>
          <Upload {...uploadProps} showUploadList={false}>
            <Button icon={<UploadOutlined />} size="large" disabled={loading}>
              Upload .txt, .doc, or .docx
            </Button>
          </Upload>
        </div>

        {error && (
          <Text type="danger" style={{ marginTop: 8, maxWidth: 600 }}>
            {error}
          </Text>
        )}

        {result && (
          <div
            style={{
              marginTop: 16,
              maxWidth: 600,
              width: '100%',
              textAlign: 'left',
            }}
          >
            <Title level={4}>News Article Summary</Title>

            {result.summary?.trim() ? (
              <>
                <p>{result.summary}</p>
              </>
            ) : (
              <p><i>No summary could be generated from the text provided.</i></p>
            )}

            <Title level={4}>People Mentioned</Title>
            {result.people?.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
                <tbody>
                  {result.people.map((person, i) => (
                    <tr key={i}>
                      <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                        {person}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p><i>No people identified.</i></p>
            )}

            <Title level={4}>Countries Mentioned</Title>
            {result.countries?.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
                <tbody>
                  {result.countries.map((country, i) => (
                    <tr key={i}>
                      <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                        {country}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p><i>No countries identified.</i></p>
            )}
          </div>
        )}
      </div>

      <div
        style={{
          textAlign: 'center',
          padding: '24px 0 12px',
          fontSize: 14,
          color: '#888',
        }}
      >
        <span>
          Developed by Keith Chong | AI-powered by Mistral AI | Design UI by Ant
          Design
        </span>
      </div>
    </div>
  );
}

export default App;
