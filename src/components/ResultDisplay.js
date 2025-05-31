import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

function ResultDisplay({ result }) {
  return (
    <div style={{ marginTop: 16, maxWidth: 600, width: '100%', textAlign: 'left' }}>
      <Title level={4}>News Article Summary</Title>
      {result.summary?.trim() ? (
        <Paragraph>{result.summary}</Paragraph>
      ) : (
        <Paragraph italic>No summary could be generated.</Paragraph>
      )}

      <Title level={4}>People Mentioned</Title>
      {result.people?.length ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
          <tbody>
            {result.people.map((person, i) => (
              <tr key={i}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                  <Text>{person}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Paragraph italic>No people identified.</Paragraph>
      )}

      <Title level={4}>Countries Mentioned</Title>
      {result.countries?.length ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
          <tbody>
            {result.countries.map((country, i) => (
              <tr key={i}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                  <Text>{country}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Paragraph italic>No countries identified.</Paragraph>
      )}

       <Title level={4}>Organizations Mentioned</Title>
      {result.organizations?.length ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
          <tbody>
            {result.organizations.map((organization, i) => (
              <tr key={i}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                  <Text>{organization}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Paragraph italic>No countries identified.</Paragraph>
      )}
    </div>
  );
}

export default ResultDisplay;