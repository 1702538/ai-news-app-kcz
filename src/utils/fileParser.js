// Import required libraries
import mammoth from 'mammoth';

// Async function to parse text content from a file (txt or .docx)
export const parseFile = async (file) => {
    // If file is plain text (.txt)
    // Read the file as text
    if (file.type === 'text/plain') {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject(new Error('Failed to read text file'));
            reader.readAsText(file);
        });

        // If file is a .docx (Word Open XML document)
        // Read the file as an ArrayBuffer (required by Mammoth)
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const { value } = await mammoth.extractRawText({ arrayBuffer: e.target.result });
                    resolve(value);
                } catch {
                    reject(new Error('Failed to read .docx file'));
                }
            };
            reader.onerror = () => reject(new Error('Failed to read .docx file'));
            reader.readAsArrayBuffer(file);
        });

        // If file is a .doc (Legacy word document)
        // Throw error instructing user to convert to .docx or .txt
    } else if (file.type === 'application/msword') {
        throw new Error('Cannot read .doc files in browser. Please convert to .docx or .txt.');
    } else {
        throw new Error('Unsupported file type');
    }
};
