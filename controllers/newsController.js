const News = require('../models/News');
const { generateSummary } = require('../utils/aiHelper');

exports.getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch news', error: err.message });
  }
};

exports.createNews = async (req, res) => {
  try {
    const summary = await generateSummary(req.body.content);
    const news = new News({ ...req.body, summary });
    await news.save();

    // Emit specific event for frontend listener
    const io = req.app.get('io');
    if (io) {
      io.emit('new-news', { title: news.title });
    }

    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create news', error: err.message });
  }
};

exports.getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch news', error: err.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update news', error: err.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json({ message: 'News deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete news', error: err.message });
  }
};
