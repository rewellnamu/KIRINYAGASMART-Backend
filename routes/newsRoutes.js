const express = require('express');
const router = express.Router();
const { getNews, createNews, getSingleNews, updateNews, deleteNews } = require('../controllers/newsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getNews);
router.post('/', protect, createNews);
router.get('/:id', getSingleNews);
router.put('/:id', protect, updateNews);
router.delete('/:id', protect, deleteNews);

module.exports = router;
