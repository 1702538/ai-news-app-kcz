// Import required libraries
import { Typography } from 'antd';

// Destructure the Text component from Ant Design's Typography module
const { Text } = Typography;

// This is a functional React component that renders a footer with a styled message
function Footer() {
  return (
    <div style={{ textAlign: "center", padding: "24px 0 10px" }}>
      <Text style={{ fontSize: 12, color: '#888', fontFamily: 'Roboto, Helvetica Neue, Arial, sans-serif' }}>
        AI-powered by Mistral AI | Design UI by Ant Design
      </Text>
    </div>
  );
}

export default Footer;