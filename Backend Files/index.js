// Import required libraries
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const AWS = require('aws-sdk');

// Create Express app instance
const app = express();

// Middleware Configurations
// Enable CORS to allow frontend UI to call this backend
app.use(cors()); //
app.use(express.json());

// AWS DynamoDB config
// Set AWS region for DynamoDB access (Singapore = ap-southeast-1)
AWS.config.update({
    region: 'ap-southeast-1'
});

// Create a DynamoDB DocumentClient for easier JSON-style access
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Name of the DynamoDB table
const TABLE_NAME = 'AI-News-Search-Results';

// Secret key for accessing Mistral API
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

// POST API /analyze
// Extract 'text' field from JSON request body
// Embed user-submitted news text directly into the prompt
app.post('/analyze', async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'No text provided' });
    }

    try {
        const response = await axios.post(
            MISTRAL_API_URL,
            {
                model: 'open-mixtral-8x22b',
                messages: [
                    {
                        role: 'user',
                        content: `Analyze the following text and provide:

Summary: Concise summary. 

Based on the original text, provide:
People: List of people mentioned, names only, no numbering, job titles, salutations. All people must have nationality in parentheses. 
Organization: List the companies that the people work for it. 
Countries: List all countries mentioned, no numbering, no duplicates.

Example:
People: Donald Trump (American), Xi Jinping (Chinese), Vladimir Putin (Russian), K Shanmugam (Singapore)
Organization: Tesla, Microsoft, Apple, US Government, Singapore Ministry of Home Affairs
Countries: USA, China, Russia, Singapore

The String array for people, organization and countries must be like this example:
"people": [
        "Vladimir Putin (Russian)",
        "Volodymyr Zelenskyy (Ukrainian)"
    ]

Text:
${text}` 
                    }
                ],
            },
            {
                headers: {
                    'Authorization': `Bearer ${MISTRAL_API_KEY}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        );

        // Extract the actual text content of the AI response
        const generatedText = response.data.choices[0].message.content;

        // Use regular expressions to split the full text into distinct sections
        const summaryMatch = generatedText.match(/Summary:\s*([\s\S]*?)People:/i);
        const peopleMatch = generatedText.match(/People:\s*([\s\S]*?)Organization:/i);
        const organizationMatch = generatedText.match(/Organization:\s*([\s\S]*?)Countries:/i);
        const countriesMatch = generatedText.match(/Countries:\s*([\s\S]*)/i);

        // Extract and clean the output from the API
        const summary = summaryMatch ? summaryMatch[1].trim() : '';
        const people = peopleMatch ? peopleMatch[1].split(',').map(p => p.trim()).filter(Boolean) : [];
        const organizations = organizationMatch ? organizationMatch[1].split(',').map(o => o.trim()).filter(Boolean) : [];
        const countries = countriesMatch ? countriesMatch[1].split(',').map(c => c.trim()).filter(Boolean) : [];

        // Store Data in DynamoDB Table
        const item = {
            id: Date.now().toString(),
            summary,
            people,
            countries,
            organizations,
            originalText: text,
            createdAt: new Date().toISOString()
        };

        await dynamoDB.put({
            TableName: TABLE_NAME,
            Item: item
        }).promise();

        res.json({ summary, people, countries, organizations });

    } catch (error) {
        console.error('Mistral API error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to analyze text' });
    }
});

// Start the server; fallback to Port 3000
// Used to assess that the API is running
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.status(200).send('OK');
});

// Listen on all interfaces (0.0.0.0) for container compatibility
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));