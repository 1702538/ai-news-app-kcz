import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { parseFile } from '../utils/fileParser';

const allowedTypes = [
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

function FileUploader({ onUpload, loading }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span>Alternatively, you may also</span>
            <Upload
                maxCount={1}
                accept=".txt,.doc,.docx"
                showUploadList={false}
                beforeUpload={(file) => {
                    const isAllowed = allowedTypes.includes(file.type);
                    if (!isAllowed) message.error(`${file.name} is not a .txt, .doc, or .docx file`);
                    return isAllowed || Upload.LIST_IGNORE;
                }}
                customRequest={({ file, onSuccess, onError }) => {
                    parseFile(file)
                        .then((text) => onUpload(text).then(() => onSuccess(null, file)))
                        .catch((err) => {
                            message.error(err.message);
                            onError(err);
                        });
                }}
            >
                <Button icon={<UploadOutlined />} size="large" disabled={loading}>
                    Upload .txt, .doc, or .docx
                </Button>
            </Upload>
        </div>
    );
}

export default FileUploader;