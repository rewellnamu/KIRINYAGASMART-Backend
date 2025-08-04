const { askAI } = require('../utils/aiHelper');

exports.chatWithBot = async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ answer: 'No question provided.' });
  try {
    const answer = await askAI(question);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ answer: 'Sorry, something went wrong.' });
  }
};
