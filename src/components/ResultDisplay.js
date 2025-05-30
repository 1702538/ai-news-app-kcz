import { Typography } from 'antd';

const { Title } = Typography;

function ResultDisplay({ result }) {
    return (
        <div style={{ marginTop: 16, maxWidth: 600, width: '100%', textAlign: 'left' }}>
            <Title level={4}>News Article Summary</Title>
            {result.summary?.trim() ? <p>{result.summary}</p> : <p><i>No summary could be generated.</i></p>}

            <Title level={4}>People Mentioned</Title>
            {result.people?.length ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
                    <tbody>
                        {result.people.map((person, i) => (
                            <tr key={i}><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{person}</td></tr>
                        ))}
                    </tbody>
                </table>
            ) : <p><i>No people identified.</i></p>}

            <Title level={4}>Countries Mentioned</Title>
            {result.countries?.length ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
                    <tbody>
                        {result.countries.map((country, i) => (
                            <tr key={i}><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{country}</td></tr>
                        ))}
                    </tbody>
                </table>
            ) : <p><i>No countries identified.</i></p>}
        </div>
    );
}

export default ResultDisplay;