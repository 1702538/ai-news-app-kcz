import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

function ResultDisplay({ result }) {

  const cleanList = (items) => {
    if (!items || !items.length) return [];
    return items
      .flatMap(item => item.split('\n')) // split multi-line strings
      .map(name => name.trim().replace(/^[-\d.]+\s*/, '')) // remove leading "- ", "1. ", "2. ", etc.
      .filter(name => name.length > 0);
  };

  const people = cleanList(result.people);
  const countries = cleanList(result.countries);
  const organizations = cleanList(result.organizations);

  return (
    <div style={{ marginTop: 16, maxWidth: 600, width: '100%', textAlign: 'left' }}>
      <Title level={4}>News Article Summary</Title>
      {result.summary?.trim() ? (
        <Paragraph>{result.summary}</Paragraph>
      ) : (
        <Paragraph italic>No summary could be generated.</Paragraph>
      )}

      <Title level={4}>People Mentioned</Title>
      {people.length ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
          <tbody>
            {people.map((person, i) => (
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
      {countries.length ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
          <tbody>
            {countries.map((country, i) => (
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
      {organizations.length ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
          <tbody>
            {organizations.map((org, i) => (
              <tr key={i}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                  <Text>{org}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Paragraph italic>No organizations identified.</Paragraph>
      )}
    </div>
  );
}

export default ResultDisplay;