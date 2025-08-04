const express = require('express');
const router = express.Router();
const { getProjects, createProject, getSingleProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProjects);
router.post('/', protect, createProject);
router.get('/:id', getSingleProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
