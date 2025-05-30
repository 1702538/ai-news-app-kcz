import { Input, Button } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';

function TextInputForm({ query, setQuery, onSubmit, onClear, loading }) {
    return (
        <>
            <Input.TextArea
                autoSize={{ minRows: 3, maxRows: 6 }}
                placeholder="Enter search term"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ maxWidth: 600, fontSize: '16px' }}
                disabled={loading}
            />
            <div style={{ display: 'flex', gap: 12, maxWidth: 600, width: '100%' }}>
                <Button
                    type="primary"
                    size="large"
                    icon={<SearchOutlined />}
                    onClick={onSubmit}
                    loading={loading}
                    style={{ flex: 4 }}
                >
                    Submit
                </Button>
                <Button
                    size="large"
                    icon={<ClearOutlined />}
                    onClick={onClear}
                    disabled={loading}
                    style={{ flex: 1 }}
                >
                    Clear
                </Button>
            </div>
        </>
    );
}

export default TextInputForm;