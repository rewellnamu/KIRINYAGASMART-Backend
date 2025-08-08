const express = require('express');
const router = express.Router();
const { getNews, createNews, getSingleNews, updateNews, deleteNews } = require('../controllers/newsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getNews);
router.post('/', createNews);
router.get('/:id', getSingleNews);
router.put('/:id',updateNews);
router.delete('/:id',deleteNews);

module.exports = router;
