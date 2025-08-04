const express = require('express');
const router = express.Router();
const { getTenders, createTender, getSingleTender, updateTender, deleteTender } = require('../controllers/tenderController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getTenders);
router.post('/', protect, createTender);
router.get('/:id', getSingleTender);
router.put('/:id', protect, updateTender);
router.delete('/:id', protect, deleteTender);

module.exports = router;
