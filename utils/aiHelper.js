// utils/aiHelper.js
const OpenAI = require('openai');
const apiKey = process.env.OPENAI_API_KEY;
let client = null;

if (!apiKey || !apiKey.startsWith('sk-')) {
  console.error('OpenAI API key is missing or invalid. Please check your .env file.');
} else {
  client = new OpenAI({ apiKey });
}

// Summarize text
exports.generateSummary = async (text) => {
  if (!client) return 'Summary not available (AI key missing)';
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: `Summarize this news article in 2-3 sentences: ${text}` }],
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error('AI Summary Error:', err.message);
    return 'Summary not available';
  }
};

// Generate auto-reply for contacts
exports.generateAutoReply = async (message) => {
  if (!client) return 'Thank you for reaching out. We will get back to you soon. (AI key missing)';
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: `Write a polite reply to this message from a constituent: "${message}"` }],
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error('AI Reply Error:', err.message);
    return 'Thank you for reaching out. We will get back to you soon.';
  }
};

// Generic AI chat
exports.askAI = async (question) => {
  if (!client) return 'AI is not available (API key missing)';
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: question }],
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error('AI Chat Error:', err.message);
    return 'Sorry, something went wrong.';
  }
};


