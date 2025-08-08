const News = require('../models/News');
const { generateSummary } = require('../utils/aiHelper');

exports.getNews = async (req, res) => {
  const news = await News.find().sort({ publishedAt: -1 });
  res.json(news);
};

exports.createNews = async (req, res) => {
  try {
    const summary = await generateSummary(req.body.content);
    const news = new News({ ...req.body, summary });
    await news.save();

    // Emit a unified notification
    const io = req.app.get('io');
    if (io) {
      io.emit('notification', {
        message: `New news published: ${news.title}`,
        date: new Date(),
        type: 'news',
        link: `/news/${news._id}`
      });
    }

    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create news', error: err.message });
  }
};

exports.getSingleNews = async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) return res.status(404).json({ message: 'News not found' });
  res.json(news);
};

exports.updateNews = async (req, res) => {
  const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(news);
};

exports.deleteNews = async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.json({ message: 'News deleted' });
};
