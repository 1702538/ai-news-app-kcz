// Import required libraries
import { Input, Button } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';

// Define the TextInputForm functional component
// Props:
// - query: current text input value
// - setQuery: function to update the query state
// - onSubmit: function to call when submitting the form
// - onClear: function to call when clearing the input
// - loading: boolean indicating if a request is in progress (disables inputs/buttons)
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
                
                {/* Submit button */}
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

                {/* Clear button */}
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