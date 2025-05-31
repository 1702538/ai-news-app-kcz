function ResultDisplay({ result }) {
  const parsedResult = typeof result === 'string' ? JSON.parse(result) : result;

  return (
    <div style={{ marginTop: 16, maxWidth: 600, width: '100%', textAlign: 'left' }}>
      <Title level={4}>News Article Summary</Title>
      {parsedResult.summary?.trim() ? (
        <Paragraph>{parsedResult.summary}</Paragraph>
      ) : (
        <Paragraph italic>No summary could be generated.</Paragraph>
      )}

      <Title level={4}>People Mentioned</Title>
      {parsedResult.people?.length ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
          <tbody>
            {parsedResult.people.map((person, i) => (
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
      {parsedResult.countries?.length ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
          <tbody>
            {parsedResult.countries.map((country, i) => (
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
      {parsedResult.organizations?.length ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
          <tbody>
            {parsedResult.organizations.map((org, i) => (
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
