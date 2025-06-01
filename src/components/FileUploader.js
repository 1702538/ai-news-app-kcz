// Import required libraries
import { Upload, Button, message, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { parseFile } from '../utils/fileParser';

// Destructure the Text component from Ant Design's Typography module
const { Text } = Typography;

// Define a list of allowed MIME types for uploaded files
const allowedTypes = [
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// - onUpload: async function to handle parsed text content
// - loading: boolean indicating if the upload or processing is in progress (used to disable button)
function FileUploader({ onUpload, loading }) {
  return (

    // Container div using Flexbox to align child elements horizontally with some spacing
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Text style={{ fontSize: 12 }}>Alternatively, you may also</Text>
      <Upload
        maxCount={1}
        accept=".txt,.doc,.docx"
        showUploadList={false}

        // Function that runs before the file is uploaded
        beforeUpload={(file) => {
          const isAllowed = allowedTypes.includes(file.type);
          if (!isAllowed)
            message.error(`${file.name} is not a .txt, .doc, or .docx file`);
          return isAllowed || Upload.LIST_IGNORE;
        }}

        // Handle custom file processing instead of uploading to a server
        customRequest={({ file, onSuccess, onError }) => {
          parseFile(file)
            .then((text) => onUpload(text).then(() => onSuccess(null, file)))
            .catch((err) => {
              message.error(err.message);
              onError(err);
            });
        }}
      >
        {/* Upload button that triggers the file picker dialog */}
        <Button icon={<UploadOutlined />} size="large" disabled={loading}>
          Upload .txt, .doc, or .docx
        </Button>
      </Upload>
    </div>
  );
}

export default FileUploader;