// routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();


// Mock response for now
router.post('/chat', async (req, res) => {
  const { question } = req.body;

  try {
    // TODO: Replace with AI logic (OpenAI, Gemini, etc.)
    const answer = `You asked: "${question}". This is a placeholder response.`;
    res.json({ answer });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ answer: 'Sorry, something went wrong.' });
  }
});

module.exports = router;
