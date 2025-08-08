const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

exports.createProject = async (req, res) => {
  const project = new Project(req.body);
  await project.save();

  // Emit a unified notification
  const io = req.app.get('io');
  if (io) {
    io.emit('notification', {
      message: `New project added: ${project.name}`,
      date: new Date(),
      type: 'project',
      link: `/projects/${project._id}`
    });
  }

  res.status(201).json(project);
};

exports.getSingleProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

exports.updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
};

exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
};
