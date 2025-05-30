import { Typography } from 'antd';

const { Text } = Typography;

function Footer() {
  return (
    <div style={{ textAlign: 'center', padding: '24px 0 10px', marginBottom: 20 }}>
      <Text style={{ fontSize: 12, color: '#888', fontFamily: 'Roboto, Helvetica Neue, Arial, sans-serif' }}>
        AI-powered by Mistral AI | Design UI by Ant Design
      </Text>
    </div>
  );
}

export default Footer;