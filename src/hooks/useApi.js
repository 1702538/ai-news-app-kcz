import { useState } from 'react';

// Loading state to indicate if API call is in progress
// Error message state to capture any errors from the API call
// Result state to store the successful response data from the API
function useApi() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);

    // Async function to call the API with given text input
    // Mark loading as true when starting the call
    // Clear any previous error messages
    // Clear previous results before new request
    const callApi = async (text) => {
        setLoading(true);
        setError('');
        setResult(null);

        // Perform the POST request to the backend API endpoint
        // Parse the JSON body of the successful response
        try {
            const response = await fetch('https://backend.ai-news-app.ip-ddns.com/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });

            // If the response is not OK (status not 2xx), throw an error to trigger catch block
            if (!response.ok) throw new Error(`API error: ${response.statusText}`);
            const data = await response.json();
            setResult(data);

        // Handle network or API errors with user-friendly messages
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

    // Function to reset the error and result states to initial values
    const clearState = () => {
        setError('');
        setResult(null);
    };

    // Return all relevant states and functions for use in components
    return { loading, error, result, callApi, clearState };
}

export default useApi;