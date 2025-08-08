const express = require('express');
const router = express.Router();
const { getTenders, createTender, getSingleTender, updateTender, deleteTender } = require('../controllers/tenderController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getTenders);
router.post('/', createTender);
router.get('/:id', getSingleTender);
router.put('/:id', updateTender);
router.delete('/:id',  deleteTender);

module.exports = router;
