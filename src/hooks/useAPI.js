import { useState } from 'react';

function useApi() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);

    const callApi = async (text) => {
        setLoading(true);
        setError('');
        setResult(null);
        try {
            const response = await fetch('https://backend.ai-news-app.ip-ddns.com/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            if (!response.ok) throw new Error(`API error: ${response.statusText}`);
            const data = await response.json();
            setResult(data);
        } catch (e) {
            if (e.message === 'Failed to fetch') {
                setError('Unable to connect to the server. Please check your internet connection or try again later.');
            } else {
                setError(e.message || 'Failed to call API');
            }
        } finally {
            setLoading(false);
        }
    };

    const clearState = () => {
        setError('');
        setResult(null);
    };

    return { loading, error, result, callApi, clearState };
}

export default useApi;