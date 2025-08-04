// routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/chat', async (req, res) => {
  const { question } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // cheaper & fast, you can switch to gpt-4o
      messages: [{ role: "user", content: question }],
      max_tokens: 300
    });

    const answer = response.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ answer: 'Sorry, something went wrong.' });
  }
});

module.exports = router;
