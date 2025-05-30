import { Typography, Layout } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

function Footer() {
  return (
    <AntFooter style={{ textAlign: 'center', padding: '24px 0 10px' }}>
      <Text type="secondary" style={{ fontSize: 12 }}>
        AI-powered by Mistral AI | Design UI by Ant Design
      </Text>
    </AntFooter>
  );
}

export default Footer;