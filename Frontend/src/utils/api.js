// src/utils/api.js

// IMPORTANT: Replace with your actual Gemini API Key.
// This key should ideally be loaded from environment variables in a real production app.
const API_KEY = 'AIzaSyDIEA-bNm6_GW0dJKoo9vL0OJdSCA1aBME'; // <<< THIS HAS BEEN UPDATED!

// We'll stick with gemini-1.0-pro for now as it's widely available.
const MODEL_ID = 'gemini-1.5-flash-latest'; 

// Construct the full API URL using the chosen model and your API key.
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${API_KEY}`;

/**
 * Sends a conversation history to the Gemini AI and gets a response.
 * @param {Array<Object>} conversationHistory - An array of message objects, 
 * each with 'sender' ('user' or 'model') and 'text' properties.
 * Example: [{ sender: 'user', text: 'Hello' }, { sender: 'model', text: 'Hi!' }]
 * @returns {Promise<string>} - A promise that resolves to the AI's response text.
 * @throws {Error} If the API request fails or returns an unexpected response.
 */
export const generateAIResponse = async (conversationHistory) => {
    // Format the conversation history into the structure the Gemini API expects.
    // The API expects 'role' ('user' or 'model') and 'parts' (an array of objects with 'text').
    const formattedContents = conversationHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    try {
        // Make the POST request to the Gemini API.
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Tell the API we're sending JSON.
            },
            body: JSON.stringify({
                contents: formattedContents, // Send the formatted conversation history.
            }),
        });

        // Check if the HTTP response was successful (status 200-299).
        if (!response.ok) {
            // If not successful, parse the error message from the API.
            const errorData = await response.json();
            console.error('API request failed with status:', response.status, 'Error data:', errorData);
            // Throw a custom error message for easier debugging.
            throw new Error(`API request failed with status ${response.status}: ${errorData.error?.message || 'Unknown API error'}`);
        }

        // Parse the successful response from the API.
        const data = await response.json();

        // Check if the response contains valid candidate text.
        if (data.candidates && data.candidates.length > 0 && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text; // Return the AI's generated text.
        } 
        // Check if the prompt was blocked by safety settings.
        else if (data.promptFeedback?.blockReason) {
            const blockReason = data.promptFeedback.blockReason;
            console.warn('AI response blocked due to safety settings:', blockReason);
            // Provide a user-friendly message when content is blocked.
            return `කණගාටුයි, ඔබගේ ඉල්ලීම ආරක්ෂක හේතු මත අවහිර කරන ලදි: ${blockReason.replace(/_/g, ' ').toLowerCase()}. කරුණාකර වෙනත් ආකාරයකින් ප්‍රශ්නය අසන්න.`;
        } 
        // If the response structure is unexpected, log and throw an error.
        else {
            console.error('Invalid or unexpected response structure from API:', data);
            throw new Error('AI model වෙතින් අසාමාන්‍ය හෝ අනපේක්ෂිත ප්‍රතිචාරයක්.');
        }
    } catch (error) {
        // Catch any network errors or errors thrown from the try block.
        console.error('generateAIResponse හි API දෝෂය:', error);
        throw error; // Re-throw the error to be handled by the calling component (Chat.jsx).
    }
};