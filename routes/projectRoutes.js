const express = require('express');
const router = express.Router();
const { getProjects, createProject, getSingleProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProjects);
router.post('/',  createProject);
router.get('/:id', getSingleProject);
router.put('/:id',  updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
