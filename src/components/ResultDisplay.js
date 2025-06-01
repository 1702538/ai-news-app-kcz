// Import required libraries
import { Typography } from 'antd';

// Destructure the Text component from Ant Design's Typography module
const { Title, Paragraph, Text } = Typography;

// Define the ResultDisplay functional component that takes a 'result' prop
function ResultDisplay({ result }) {

  // Helper function to clean and normalize list data from the API
  // This handles cases where items may be multi-line strings or numbered lists
  const cleanList = (items) => {
    if (!items || !items.length) return [];
    return items
      .flatMap(item => item.split('\n')) // split multi-line strings
      .map(name => name.trim().replace(/^[-\d.]+\s*/, '')) // remove leading "- ", "1. ", "2. ", etc.
      .filter(name => name.length > 0);
  };

  // Clean the people, countries, and organizations lists from the result object
  const people = cleanList(result.people);
  const countries = cleanList(result.countries);
  const organizations = cleanList(result.organizations);

  return (
    <div style={{ marginTop: 16, maxWidth: 600, width: '100%', textAlign: 'left' }}>
       {/* Section heading for the summary */}
      <Title level={4}>News Article Summary</Title>
      {result.summary?.trim() ? (
        <Paragraph>{result.summary}</Paragraph>
      ) : (
        <Paragraph italic>No summary could be generated.</Paragraph>
      )}

      {/* Section heading for people mentioned */}
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

      {/* Section heading for countries mentioned */}
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

      {/* Section heading for organizations mentioned */}
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